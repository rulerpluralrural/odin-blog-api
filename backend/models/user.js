import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		trim: true,
		unique: true,
		minLength: 1,
		maxLength: 50,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minLength: 1,
		maxLength: 50,
	},
	email: {
		type: String,
		required: [true, "Password is required"],
		trim: true,
		unique: true,
	},
});

export default mongoose.model("User", UserSchema);
