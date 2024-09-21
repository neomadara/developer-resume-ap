import { Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  isAdmin?: boolean;
  enable?: boolean;
}

export default User;
