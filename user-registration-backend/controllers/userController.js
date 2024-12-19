import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const user = req.user;
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const updateUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
