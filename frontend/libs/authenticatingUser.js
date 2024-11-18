import axios from "axios";
import { storeInLocalStorage } from "../src/common/session";

export const authenticatingUser = async (route, formData, setUserAuth) => {
  try {
    const res = await axios.post(route, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = res.data;
    // Store user data in session
    storeInLocalStorage("user", JSON.stringify(userData));
    // Set the user authentication context
    setUserAuth(userData);
    return res;
  } catch (error) {
    console.error("Error during authentication", error);

    return { data: null, error: error.response || error.message };
  }
};
