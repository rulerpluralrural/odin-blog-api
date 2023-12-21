import express from "express";
const router = express.Router();

import authenticateUser from "../middlewares/auth.js";
import userController from "../controllers/user.js";

// GET for all users
router.get("/users", authenticateUser, userController.users_get);

// POST Route for login
router.post("/login", userController.login_post);

// POST Route for sign-up
router.post("/sign-up", userController.sign_up_post);

// POSt Route for logout
router.post("/logout", userController.logout);

export default router;
