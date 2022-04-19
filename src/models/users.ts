import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
  name: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): any;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

userSchema.statics.build = (attr: IUser) => new User(attr);

const User = mongoose.model<UserDoc, userModelInterface>("User", userSchema);

export { User };
