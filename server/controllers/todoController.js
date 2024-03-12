const router = require("express").Router();

const todoService = require("../services/todoService");

router.get("/", async (req, res) => {
    const allTodos = await todoService.getAll();

    res.status(200).json(allTodos);
});

router.post("/", async (req, res) => {
    const createdTodo = await todoService.create(req.body);

    res.status(200).json(createdTodo);
});

router.delete("/", async (req, res) => {
    const deletedTodo = await todoService.deleteOne(req.body.id);

    res.status(200).json(deletedTodo);
});

router.delete("/", async (req, res) => {
    const deletedTodo = await todoService.deleteOne(req.body.id);

    res.status(200).json(deletedTodo);
});

router.put("/", async (req, res) => {
    const updatedTodo = await todoService.updateOne(req.body.id);

    res.status(200).json(updatedTodo);
});

module.exports = router;
