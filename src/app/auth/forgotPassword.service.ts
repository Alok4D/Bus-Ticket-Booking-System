import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { User } from '../modules/user/user.model';

export const ForgotPasswordService = {
  // Send reset token
  forgotPassword: async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found with this email');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    return {
      message: 'Password reset token sent',
      resetToken, // Remove this in production
      resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    };
  },

  // Reset password with token
  resetPassword: async (token: string, newPassword: string) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    user.refreshToken = undefined; // Logout from all devices
    await user.save();

    return {
      message: 'Password reset successful'
    };
  },

  // Verify reset token
  verifyResetToken: async (token: string) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    return {
      message: 'Token is valid',
      email: user.email
    };
  }
};