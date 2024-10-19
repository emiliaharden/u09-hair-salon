"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceController = exports.updateServiceController = exports.getAllServicesController = exports.getServiceByIdController = exports.createServiceController = void 0;
const ServiceService_1 = require("../services/ServiceService");
const createServiceController = async (req, res) => {
    const { name, duration, price } = req.body;
    try {
        const newService = await (0, ServiceService_1.createService)(name, duration, price);
        return res.status(201).json(newService);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createServiceController = createServiceController;
//Hämta en specifik service med ID
const getServiceByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await (0, ServiceService_1.getServiceById)(id);
        return res.status(200).json(service);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.getServiceByIdController = getServiceByIdController;
const getAllServicesController = async (req, res) => {
    try {
        const services = await (0, ServiceService_1.getAllServices)();
        res.status(200).json(services);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllServicesController = getAllServicesController;
// Uppdatera en service
const updateServiceController = async (req, res) => {
    const { id } = req.params;
    const { name, duration, price } = req.body;
    try {
        const updatedService = await (0, ServiceService_1.updateService)(id, name, duration, price);
        return res.status(200).json(updatedService);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.updateServiceController = updateServiceController;
//Ta bort en service
const deleteServiceController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await (0, ServiceService_1.deleteService)(id);
        return res.status(200).json(deletedService);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.deleteServiceController = deleteServiceController;
