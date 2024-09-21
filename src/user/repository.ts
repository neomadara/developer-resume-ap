import User from "./model";
import bcrypt from "bcrypt";

const CreateUser = async (email: string, password: string): Promise<any> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  return user.save();
}

const FindUserByEmail = async (email: string): Promise<any> => {
  return User.findOne({ email });
}

export {
  CreateUser,
  FindUserByEmail
}
