import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  //generera JWT-token
  const token = jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "1h",
    }
  );

  return { token, user };
};

//här kan vi lägga till andra auth operations, som logout eller change of password
