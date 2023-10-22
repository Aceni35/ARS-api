const { use } = require("express/lib/router");
const User = require("../schemas/userSchema");

const addUser = async (req, res) => {
  const { name, birthdate, password } = req.body;
  if (!name || !birthdate || !password) {
    res.status(400).json({ error: "Error with code 400 Bad request" });
    return;
  }
  const exists = await User.findOne({ name: name });
  if (exists) {
    res
      .status(400)
      .json({ error: "Error with code 400 please provide unique name" });
    return;
  }
  const newUser = await User.create({ name, birthdate, password });
  res.status(201).json({ newUser });
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

const removeUser = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Error with code 400 please provide name" });
    return;
  }
  const remove = await User.findOne({ name: name });
  if (!remove) {
    res
      .status(400)
      .json({ error: "Error with code 400 please provide valid name" });
    return;
  }
  const del = await User.findOneAndDelete({ name: name });
  res.status(200).json({ message: "user removed" });
};

const editUser = async (req, res) => {
  const { newName, password, name } = req.body;
  if (!newName || !password || !name) {
    res
      .status(400)
      .json({ error: "Error with code 400 please provide the details" });
    return;
  }
  const user = await User.findOne({ name: name });
  if (!user) {
    res
      .status(400)
      .json({ error: "Error with code 400 please provide correct name" });
    return;
  }
  if (password != user.password) {
    res
      .status(401)
      .json({ error: "Error with code 401 please provide correct password" });
    return;
  }
  const unique = await User.findOne({ name: newName });
  if (unique) {
    res.status(400).json({
      error: "Error with code 400 please provide unique name",
    });
    return;
  }
  const updated = await User.findOneAndUpdate(
    { name: name },
    { name: newName },
    { new: true }
  );
  res.status(200).json({ updated });
};

module.exports = { getUsers, editUser, removeUser, addUser };
