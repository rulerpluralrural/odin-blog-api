import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
		comments: {
			type: array,
			default: [],
		},
		published: {
			type: Boolean,
		},
		likes: {
			type: array,
			default: [],
		},
	},
	{ timeStamps: true }
);

MessageSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

export const Post = mongoose.model("Post", PostSchema);
