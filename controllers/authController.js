  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import { User } from "../models/User.js";

  export async function signup(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
      }

      const exists = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (exists) {
        return res.status(400).json({
          message: "Username or email already exists",
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashed,
      });

      await newUser.save();

      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({
        message: "Signup failed",
        error: err.message,
      });
    }
  }

  export async function login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        $or: [{ username }, { email: username }],
      });

      if (!user) {
        return res.status(400).json({ message: "User doesn't exist, please signup" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  }
  export const verify = (req, res) => {
    res.status(200).json({
      user: req.user,
    });
  };