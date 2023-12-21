import express from "express";
const router = express.Router();

import postController from "../controllers/post.js";
import authenticateUser from "../middlewares/auth.js";

// POST request for creating a post
router.post("/create", authenticateUser, postController.create_post);

export default router;
