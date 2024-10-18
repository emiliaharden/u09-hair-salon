"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ScheduleController_1 = require("../controllers/ScheduleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
router.get("/schedules", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ScheduleController_1.getAllSchedulesController);
router.get("/schedules/available", authMiddleware_1.authMiddleware, ScheduleController_1.getAllSchedulesController);
router.post("/schedules", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ScheduleController_1.createScheduleController);
router.put("/schedules/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ScheduleController_1.updateScheduleController);
router.delete("/schedules/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ScheduleController_1.deleteScheduleController);
exports.default = router;