import type { NextPage } from 'next'
import Head from 'next/head'
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TodoList from '../components/todo-list'
import AddNewTodo from '../components/add-new-todo'
import { useState } from 'react'
import { Todo } from '../models/models';
import '../public/B_Yekan/Yekan.ttf';
import { GoCalendar } from 'react-icons/go'


const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inprogressTodos, setInProgressTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const addItemHandler = (e: React.FormEvent) => {

    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }

  }
  console.log(todo)
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let inprogress = inprogressTodos;
    let complete = CompletedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosInProgress") {
      add = inprogress[source.index];
      inprogress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    }
    else if (destination.droppableId === "TodosInProgress") {
      inprogress.splice(destination.index, 0, add);
    }
    else {
      complete.splice(destination.index, 0, add);
    }

    setInProgressTodos(inprogress);
    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" w-full p-4 overflow-auto md:mx-auto md:w-[80%] " >
        <Head>
          <title>TODO</title>
          <meta name="description" content="todo app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className='flex  min-h-[4rem] py-5 text-[#f0f0f1] rounded-lg m-4 bg-[#111]'>
          <span className='w-8 h-8 text-4xl px-4 text-[#ec1291]'><GoCalendar /></span>
          <div className='text-center mx-auto text-lg' >اپلیکیشن برنامـہ ریزے روزانه  </div>
        </header>
        <main className='overflow-x-auto' >
          <AddNewTodo onAddItem={addItemHandler} todo={todo} setTodo={setTodo} />
          <div className='md:flex px-4 md:min-h-[100vh] w-full overflow-auto'>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              CompletedTodos={CompletedTodos}
              setCompletedTodos={setCompletedTodos}
              inProgressTodos={inprogressTodos}
              setInProgressTodos={setInProgressTodos}
            />

          </div>
        </main>
      </div>
    </DragDropContext>
  )
}

export default Home
