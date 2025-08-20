import express from "express";
import { createUser, authenticateUser } from "../services/userService.js";

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { username, password, email, name, group } = req.body;

    if (!username || !password || !email || !name || !group) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userId = await createUser({
      username,
      password,
      email,
      name,
      group,
    });

    res.status(201).json({ userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const user = await authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;
