import { LiaCircle } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useRef } from "react";


const TodosItems = ({ text, display, settoDO, no, toDO }) => {
  const inputValue = useRef(text)
  // Function to toggle the strike-through display
  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("ToDos"));
    data[no].display = data[no].display === "" ? "line-through" : "";
    settoDO(data); // Update the state after modifying the data
  };

  // Function to remove the todo item
  const remove = (no) => {
    const updatedTodos = toDO.filter((_, i) => i !== no); // Use index for removing the item
    settoDO(updatedTodos); // Update the state with the modified todos
  };
  const handleEditAbleInput = (no) => {
    const todoContainer = document.querySelectorAll("#todocontainer")
    todoContainer[no].setAttribute("contentEditable", "true");
    console.log(todoContainer[no])
  };

  // Function to toggle the visibility of the details
  const toggleDetails = (no) => {
    const updatedTodos = toDO.map((todo, i) =>
      i === no ? { ...todo, detailsVisible: !todo.detailsVisible } : { ...todo, detailsVisible: false }
    );
    settoDO(updatedTodos); // Update the state with the modified todos
  };

  // Find the specific todo item for this component
  const currentTodo = toDO[no]; // Use the index directly here

  return (
    <div className="flex items-center justify-between z--1 w-full mb-2 cursor-pointer">
      <div onClick={() => toggle(no)} className='w-10 h-10 flex items-center justify-center'>
        {display === ""
          ? (<LiaCircle className='w-8 h-8 rounded-full' style={{ color: '#E11D48' }} />)
          : (<GoCheckCircle className='w-8 h-8' style={{ color: '#22C55E' }} />)
        }
      </div>

      <div className='flex items-center justify-between text-white w-[90%] bg-[#131313] rounded-full border border-zinc-700 shadow-md hover:shadow-lg transition duration-500 ease-in-out pl-5 pr-5 p-3 overflow-hidden'>
        <div ref={inputValue} id="todocontainer" contentEditable="false" suppressContentEditableWarning={true}>
        {text}
        </div>
        <div onClick={() => toggleDetails(no)} className='w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-zinc-800'>
          <RxDotsHorizontal className='w-7 h-7' style={{ color: '#ffffff' }} />
        </div>

        {currentTodo && currentTodo.detailsVisible && (
          <div
            className="flex flex-col justify-between"
            style={{
              position: 'absolute',
              right: '60px',
              width: '100px',
              height: '90px',
              backgroundColor: '#40404090',
              backdropFilter: 'blur(10px)',
              border: '1px solid ##29292C',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: '1000',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
            }}
          >
            <div onClick={() => handleEditAbleInput(no)} className="flex gap-1 box-border h-[50%] w-[100%] hover:bg-neutral-700 p-2 rounded-lg rounded-bl-none rounded-br-none items-center justify-between">
              <h2>Edit</h2>
              <MdEdit className='w-6 h-6' style={{ color: '#ffffff' }} />
            </div><hr className="bg-zinc-400 " style={{ display: "block", border: "none", height: "1px", padding: "1px" }} />
            <div onClick={() => remove(no)} className="flex gap-1 box-border h-[50%] w-[100%] hover:bg-neutral-700 p-2 rounded-lg rounded-tl-none rounded-tr-none items-center justify-between">
              <h2>Delete</h2>
              <MdDelete className='w-6 h-6' style={{ color: '#ffffff' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodosItems;
