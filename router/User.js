const express = require("express");

const {
  getUsers,
  editUser,
  removeUser,
  addUser,
} = require("../controlers/userControler");

const Router = express.Router();

Router.route("/user")
  .get(getUsers)
  .delete(removeUser)
  .put(editUser)
  .post(addUser);

module.exports = Router;
