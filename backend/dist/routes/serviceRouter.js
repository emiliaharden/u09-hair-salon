"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const ServiceController_1 = require("../controllers/ServiceController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
//Skapa en ny service
router.post("/services", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ServiceController_1.createServiceController);
//Hämta en specifik service med ID
router.get("/services/:id", authMiddleware_1.authMiddleware, ServiceController_1.getServiceByIdController);
router.get("/services", ServiceController_1.getAllServicesController);
//Uppdatera en befintlig service
router.put("/services/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ServiceController_1.updateServiceController);
//Ta bort en service
router.delete("/services/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), ServiceController_1.deleteServiceController);
exports.default = router;
