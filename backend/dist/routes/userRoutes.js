"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const PasswordController_1 = require("../controllers/PasswordController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Admin permissions
router.get("/users", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.getUsersController);
//route för att hämta alla admins
router.get("/admins", authMiddleware_1.authMiddleware, UserController_1.getAllAdminsController);
router.put("/user/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.updateUserController);
router.delete("/user/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.deleteUserController);
//router för att uppdatera lösenordet
router.put("/user/:id/update-password", authMiddleware_1.authMiddleware, PasswordController_1.updateUserPasswordController);
// route för att reset lösenordet, måste ha token och email
router.put("/user/:id/reset-password", authMiddleware_1.authMiddleware, PasswordController_1.resetUserPasswordController);
// route för begära länk för lösenordsåterställning
router.post("/user/request-reset-password", PasswordController_1.requestPasswordResetController);
router.put("/user/reset-password/:token", PasswordController_1.resetPasswordController);
exports.default = router;
