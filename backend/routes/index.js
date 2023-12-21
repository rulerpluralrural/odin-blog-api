import express from "express";
const router = express.Router();

import postRouter from "./post.js"
import userRouter from "./user.js"

router.use(postRouter)
router.use(userRouter)

export default router;
