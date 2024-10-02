"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.login = void 0;
const authService_1 = require("../services/authService");
const userService_1 = require("../services/userService");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await (0, authService_1.loginUser)(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
exports.login = login;
const validRoles = ["user", "admin", "superadmin"];
const registerUserController = async (req, res) => {
  const { name, email, password, roles } = req.body;
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  if (roles && !validRoles.includes(roles)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  try {
    const existingUser = await (0, userService_1.findUserByEmail)(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Användare med denna e-postadress finns redan" });
    }
    const newUser = await (0, authService_1.registerUser)(
      name,
      email,
      password,
      roles
    );
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roles: newUser.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
exports.registerUserController = registerUserController;
