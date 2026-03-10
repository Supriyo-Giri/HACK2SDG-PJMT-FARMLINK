import { User } from "../models/User.js";
import { Session } from "../models/Session.js";
import logger from "../utils/logger.js";
import { generateEmailVerificationToken } from "../utils/generateEmailVerificationToken.js";
import bcrypt from "bcrypt";
import { verifyEmail } from "../utils/emailVerify.js";
import { ENV } from "../utils/env.js";
import jwt from "jsonwebtoken";
import { sendOTPMail } from "../utils/sendOTPMail.js";

export const healthCheckController = (req, res) => {
  try {
    logger.info(`Service up and running...`);
    return res.status(200).json({
      success: true,
      message: "Service up and running...",
    });
  } catch (error) {
    logger.info(`Error in Auth controller: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    if (!name || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      role: role,
    });

    const token = generateEmailVerificationToken(newUser);

    //sending email here
    verifyEmail(name, email, token);

    //storing the token in the token field of the user
    newUser.token = token;

    await newUser.save();
    // return res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user: newUser,
    // });
    const safeUser = await User.findById(newUser._id).select(
      "-password -otp -otpExpiry -token",
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (error) {
    logger.error(`Error in register user controller: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const verifyEmailController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or Invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET);

      //fetching user from db:
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      user.token = null;
      user.isVerified = true;

      //save the verification status on db:
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      logger.error(`Error in verifying token: ${error.message}`);
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }
  } catch (error) {
    logger.error(`Error in verify Email Controller ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Error in verify Email Controller ${error.message}`,
    });
  }
};
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const passwordValidation = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordValidation) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (existingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email, then login again!",
      });
    }

    // Generate Tokens
    const accessToken = jwt.sign({ id: existingUser._id }, ENV.JWT_SECRET, {
      expiresIn: "3d",
    });

    const refreshToken = jwt.sign({ id: existingUser._id }, ENV.JWT_SECRET, {
      expiresIn: "30d",
    });

    existingUser.isLoggedIn = true;
    await existingUser.save();

    // Remove existing session
    const existingSession = await Session.findOne({
      userId: existingUser._id,
    });

    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id });
    }

    // Create new session
    await Session.create({
      userId: existingUser._id,
      refreshToken,
    });

    // Cookie Options
    const accessCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    };

    const refreshCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    // Set cookies
    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    // return res.status(200).json({
    //   success: true,
    //   message: `Welcome back ${existingUser.name}`,
    //   user: existingUser,
    // });
    const safeUser = await User.findById(existingUser._id).select(
      "-password -otp -otpExpiry -token",
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back ${existingUser.name}`,
      user: safeUser,
    });
  } catch (error) {
    logger.error(`Error in login User controller: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logoutController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "No session found",
      });
    }

    await Session.deleteOne({ refreshToken });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const reVerifyEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const token = generateEmailVerificationToken(user); //generate verification token
    verifyEmail(user.name, email, token); //sending email here

    user.token = token;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    logger.error(`Error in register controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Error in reVerify Email Controller: ${error.message}`,
    });
  }
};
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User not found`,
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //10 mintues

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendOTPMail(user.name, email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent to email successfully",
    });
  } catch (error) {
    logger.error(`Error in forgot Password Controller: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyOTPController = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.params.email;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "otp is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // console.log(user.otp, user.otpExpiry)
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP is not generated or already verified",
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired pls generate a new one!",
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    logger.error(`Error in verify OTP controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const changePasswordController = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    logger.error(`Error in change Password controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const allUserController = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    logger.error(`Error in fetching all user controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "-password -otp -otpExpiry -token",
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(`Error in fetching user by id controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};