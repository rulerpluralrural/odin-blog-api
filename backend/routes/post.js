import express from "express";
const router = express.Router();

import postController from "../controllers/post.js";
import authenticateUser from "../middlewares/auth.js";

// POST request for creating a post
router.post("/create", authenticateUser, postController.create_post);

// GET request for a single post
router.get("/posts/:id", authenticateUser, postController.get_post)

// // GET request for all posts
router.get("/posts", authenticateUser, postController.get_posts)

export default router;
