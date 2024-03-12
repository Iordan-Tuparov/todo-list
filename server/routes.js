const routes = require("express").Router();

const todoController = require("./controllers/todoController");

routes.use(todoController);

module.exports = routes;
