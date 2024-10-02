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
    { id: user.id, name: user.name, email: user.email, roles: user.roles },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: { name: user.name, email: user.email, roles: user.roles },
  };
};

//här kan vi lägga till andra auth operations, som logout eller change of password

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  roles: string[]
) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    roles: rolesArray,
  });
  try {
    return await newUser.save();
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("User registration failed");
  }
};
