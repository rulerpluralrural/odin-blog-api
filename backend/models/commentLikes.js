import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentLikes = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: [true, "Comment is required"]
        }
	},
	{ timestamps: true }
);

export default mongoose.model("CommentLikes", CommentLikes);
