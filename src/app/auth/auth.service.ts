import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "../config/envVars";

interface ILoginData {
  email: string;
  password: string;
}

const credentialsLogin = async (payload: ILoginData) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password!);
  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  if (user.isBlocked) {
    throw new Error("Account is blocked");
  }

  // Generate access token
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: envVars.JWT_ACCESS_EXPIRES } as SignOptions
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { userId: user._id },
    envVars.JWT_REFRESH_SECRET,
    { expiresIn: envVars.JWT_REFRESH_EXPIRES } as SignOptions
  );

  // Save refresh token to database
  user.refreshToken = refreshToken;
  await user.save();

  // Remove sensitive data from response
  const { password: _, refreshToken: __, ...userData } = user.toObject();

  return {
    accessToken,
    refreshToken,
    user: userData
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Refresh token required");
  }

  const decoded = jwt.verify(token, envVars.JWT_REFRESH_SECRET) as any;
  
  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== token) {
    throw new Error("Invalid refresh token");
  }

  if (user.isBlocked) {
    throw new Error("Account is blocked");
  }

  // Generate new access token
  const newAccessToken = jwt.sign(
    { userId: user._id, role: user.role },
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: envVars.JWT_ACCESS_EXPIRES } as SignOptions
  );

  return { accessToken: newAccessToken };
};

const logout = async (userId: string) => {
  // Clear refresh token from database
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  
  return {
    message: "Logout successful"
  };
};

const logoutAll = async (userId: string) => {
  // Clear all refresh tokens (logout from all devices)
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  
  return {
    message: "Logged out from all devices"
  };
};

export const AuthServices = {
  credentialsLogin,
  refreshToken,
  logout,
  logoutAll,
};
