import { IUser } from '../app/modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: string };
      session?: {
        csrfToken?: string;
        lastActivity?: number;
      };
      deviceFingerprint?: string;
    }
  }
}