import mongoose from "mongoose";
import { userModel } from "../model/user.model";
import { userDocument } from "../types/model.interface";
import ms from 'ms'
import { blacklistModel } from "../model/blackList.model";

export const isUserExistDao = async (email: string): Promise<boolean> => {
  const user = await userModel.exists({ email });
  return Boolean(user); 
};


export const registerDao = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<userDocument> => {
  try {
    const user = new userModel(data);
    await user.save();
    return user;
  } catch (err: any) {
    if (err instanceof mongoose.Error.ValidationError) {
      throw new Error("Validation error: " + err.message);
    }
    throw err;
  }
};


export const loginDao = async (data: {
  email: string;
  password: string;
}): Promise<userDocument> => {
  try {
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    return user;
  } catch (err: any) {
    throw err;
  }
};

export const logoutDao = async (token: string) => {
  try {
    const oneDay = 24 * 60 * 60 * 1000; 
    const expiresAt = new Date(Date.now() + oneDay);

    const blacklisted = new blacklistModel({ token, expiresAt });
    await blacklisted.save();

    return { message: "User logged out successfully" };
  } catch (err: any) {
    throw new Error("Error while blacklisting token: " + err.message);
  }
};
