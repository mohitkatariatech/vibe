import jwt from "jsonwebtoken";


const isAuth = (req,res,next) => {
  try {
    const token = req.cookies.token;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Invalid or missing token" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Auth error: " + error.message });
  }
}

export default isAuth
