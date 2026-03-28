import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // ✅ Read from header (Bearer token) OR cookie as fallback
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1] || req.cookies?.jwt;

  console.log("TOKEN:", token ? "present" : "missing");

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // ✅ Use env variable, NOT a hardcoded string
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};