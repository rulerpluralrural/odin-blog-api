import React, { useState } from "react";
import {
	FaRegUser,
	FaTrashAlt,
	FaRegClock,
	FaRegThumbsUp,
} from "react-icons/fa";

const Comment = ({ comment, user, setComments, comments }) => {
	const [likesCount, setLikesCount] = useState(comment.likes?.length);

	const deleteComment = async () => {
		try {
			await fetch(`http://localhost:8000/api/blog/comments/${comment._id}`, {
				method: "DELETE",
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setComments(comments.filter((item) => item._id !== comment._id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleCommentLike = async () => {
		try {
			const data = await fetch(
				`http://localhost:8000/api/blog/comments/${comment._id}/like`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						["Content-Type"]: "application/json; charset=utf-8",
					},
				}
			).then((res) => res.json());
			setLikesCount(data.likesCount);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="grid grid-cols-[100px_1fr] gap-1 items-center mb-2 pb-2 border-b-[1px] border-slate-300 relative">
			<FaRegUser className="text-4xl w-full h-full p-5 rounded-sm border-[1px] border-slate-300" />
			<div className="w-full flex flex-col mb-2 ">
				<p className="font-bold font-serif text-blue-800">
					{comment.user?.username}
				</p>
				<p className="py-1 flex-1">{comment.comment}</p>
				<div className="flex gap-3 items-center">
					<div className="flex items-center gap-1">
						<FaRegClock /> <p>{comment.date_formatted}</p>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="text-blue-900 flex items-center"
							onClick={handleCommentLike}
						>
							Like
						</button>
						<div className="flex items-center">
							<FaRegThumbsUp /> <p className="ml-1">{likesCount}</p>
						</div>
					</div>
				</div>
			</div>
			{user && user._id === comment.user._id && (
				<FaTrashAlt
					className="absolute top-[15px] right-0 cursor-pointer hover:text-red-700 focus:text-red-700 transition-colors"
					title="Delete Comment"
					onClick={deleteComment}
				/>
			)}
		</div>
	);
};

export default Comment;
