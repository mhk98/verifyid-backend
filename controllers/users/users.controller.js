const db = require("../../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt_token");
const jwt = require("jsonwebtoken");
const { ErrorLogger } = require("../../utils/logger");
const User = db.user;

exports.signup = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const data = {
      Name,
      Email,
      Password,
      image: req.file.path,
    };

    console.log(req.body);
    console.log(req.file);
    const isUserExist = await User.findOne({
      where: { Email: req.body.Email },
    });

    if (isUserExist) {
      return res.status(409).send("User already exist");
    }

    const user = await User.create(data);
    res.status(200).send({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    //checking refresh token from cookies
    // console.log("cookie", req.cookies);
    const user = await User.findAll();

    res.status(200).send({
      status: "Success",
      message: "This is your all data",
      data: user,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "No data found",
      error: error.message,
    });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = req.body;
    // console.log(req.body);
    const user = await User.findOne({
      where: { User_ID: id },
    });

    if (!user) {
      return res.status(401).send({
        status: "fail",
        message: "No user found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "This is your information",
      data: user,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = req.body;
    // console.log(req.body);
    const user = await User.destroy({
      where: { User_ID: id },
    });

    if (!user) {
      return res.status(401).send({
        status: "fail",
        message: "No user found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "User delete successfully",
      data: user,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  // console.log('update_user', req.body);
  try {
    const { email } = req.params;
    const { Password } = req.body;

    if (!email) {
      return res.send("Email not found");
    }

    const user = await User.findOne({ Where: { Email: email } });

    if (!user) {
      return res.send("User not found");
    }

    const salt = await bcrypt.genSaltSync(10);
    user.Password = bcrypt.hashSync(Password, salt);
    // Update the user's password and hash it

    // Save the updated user
    await user.save();

    console.log("userInfo", user);

    // const result = await User.update(req.body, { where: { Email: email } });
    // if (!result) {
    //   return res.send("Result not found");
    // }
    res.status(200).send({
      status: "Success",
      message: "Successfully role update",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Not update role",
      error: error.message,
    });
  }
};

module.exports.editAdmin = async (req, res) => {
  // console.log('update_user', req.body);
  try {
    const { id } = req.params;

    if (!id) {
      return res.send("Id not found");
    }

    const result = await User.update(req.body, { where: { User_ID: id } });
    if (!result) {
      return res.send("Result not found");
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully user update",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Not update role",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    // console.log(req.body);

    if (!Email || !Password) {
      res.status(401).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    const user = await User.findOne({ where: { Email: Email } });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found. Please create an account first",
      });
    }

    const isPasswordValid = bcrypt.compareSync(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password or email is not correct",
      });
    }

    const accessToken = generateToken(user);

    //set refresh token into cookie
    const cookieOptions = {
      secure: process.env === "production" ? true : false,
      httpOnly: true,
    };
    // res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);
    const data = {
      accessToken,
      user,
    };
    res.status(200).send({
      status: "Success",
      message: "Logged in successfully",
      data,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Username or password is not curret",
      error: error.message,
    });
  }
};
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    let verifiedToken = null;

    //refresh token verify
    try {
      verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.send("Invalid refresh token");
    }

    const { Email, role } = verifiedToken;

    //Check delete user refresh token
    const isUserExist = await User.findOne({
      where: { Email: Email },
    });

    if (!isUserExist) {
      return res.send("User does not exist");
    }

    //Generate new token
    const newAccessToken = jwt.sign(
      { Email: Email, role: role },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "365d",
      }
    );

    //set refresh token into cookie
    const cookieOptions = {
      secure: process.env === "production" ? true : false,
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).send({
      status: "Success",
      message: "Logged in successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
