import { Request, Response } from "express";
import { loginUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};