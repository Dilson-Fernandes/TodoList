import { useState,useEffect } from 'react'
import Navbar from './comonents/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {
  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState(()=>{
    let todoString =JSON.parse(localStorage.getItem("todos"));
    if(todoString)
      return todoString;
    else
      return [];
  });
  const [showFinished,setshowFinished]=useState(true);

  useEffect(() => {
    let todoString=localStorage.getItem("todos");
    if(todoString)
    {
      let todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
     savLoc();
  }, [todos])
  
  const toggleFinished =()=>{
    setshowFinished(!showFinished);
  }
  const savLoc=()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const handleChange= (e)=>{
    setTodo(e.target.value);
  }
  const handleAdd =()=>{
    if(todo!=="")
    setTodos([...todos,{id:uuidv4(),todo , isCompleted:false}]);
    savLoc();
  }
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex((item)=>
      {
        return item.id===id;
      });
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    savLoc();
  }
  const handleEdit=(e,id)=>{
   let t = todos.filter((item)=>{
    return item.id===id;
   });
   setTodo(t[0].todo);
   let newTodos= todos.filter((item)=>{
    if(item.id!=id)
    {
      return item;
    }
  })
  setTodos(newTodos);
  savLoc();
  }
  const handleDelete =(e,id)=>{
    let newTodos= todos.filter((item)=>{
      if(item.id!=id)
      {
        return item;
      }
    })
    setTodos(newTodos);
    savLoc();
  }

  return (
    <>
      <Navbar/>
      <div className='container bg-blue-100 my-5 mx-auto p-5 sm:w-[60%] md:w-[50%] rounded-xl min-h-[75vh]'>
        <h1 className='text-3xl font-bold text-center'>TaskIt- Manage your tasks</h1>
      <h2 className='text-xl font-bold'>Add a todo</h2>
        <div className="addTodo py-3 flex">
          <input type="text"className="w-full" value={todo} onChange={handleChange} />
          <button type="button" className='bg-blue-300 px-2 text-sm font-semibold rounded-md mx-6 hover:bg-blue-600 hover:text-white' onClick={handleAdd}>Add</button>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished} name="show" id="" />
        <label className='my-3' htmlFor="show">Show Finished</label>
        <div className="bg-black my-3 mx-auto w-1/2 h-[0.4px] opacity-50"><h1></h1></div>
        <h1 className='font-bold text-xl'>Your Todos</h1>
        <div className="todos ">
          {(todos.length ===0 && <div>There are no todos </div>)}
        {todos.map((item)=>{
            return ((showFinished || !item.isCompleted) && 
              <div  key={item.id} className="todo flex w-full   my-2 justify-between">
                <div className="flex gap-3">   
                <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckbox}/>
                <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full ">
                  <button onClick={(e)=>handleEdit(e,item.id)} type="button"  className='bg-blue-300 text-sm px-2 rounded-md mx-3  hover:bg-blue-600 hover:text-white'><CiEdit /></button>
                  <button onClick={(e)=>handleDelete(e,item.id)} type="button"  className='bg-blue-300 text-sm px-2 rounded-md mx-3  hover:bg-red-600 hover:text-white'><MdDeleteOutline /></button>
                </div>
              </div>) 
          })}
          </div>
      </div>
    </>
  )
}

export default App
