const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const jwt = require("jsonwebtoken");

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomErrors.BadRequestError("Please provide both values!");
  }

  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(StatusCodes.OK).json({ msg: "user created successfully", token });
};

// Dashboard
const dashboard = async (req, res) => {
  const { username, id } = req.user;

  res.status(StatusCodes.OK).json({
    msg: `Welcome ${username}`,
    secret: `Your id is ${id}`,
  });
};

module.exports = {
  login,
  dashboard,
};
