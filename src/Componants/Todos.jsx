import {useEffect, useState, useRef} from 'react'
import { GoPlus } from "react-icons/go";
import TodosItems from './TodosItems';

const Todos = () => {
    const [toDO, settoDO] = useState([]);
    const inputRef = useRef(null);
    useEffect(() => {
        settoDO(JSON.parse(localStorage.getItem("ToDos")));
    },[])
    
    useEffect(()=>{
        setTimeout(() => {      
            localStorage.setItem("ToDos", JSON.stringify(toDO));
        }, 100);
    },[toDO])
    let a = useRef(0);
    const add = () => {
        if (inputRef.current.value !== "") {
            a.current += 1;
            settoDO([...toDO,{no: a.current,text:inputRef.current.value,display:""}])
            inputRef.current.value=''; 
        }
    }

    
    return (
        <div className='lg:w-[40vw] lg:h-[90vh] md:w-[60vw] md:h-[90vh] sm:w-[80vw] sm:h-[50vh] flex flex-col items-center justify-center bg-neutral-900 rounded-lg border border-zinc-700 shadow-xl overflow-hidden p-8 space-y-6'>
            <h3 className='text-white font-semibold text-3xl mb-4'>Add Your<span className='text-green-500'> ToDo</span></h3>
            <div className='flex items-center justify-between w-full bg-neutral-700 rounded-full border border-zinc-600 shadow-inner hover:shadow-lg transition duration-500 ease-in-out p-1'>
                <input
                    className='flex-1 bg-transparent focus:outline-none placeholder-neutral-400 text-white pl-4 pr-4 p-2 rounded-full'
                    placeholder="Add to the list of ToDos"
                    type='text'
                    ref={inputRef}
                    required={true}
                />
                <button
                    className='bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:scale-105 text-white font-semibold px-6 py-2 rounded-full flex items-center justify-center transition duration-300 ease-in-out'
                    type="submit"
                    onClick={() => {add()} }
                    title='Click to Add'           
                >
                    Add <GoPlus className='ml-2 w-6 h-6' />
                </button>
            </div>
            <div className="w-full flex-col content-center items-center justify-center gap-5 pr-3 overflow-y-auto">
                {toDO.map((items, index)=>(
                    <TodosItems key={index} text={items.text} no={index+1} display={items.display} settoDO={settoDO}/>
                ))}
            </div>
        </div>

    )
}

export default Todos