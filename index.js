require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("./prismaClient");
const { Role } = require("@prisma/client");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // 1. Check input data + sanitize and normalize the input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();
    let selectedRole = Role.Buyer;
    const arrRole = Object.values(Role);

    if (role) {
      const isAvailableRole = arrRole.includes(role);
      if (isAvailableRole) {
        selectedRole = role;
      } else {
        return res.status(400).json({ message: "Role didn't found!" });
      }
    }

    // 2. Check Duplicate email / existing from table users
    const isEmailExisted = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (isEmailExisted) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // 3. Hash Password & Store data to DB
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        role: selectedRole,
      },
    });

    // 4. Return Response
    res.status(201).json({
      message: "Successfully create new user!",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Server running on port : ${port}`));
