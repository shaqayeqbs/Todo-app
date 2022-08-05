import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./todo-item";
import { Droppable } from "react-beautiful-dnd";

interface props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setInProgressTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    CompletedTodos: Array<Todo>;
    inProgressTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
    todos,
    setTodos,
    inProgressTodos,
    setInProgressTodos,
    CompletedTodos,
    setCompletedTodos,
}) => {
    return (
        <div className=" md:flex justify-between w-full mt-5  overflow-auto">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`relative rounded-lg flex flex-col shadow-xl w-full  md:w-[30%]  md:h-fit p-10 my-10 bg-[#111]  ${snapshot.isDraggingOver ? "bg-[#f3f3f3]" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="absolute top-[-1rem] text-lg bg-[#ec1291] text-white w-44 text-center rounded-md p-1">وظیفه ها</span>
                        {todos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={todos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {/* //////////////////////////////////////// */}
            <Droppable droppableId="TodosInProgress">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`relative rounded-lg flex flex-col shadow-xl  w-full  md:w-[30%] h-fit p-10 my-10 bg-[#111] ${snapshot.isDraggingOver ? "bg-[#f3f3f3]" : "remove"
                            }`}
                    >
                        <span className="absolute top-[-1rem] text-lg bg-[#ec1291] text-white w-44 text-center rounded-md p-1">در حال انجام</span>
                        {inProgressTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={inProgressTodos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setInProgressTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {/* /////////////////////////////////////////// */}
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`relative rounded-lg flex flex-col shadow-xl  w-full  md:w-[30%] h-fit  p-10 my-10 bg-[#111] ${snapshot.isDraggingOver ? "bg-[#f3f3f3]" : "remove"
                            }`}
                    >
                        <span className="absolute top-[-1rem] text-lg bg-[#ec1291] text-white w-44 text-center rounded-md p-1">انجام شده</span>
                        {CompletedTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={CompletedTodos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
