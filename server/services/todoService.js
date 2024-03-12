const Todo = require("../model/TodoModel");

exports.getAll = () => Todo.find();

exports.create = (todoData) => Todo.create(todoData);

exports.deleteOne = (id) => Todo.findByIdAndDelete({ _id: id });

exports.updateOne = async (id) => {
    const currentTodo = await Todo.findById(id);

    currentTodo.checked = !currentTodo.checked;

    const updatedTodo = await currentTodo.save();

    return updatedTodo;
};
