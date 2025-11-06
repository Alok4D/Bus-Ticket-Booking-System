import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (payload: IUser) => {
  console.log(payload);

  const hashedPassword = await bcrypt.hash(payload.password as string, 10);
  console.log(hashedPassword)

  payload.password = hashedPassword;

  const user = await User.create(payload);

  return user;
};

const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    return {
        meta: {
            total: totalUsers
        },
        data: users,
      
    }
}

export const UserServices = {
  createUser,
  getAllUsers
};
