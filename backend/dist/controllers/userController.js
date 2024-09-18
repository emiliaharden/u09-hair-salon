"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const validRoles = ["user", "admin", "superadmin"];
// Skapa en ny användare
const createUser = async (req, res) => {
    const { name, email, password, roles } = req.body;
    if (roles && !validRoles.includes(roles)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Användare med denna e-postadress finns redan" });
        }
        const newUser = await userModel_1.default.create({
            name,
            email,
            password,
            roles,
        });
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            roles: newUser.roles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    const { id, name, email, roles } = req.body;
    console.log(req.body);
    if (roles && !validRoles.includes(roles)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        // Hitta och uppdatera användaren baserat på id
        const updateUser = await userModel_1.default.findOneAndUpdate(
        // objektet vi letar efter
        { _id: id }, 
        // fälten som ska uppdateras
        { name, email, roles }, 
        // returnera det uppdaterade json dokumentet
        { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            roles: updateUser.roles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const userToDelete = await userModel_1.default.findByIdAndDelete(id);
        console.log("User deleted successfully", userToDelete);
        res.status(200).json(id);
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUser = deleteUser;
