import { z } from "zod";

//check if the string is empty function
const requiredString = (message) => z.string().trim().min(1, message);
//sign up schema
export const signUpSchema = z.object({
  fullname: requiredString("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only letters, numbers , undercore and dash are allowed"
    ),
  email: requiredString("Email is required").email("Invalid email address"),
  password: requiredString("Password is required").regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    "Password should be 6 to 20 characters long and should contain atleast one number and one uppercase and one lowercase character"
  ),
});

export const loginSchema = z.object({
  email: requiredString("Email is required").email("Invalid email address"),
  password: requiredString("Password is required"),
});
