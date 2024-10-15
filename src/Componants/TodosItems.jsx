import { LiaCircle } from "react-icons/lia";
//import { MdDelete } from "react-icons/md";
import { GoCheckCircle } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";

// Event listeners to set hover state



const TodosItems = ({ text, display, settoDO, no }) => {
  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("ToDos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        }
        else {
          data[i].display = "";
        }
        break;
      }
    }
    settoDO(data)
  }
  return (
    <div className="flex items-center justify-between w-full mb-2 cursor-pointer">
      <div onClick={() => { toggle(no) }} className='w-10 h-10 flex items-center justify-center'>
        {display === "" ? (<LiaCircle className='w-8 h-8 rounded-full' style={{ color: '#E11D48' }} />) : (<GoCheckCircle className='w-8 h-8' style={{ color: '#22C55E' }} />)}
      </div>
      <div className='flex items-center justify-between text-white w-[90%] bg-[#131313] rounded-full border border-zinc-700 shadow-md hover:shadow-lg transition duration-500 ease-in-out pl-5 pr-5 p-3 overflow-hidden'>
        {text}
        <div className='w-9 h-9 flex items-center justify-center'>
          <RxDotsHorizontal className='w-7 h-7' style={{ color: '#ffffff' }} />
        </div>
      </div>
    </div>
  )
}

export default TodosItems 