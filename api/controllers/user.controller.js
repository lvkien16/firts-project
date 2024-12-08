import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { password: userPassword, ...rest } = user.toObject();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("access_token")
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
