import express from "express";
import { getUserProfile, getAllUsers, updateUserProfile, deleteUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllUsers);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser);

export default router;
