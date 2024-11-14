import axios from "axios";
import { storeInLocalStorage } from "../src/common/session";

export const authenticatingUser = async (route, formData, setUserAuth) => {
  try {
    const res = await axios.post(route, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assuming the response data is available in res.data
    const userData = res.data;

    // Store user data in session
    storeInLocalStorage("user", JSON.stringify(userData));

    // Set the user authentication context
    setUserAuth(userData);

    // Return the response object
    return res;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during authentication", error);

    // In case of error, return a structured response (fallback to avoid undefined data)
    return { data: null, error: error.response || error.message };
  }
};
