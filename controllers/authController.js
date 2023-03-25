const chalk = require("chalk");
const userModel = require("../models/userModel");
const errorResponce=require('../utils/errorResponce')

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
    const exisistingEmail = await userModel.findOne({email});
    if(exisistingEmail){
        return next(new errorResponce("Email is already registered.",500));
    }
    const user=await userModel.create({username,email,password});
    this.sendToken(user,201,res);
  } catch (error) {
    console.log(chalk.red.inverse(error));
    next(error);
  }
};
exports.loginController = async () => {};
exports.logoutController = async () => {};
