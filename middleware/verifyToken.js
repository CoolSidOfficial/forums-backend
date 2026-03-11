import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  
  const token = req.cookies.jwt;
  console.log("COOKIES:", req.cookies);


  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {

    const decoded = jwt.verify(token, "afdfds");

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({ message: "Invalid or expired token" });

  }

};