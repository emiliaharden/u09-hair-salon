import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.post("/user", createUser);
router.get("/users", getUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
export default router;
