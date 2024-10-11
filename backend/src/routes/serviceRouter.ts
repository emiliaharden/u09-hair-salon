import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createServiceController,
  deleteServiceController,
  getServiceByIdController,
  updateServiceController,
} from "../controllers/ServiceController";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

//Skapa en ny service
router.post(
  "/services",
  authMiddleware,
  roleMiddleware("admin"),
  createServiceController
);

//Hämta en specifik service med ID
router.get("/services/:id", authMiddleware, getServiceByIdController);

//Uppdatera en befintlig service
router.put(
  "/services/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateServiceController
);

//Ta bort en service
router.delete(
  "/services/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteServiceController
);

export default router;
