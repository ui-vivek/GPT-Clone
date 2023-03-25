const chalk = require("chalk");
const userModel = require("../models/userModel");
const errorResponce = require("../utils/errorResponce");
const errorHandler = require("../middelwares/authMeddelware");

//JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

//REGISTER
exports.registerController = async (res, req, next) => {
  try {
    const { username, email, password } = req.body;
    //allready exisist user
    const exisistingEmail = await userModel.findOne({ email });
    if (exisistingEmail) {
      return next(new errorResponce("Email is already registered.", 500));
    }
    const user = await userModel.create({ username, email, password });
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(chalk.red.inverse(error));
    next(error);
  }
};
//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return next(new errorResponce("Please email password .!"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(
        new errorResponce("Please enter valid email and password .", 401)
      );
    }
    const isMatch = await userModel.matchPassword(password);
    if (!isMatch) {
      return next(new errorHandler("Invalid Email and Password .!", 401));
    }
    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(chalk.redBright.inverse(error));
    next(error);
  }
};
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
