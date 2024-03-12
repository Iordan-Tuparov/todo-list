const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
    },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
