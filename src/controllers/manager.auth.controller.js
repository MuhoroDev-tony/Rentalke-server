const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token);

    if (!process.env.JWT_SECRET) {
      console.error("Error: JWT_SECRET is not set in environment variables");
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // ✅ Now using 'userId' instead of 'id'
    const userId = decoded.userId;
    console.log("Final User ID for Query:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token: User ID missing" });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: userId }, // ✅ Now uses the correct 'userId'
      select: { id: true, email: true, role: true },
    });

    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or token invalid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: error.message || 'Invalid token',
    });
  }
};
