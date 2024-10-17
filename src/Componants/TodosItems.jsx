import { LiaCircle } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TodosItems = ({ text, display, settoDO, no, toDO }) => {
  // Function to toggle the strike-through display
  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("ToDos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        data[i].display = data[i].display === "" ? "line-through" : "";
        break;
      }
    }
    settoDO(data); // Update the state after modifying the data
  }

  // Function to toggle the visibility of the details
  const toggleDetails = (no) => {
    const updatedTodos = toDO.map(todo =>
      todo.no === no ? { ...todo, detailsVisible: !todo.detailsVisible } : { ...todo, detailsVisible: false }
    );
    settoDO(updatedTodos); // Update the state with the modified todos
  };

  // Find the specific todo item for this component
  const currentTodo = toDO.find(todo => todo.no === no);

  return (
    <div className="flex items-center justify-between relative w-full mb-2 cursor-pointer">
      <div onClick={() => toggle(no)} className='w-10 h-10 flex items-center justify-center'>
        {display === ""
          ? (<LiaCircle className='w-8 h-8 rounded-full' style={{ color: '#E11D48' }} />)
          : (<GoCheckCircle className='w-8 h-8' style={{ color: '#22C55E' }} />)
        }
      </div>

      {/* Todo item text with details button */}
      <div className='flex items-center justify-between text-white w-[90%] bg-[#131313] rounded-full border border-zinc-700 shadow-md hover:shadow-lg transition duration-500 ease-in-out pl-5 pr-5 p-3 overflow-hidden'>
        {text}

        <div onClick={() => toggleDetails(no)} className='w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-zinc-800'>
          <RxDotsHorizontal className='w-7 h-7' style={{ color: '#ffffff' }} />
        </div>

        {/* Details container */}
        {currentTodo && currentTodo.detailsVisible && (
          <div
            className="flex flex-col justify-between"
            style={{
              position: 'absolute',
              top: '40px',
              right: '60px',
              width: '120px',
              height:'90px',
              backgroundColor: '#40404090',
              backdropFilter: 'blur(10px)',
              border: '1px solid ##29292C',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: '1000',
              display:'flex',
              flexDirection:'column',
              gap:'5px',
            }}
          >
            <div className="flex gap-1 box-border h-[50%] w-[100%] hover:bg-neutral-700 p-2 rounded-lg items-center justify-between">
              <h2>Edit</h2>
              <MdEdit className='w-7 h-7' style={{ color: '#ffffff' }} />
            </div>
            <div className="flex gap-1 box-border h-[50%] w-[100%] hover:bg-neutral-700 p-2 rounded-lg items-center justify-between">
              <h2>Delete</h2>
              <MdDelete className='w-7 h-7' style={{ color: '#ffffff' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodosItems;
