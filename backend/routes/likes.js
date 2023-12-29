import express from "express";
const router = express.Router();

import likesController from "../controllers/likes.js";
import authenticateUser from "../middlewares/auth.js";

// Post route for adding a like
router.post("/posts/:id", authenticateUser, likesController.add_like)

export default router