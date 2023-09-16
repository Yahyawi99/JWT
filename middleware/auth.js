const CustomErrors = require("../errors");
const jwt = require("jsonwebtoken");

const authMidleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomErrors.UnauthenticatedError("Invalid Credentials!");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomErrors.UnauthenticatedError("Invalid Credentials!");
  }
};

module.exports = authMidleware;
