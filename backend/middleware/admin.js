import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token tidak ada" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRETKEY"); 
    req.user = decoded;  // ⬅ sangat penting!
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};
