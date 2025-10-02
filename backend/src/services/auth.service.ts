import {
  isUserExistDao,
  loginDao,
  logoutDao,
  registerDao,
} from "../dao/auth.dao";
import {} from "../model/user.model";
import { userDocument } from "../types/model.interface";
import { ValidationError } from "../utility/customErrors";
import { generateToken } from "../utility/jwt";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResult {
  user: userDocument;
  token: string;
}

export const registerService = async (
  data: RegisterData
): Promise<AuthResult> => {
  const { name, email, password, confirmPassword } = data;

  if (!name || !email || !password || !confirmPassword) {
    throw new ValidationError("Please fill all the fields");
  }

  if (password !== confirmPassword) {
    throw new ValidationError("Password and Confirm Password must match");
  }

  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Please enter a valid email address");
  }

  const isExist = await isUserExistDao(email);
  if (isExist) {
    throw new ValidationError("User with this email already exists");
  }

  const user = await registerDao({ name, email, password });

  const token = await generateToken({
    id: user._id as string,
    email: user.email,
  });

  return { user, token };
};

export const loginService = async (data: LoginData): Promise<AuthResult> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ValidationError("Please fill all the fields");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Please enter a valid email address");
  }

  const user = await loginDao({ email, password });
  if (!user) {
    throw new ValidationError("Invalid email or password");
  }

  const token = await generateToken({
    id: user._id as string,
    email: user.email,
  });

  return { user, token };
};

export const logoutService = async (
  token: string
): Promise<{ message: string }> => {
  if (!token) {
    throw new Error("Token is required for logout");
  }
  try {
    const result = await logoutDao(token);
    return { message: result.message };
  } catch (err: any) {
    throw new Error("Logout failed: " + err.message);
  }
};
