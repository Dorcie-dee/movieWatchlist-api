import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";


//register
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input
    if(!email || !password) {
      return res.status(400).json({message: "Email and password are required"});
    }

    //check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //creating new user
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register function:", error); // this logs the error 
    res.status(500).json({ message: "Something went wrong" });
  }
};


//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const userMan = await UserModel.findOne({ email });
    if (!userMan) return res.status(400).json({ message: "Invalid email or password" });

    //check password
    const isMatch = await bcrypt.compare(password, userMan.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    //generate JWT token
    const token = jwt.sign({ userId: userMan._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong " });
  }
};