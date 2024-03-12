import { useEffect, useState } from "react";

export default function TodoList() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    const onAddHandler = (e) => {
        e.preventDefault();

        if (!text) {
            return;
        }

        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ text, checked: false }),
        })
            .then(res => res.json())
            .then(data => {
                setTodos(state => [...state, data]);
                setText('');
            });
    };

    const onChangeHandler = (e) => {
        setText(state => state = e.target.value);
    };

    const onDeleteHandler = (e, id) => {
        e.stopPropagation()

        fetch('http://localhost:3000', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => setTodos(state => state.filter(x => x._id !== data._id)));
    };

    const onClickHandler = (id) => {
        fetch('http://localhost:3000', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => {
                setTodos(
                    (state) => state.map((x) => (x._id === data._id ? { ...x, checked: !x.checked } : x))
                );
            });
    };

    return (
        <div className="todo-list">
            <h1>Todo List <img src="./images/todolist.png" alt="todoPhoto" /></h1>
            <div className="row">
                <form onSubmit={onAddHandler}>
                    <input
                        type="text"
                        name="todo-text"
                        id="input-box"
                        value={text}
                        onChange={onChangeHandler}
                        placeholder="Add your text" />
                    <button>Add</button>
                </form>
            </div>
            <ul>
                {todos.map(x =>
                    <li
                        onClick={() => onClickHandler(x._id)}
                        className={x.checked === true ? "checked" : ""}
                        key={x._id}
                    >
                        {x.text}
                        <span onClick={(e) => onDeleteHandler(e, x._id)}>
                            X
                        </span>
                    </li>
                )}
            </ul>
        </div >
    );
}