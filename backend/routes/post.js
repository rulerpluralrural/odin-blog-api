import express from "express";
const router = express.Router();

import postController from "../controllers/post.js";
import authenticateUser from "../middlewares/auth.js";

// POST route for creating a post
router.post("/posts", authenticateUser, postController.create_post);

// GET route for all posts
router.get("/posts", postController.get_posts);

// GET route for a single post
router.get("/posts/:id", postController.get_post);

// PUT route for a post
router.put("/posts/:id", authenticateUser, postController.update_post);

// DELETE route for a post
router.delete("/posts/:id", authenticateUser, postController.delete_post);

export default router;
