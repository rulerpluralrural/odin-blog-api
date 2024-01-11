import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Comment from "./comment.js"
import PostLikes from "./postLikes.js"

import { DateTime } from "luxon";

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		content: {
			type: String,
			required: [true, "Content is required"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		published: {
			type: Boolean,
			default: false,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		imgURL: {
			type: String,
			default: "https://placehold.co/600x400",
		},
	},
	{ timestamps: true }
);

PostSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "post",
});

PostSchema.virtual("likes", {
	ref: "PostLikes",
	localField: "_id",
	foreignField: "post",
});

PostSchema.pre("deleteOne", function (next) {
	// console.log(this)
	Comment.deleteMany({ post: this._conditions._id }).exec();
	PostLikes.deleteMany({ post: this._conditions._id }).exec();
	next()
});

PostSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Post", PostSchema);
