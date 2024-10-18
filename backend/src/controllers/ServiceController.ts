import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../services/ServiceService";

export const createServiceController = async (req: Request, res: Response) => {
  const { name, duration, price } = req.body;

  try {
    const newService = await createService(name, duration, price);
    return res.status(201).json(newService);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//Hämta en specifik service med ID
export const getServiceByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await getServiceById(id);
    return res.status(200).json(service);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllServicesController = async (req: Request, res: Response) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// Uppdatera en service

export const updateServiceController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, duration, price } = req.body;

  try {
    const updatedService = await updateService(id, name, duration, price);
    return res.status(200).json(updatedService);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

//Ta bort en service
export const deleteServiceController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedService = await deleteService(id);
    return res.status(200).json(deletedService);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
