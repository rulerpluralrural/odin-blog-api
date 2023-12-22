import express from "express";
const router = express.Router();

import postController from "../controllers/post.js";
import authenticateUser from "../middlewares/auth.js";

// POST request for creating a post
router.post("/create", authenticateUser, postController.create_post);

// GET request for all posts
router.get("/posts", authenticateUser, postController.get_posts);

// GET request for a single post
router.get("/posts/:id", authenticateUser, postController.get_post);

// PATCH request for a post
router.patch("/posts/:id", authenticateUser, postController.update_post);

// DELETE request for a post
router.delete("/posts/:id", authenticateUser, postController.delete_post);

export default router;
