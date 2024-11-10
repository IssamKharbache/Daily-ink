import { nanoid } from "nanoid";
import User from "../Schema/User.js";
import jwt from "jsonwebtoken";
//generate username
export const generateUsername = async (email) => {
  let username = email.split("@")[0];
  //check if the username already exists
  let isUsernameExists = await User.exists({
    "personal_info.username": username,
  }).then((data) => data);
  //if the username already exists, add a random number to the end of the username
  isUsernameExists ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

//format data to send to frontend
export const formatDataToSend = (user) => {
  //create a token
  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    fullname: user.personal_info.fullname,
    username: user.personal_info.username,
  };
};
