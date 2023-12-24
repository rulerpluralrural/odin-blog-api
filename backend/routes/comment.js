import express from "express";
const router = express.Router();

import commentController from "../controllers/comment.js";
import authenticateUser from "../middlewares/auth.js";

// GET route for all comment
router.get("/comments", authenticateUser, commentController.get_comments);

// POST route for creating a comment
router.post(
	"/comments/:id",
	authenticateUser,
	commentController.create_comment
);

// GET route for a single comment
router.get("/comments/:id", authenticateUser, commentController.get_comment);

// PUT route for updating a comment
router.put(
	"/comments/:id",
	authenticateUser,
	commentController.update_comment
);

// DELETE route for delete a comment
router.delete(
	"/comments/:id",
	authenticateUser,
	commentController.delete_comment
);

export default router;
