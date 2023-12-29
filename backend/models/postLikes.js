import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostLikesSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: [true, "Post is required"],
		},
	},
	{ timestamps: true }
);

export default mongoose.model("PostLikes", PostLikesSchema);
