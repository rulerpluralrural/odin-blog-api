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
			type: Array,
			default: [],
		},
		published: {
			type: Boolean,
			default: false,
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{ timeStamps: true }
);

PostSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

export default mongoose.model("Post", PostSchema);
