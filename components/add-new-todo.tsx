import React, { HtmlHTMLAttributes, useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';

interface IAddItem {
    onAddItem: (e: React.FormEvent) => void
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;

}
const AddNewTodo: React.FC<IAddItem> = ({ todo, setTodo, onAddItem }) => {

    const textRef = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={(e) => {
            onAddItem(e);
            if (textRef.current) { textRef.current.value = '' }

        }}>
            <div className='flex justify-between bg-[#111] rounded-lg p-4 min-h-[2rem] m-4'>
                <input type='text' defaultValue={todo} id='todo' name='todo' placeholder='اضافه کردن وظیفه ' className='w-full border-b-4 border-[#ec1291] m-2 px-4 bg-transparent text-white focus-within:outline-none focus-visible:outline-none focus-within:bg-transparent' onChange={(e) => setTodo(e.target.value)} ref={textRef} />
                <button className='flex justify-center items-center text-xl bg-[#ec1291] text-[white] w-14  text-center  mx-1 rounded-full ' type='submit'>   <AiOutlinePlus /> </button>
            </div>
        </form>
    )
}

export default AddNewTodo