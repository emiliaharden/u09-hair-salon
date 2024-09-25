"use strict";
// userService ansvarar för affärslogik och databasoperationer
// relaterade till användarhantering.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByName = exports.findUserByEmail = exports.deleteUser = exports.resetUserPassword = exports.updateUserPassword = exports.updateUser = exports.getAllUsers = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// export const createUser = async (
//   name: string,
//   email: string,
//   password: string,
//   roles: string
// ) => {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const newUser = new User({ name, email, password: hashedPassword, roles });
//   return await newUser.save();
// };
//hämtar alla user
const getAllUsers = async () => {
    return await UserModel_1.default.find().select("-password");
};
exports.getAllUsers = getAllUsers;
//uppdatera user
const updateUser = async (id, name, email, roles) => {
    return await UserModel_1.default.findOneAndUpdate({ _id: id }, { name, email, roles }, { new: true });
};
exports.updateUser = updateUser;
// uppdatera bara lösenord för user
const updateUserPassword = async (id, currentPassword, newPassword) => {
    try {
        console.log(`Findin user with ID: ${id}`);
        const user = await UserModel_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        //kolla om nuvarande lösen stämmer
        const isMatch = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }
        // hasha nya lösen i databasen
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        //uppdatera lösen i databasen
        const updatedUser = await UserModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        return updatedUser;
    }
    catch (error) {
        throw new Error(`Error updating password: ${error.message}`);
    }
};
exports.updateUserPassword = updateUserPassword;
//  om användar glömt lösen
const resetUserPassword = async (id, newPassword) => {
    try {
        const user = await UserModel_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // hasha nya lösen i databasen
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        //uppdatera lösen i databasen
        const updatedUser = await UserModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        return updatedUser;
    }
    catch (error) {
        throw new Error(`Error resetting password: ${error.message}`);
    }
};
exports.resetUserPassword = resetUserPassword;
//ta bort användare
const deleteUser = async (id) => {
    return await UserModel_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
// hitta user mha email
const findUserByEmail = async (email) => {
    return await UserModel_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
// hitta user mha namn
const findUserByName = async (name) => {
    return await UserModel_1.default.findOne({ name });
};
exports.findUserByName = findUserByName;
