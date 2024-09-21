import {NextFunction, Response, Request} from "express";
import asyncHandler from "../utils/asyncHandler";
import {CreateUserType} from "./adapters/createUser.adapter";
import Logger from "../utils/logger";
import {CreateUser, FindUserByEmail} from "./repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "./types";
import config from "../../config";

const PostCreateUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const { email, password } = req.body as CreateUserType['body']

  Logger.info(`PostCreateUser:::Create user : ${email}`)

  const result = await CreateUser(email, password);

  if (!result) {
    Logger.error(`PostCreateUser:::Error creating user: ${email}`)
    return res.status(409).json({message: 'Error creating user'})
  }

  return res.status(201).json({message: 'user was created successfully'})
}

const PostLoginUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const { email, password } = req.body as CreateUserType['body'];

  Logger.info(`PostLoginUser:::Login user : ${email}`);

  const user: User = await FindUserByEmail(email);

  if (!user) {
    Logger.error(`PostLoginUser:::User not found: ${email}`);
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    Logger.error(`PostLoginUser:::Invalid password for user: ${email}`);
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const JWT_SECRET = config.JWT_SECRET;
  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });
  return res.json({ token }).status(200);
}

export default {
  PostCreateUser: asyncHandler(PostCreateUser),
  PostLoginUser: asyncHandler(PostLoginUser)
}
