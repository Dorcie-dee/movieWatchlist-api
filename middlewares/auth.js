import jwt  from "jsonwebtoken";

const authMiddleware = (req, res, next) =>{
  try{
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({message: "Access denied. No token provided"});
    }

    //extracting token(bearer <TOKEN>)
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({message: "Invalid token format."});

    //verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // this attachs user info (userId) to req object

    next(); // this proceeds to the next middleware/controller
  } catch(error) {
    res.status(403).json({message:"Invalid or expired token"});
  }
};

export default authMiddleware