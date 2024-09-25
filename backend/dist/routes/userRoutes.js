"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const PasswordController_1 = require("../controllers/PasswordController");
const router = (0, express_1.Router)();
router.get("/users", userController_1.getUsersController);
router.put("/user/:id", userController_1.updateUserController);
router.delete("/user/:id", userController_1.deleteUserController);
//router för att uppdatera lösenordet
router.put("/user/:id/update-password", userController_1.updateUserPasswordController);
// route för att reset lösenordet, måste ha token och email
router.put("/user/:id/reset-password", userController_1.resetUserPasswordController);
// route för begära länk för lösenordsåterställning
router.post("/user/request-reset-password", PasswordController_1.requestPasswordResetController);
router.put("/user/reset-password/:token", PasswordController_1.resetPasswordController);
exports.default = router;
