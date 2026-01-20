
const jwt = require("jsonwebtoken");

 const isAuthenticated = (req, res, next) => {
  let token;

  // Expect token as: Authorization: Bearer TOKEN
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1] || req?.cookies?.token;
  }


  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { email: "john@gmail.com" }, setted from login api from user controller
    // console.log(decoded, "from isAuthenticated");
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};


module.exports = {
  isAuthenticated
};
