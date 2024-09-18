import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
  updateUserController,
} from "../controllers/userController";

const router = Router();

router.post("/user", createUserController);
router.get("/users", getUsersController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);
export default router;
