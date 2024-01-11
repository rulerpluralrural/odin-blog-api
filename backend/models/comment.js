import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { DateTime } from "luxon";
import CommentLikes from "./commentLikes.js";

const CommentSchema = new Schema(
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
		comment: {
			type: String,
			required: [true, "Comment is required"],
		},
	},
	{ timestamps: true }
);

CommentSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

CommentSchema.virtual("likes", {
	ref: "CommentLikes",
	localField: "_id",
	foreignField: "comment",
});

CommentSchema.pre("deleteMany", async function (next) {
	const comments = await Comment.find(this._conditions);

	for (const comment of comments) {
		CommentLikes.deleteMany({ comment: comment._id }).exec();
	}
	next();
});

CommentSchema.set("toJSON", { virtuals: true });

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
