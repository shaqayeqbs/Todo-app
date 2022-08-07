import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`bg-[#ec1291] shadow-xl flex w-full rounded-md py-10 px-3 justify-between mt-8 transation  ${snapshot.isDragging ? "shadow-xl" : ""}`}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="flex-1 p-[5px] border-none outline-none"
                            ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <s className="w-full border-none text-lg text-white ">{todo.todo}</s>
                    ) : (
                        <span className="w-full todos__single--text text-white">{todo.todo}</span>
                    )}
                    <div className="flex justify-between">
                        <span
                            className="cursor-pointer text-xl mr-2 ml-2 text-white"
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                } else if (edit) {
                                    setEdit(false)
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                        <span className="cursor-pointer text-xl ml-2  text-white" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="cursor-pointer text-xl  text-white " onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;
