const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("User allready exist with such an email");
    }

    password = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, lastName, email, password });

    console.log("Created User", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    // console.log("user", userId);
    const user = await User.findById(userId);
    // .populate("address");
    if (!user) {
      throw new Error("User not found with id: ", userId);
    }
    
    return user;
    
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with email: ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    // console.log(token);
    const user = await findUserById(userId);
    // console.log("user:", user);
    if (!user) {
      console.log(userId);

      throw new Error("User not found with id: ", userId);
    }
    console.log("user ", user);
    return user.populate("addresses");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findUserById,
  createUser,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
