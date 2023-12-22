import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		post: {
			type: String,
			required: [true, "Post is required"],
		},
		comment: {
			type: String,
			required: [true, "Comment is required"],
		},
	},
	{ timeStamps: true }
);

MessageSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

export const Comment = mongoose.model("Comment", CommentSchema);