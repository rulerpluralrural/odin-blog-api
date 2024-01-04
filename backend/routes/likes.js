import express from "express";
const router = express.Router();

import likesController from "../controllers/likes.js";
import authenticateUser from "../middlewares/auth.js";

// Post route for adding a like on posts
router.post("/posts/:id/like", authenticateUser, likesController.add_like_post)

// Post route for adding a like on comments
router.post("/comments/:id/like", authenticateUser, likesController.add_like_comment)

export default router