"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getAllServices = exports.getServiceById = exports.createService = void 0;
const ServiceModel_1 = require("../models/ServiceModel");
const createService = async (name, duration, price) => {
    try {
        const newService = new ServiceModel_1.Service({ name, duration, price });
        const savedService = await newService.save();
        return savedService;
    }
    catch (error) {
        console.error("Error creating service:", error);
        throw new Error("Error creating service");
    }
};
exports.createService = createService;
//hämta en specifik service
const getServiceById = async (id) => {
    try {
        const service = await ServiceModel_1.Service.findById(id);
        if (!service) {
            throw new Error("Service not found");
        }
        return service;
    }
    catch (error) {
        console.error("Error fetching service:", error);
        throw new Error("Error fetching service");
    }
};
exports.getServiceById = getServiceById;
const getAllServices = async () => {
    try {
        const services = await ServiceModel_1.Service.find(); //hämtar alla services
        return services;
    }
    catch (error) {
        throw new Error("Error fetching services");
    }
};
exports.getAllServices = getAllServices;
//uppdatera en service
const updateService = async (id, name, duration, price) => {
    try {
        const updatedService = await ServiceModel_1.Service.findByIdAndUpdate(id, { name, duration, price }, { new: true });
        if (!updatedService) {
            throw new Error("Service not found");
        }
        return updatedService;
    }
    catch (error) {
        console.error("Error updating service:", error);
        throw new Error("Error updating service");
    }
};
exports.updateService = updateService;
// ta bort en service
const deleteService = async (id) => {
    try {
        const deletedService = await ServiceModel_1.Service.findByIdAndDelete(id);
        if (!deletedService) {
            throw new Error("Service not found");
        }
        return deletedService;
    }
    catch (error) {
        console.error("Error deleting service:", error);
        throw new Error("Error deleting service");
    }
};
exports.deleteService = deleteService;
