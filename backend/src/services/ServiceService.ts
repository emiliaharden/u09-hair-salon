import { Service } from "../models/ServiceModel";

export const createService = async (
  name: string,
  duration: number,
  price: number
) => {
  try {
    const newService = new Service({ name, duration, price });
    const savedService = await newService.save();
    return savedService;
  } catch (error: any) {
    console.error("Error creating service:", error);
    throw new Error("Error creating service");
  }
};

//hämta en specifik service
export const getServiceById = async (id: string) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  } catch (error: any) {
    console.error("Error fetching service:", error);
    throw new Error("Error fetching service");
  }
};

export const getAllServices = async () => {
  try {
    const services = await Service.find(); //hämtar alla services
    return services;
  } catch (error: any) {
    throw new Error("Error fetching services");
  }
};

//uppdatera en service
export const updateService = async (
  id: string,
  name: string,
  duration: number,
  price: number
) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, duration, price },
      { new: true }
    );
    if (!updatedService) {
      throw new Error("Service not found");
    }
    return updatedService;
  } catch (error: any) {
    console.error("Error updating service:", error);
    throw new Error("Error updating service");
  }
};

// ta bort en service
export const deleteService = async (id: string) => {
  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      throw new Error("Service not found");
    }
    return deletedService;
  } catch (error: any) {
    console.error("Error deleting service:", error);
    throw new Error("Error deleting service");
  }
};
