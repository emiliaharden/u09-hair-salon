import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
  resetUserPasswordController,
  updateUserController,
  updateUserPasswordController,
} from "../controllers/UserController";
import {
  requestPasswordResetController,
  resetPasswordController,
} from "../controllers/PasswordController";

const router = Router();

router.get("/users", getUsersController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

//router för att uppdatera lösenordet
router.put("/user/:id/update-password", updateUserPasswordController);
// route för att reset lösenordet, måste ha token och email
router.put("/user/:id/reset-password", resetUserPasswordController);

// route för begära länk för lösenordsåterställning
router.post("/user/request-reset-password", requestPasswordResetController);
router.put("/user/reset-password/:token", resetPasswordController);
export default router;
