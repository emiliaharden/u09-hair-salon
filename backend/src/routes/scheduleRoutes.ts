import { Router } from "express";
import {
  createScheduleController,
  deleteScheduleController,
  getAllSchedulesController,
  getScheduleByAdminController,
  updateScheduleController,
} from "../controllers/ScheduleController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/schedules",
  authMiddleware,
  roleMiddleware("admin"),
  getAllSchedulesController
);

router.get("/schedules/available", authMiddleware, getAllSchedulesController);

router.get(
  "/schedules/:adminId",
  authMiddleware,
  roleMiddleware("admin"),
  getScheduleByAdminController
);

router.post(
  "/schedules",
  authMiddleware,
  roleMiddleware("admin"),
  createScheduleController
);

router.put(
  "/schedules/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateScheduleController
);

router.delete(
  "/schedules/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteScheduleController
);

export default router;
