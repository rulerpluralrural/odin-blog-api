import express from "express";
const router = express.Router();

import postRouter from "./post.js";
import userRouter from "./user.js";
import commentRouter from "./comment.js";

router.use(commentRouter);
router.use(postRouter);
router.use(userRouter);

export default router;
