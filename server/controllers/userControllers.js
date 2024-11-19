import User from "../Schema/User.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({
      "personal_info.username": username,
    }).select("-personal_info.password -google_auth -updatedAt -blogs");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
