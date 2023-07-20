import { Schema, model, models  } from "mongoose";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcryptjs";


const userSchema = new Schema<IUser>({
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  watchlist: Array,
  holdings: Array
})

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

export default models.User || model('User', userSchema);