const { Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = require("../config/prismaClient");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
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
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // 1. Validate first, then sanitize & normalize the input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    // 2. Check email input and compare with existing from DB
    const selectedUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!selectedUser) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // 3. Compare between input password and existing password from DB
    const { password: hashedPassword } = selectedUser;
    const isPasswordValid = await bcrypt.compare(cleanPassword, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const payload = {
      id: selectedUser.id,
      email: selectedUser.email,
      role: selectedUser.role,
    };

    // 4. Generate token for accessing the features
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 5. Return response
    res.status(200).json({ message: "Login Success!", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login };
