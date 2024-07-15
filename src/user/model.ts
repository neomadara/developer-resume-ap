import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  enable: { type: Boolean, default: false }
});

export default mongoose.model('User', userSchema);