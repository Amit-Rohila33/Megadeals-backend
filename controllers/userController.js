const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// REGISTER A USER

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sampleId",
      url: "This is a simple url",
    },
  });

  sendToken(user, 201, res);
});

// Login a user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password"), 400);
  }

  const user = await User.findOne({ email }).select(+"password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"), 401);
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"), 401);
  }

  sendToken(user, 200, res);
});
