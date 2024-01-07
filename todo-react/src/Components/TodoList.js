import React, {useState, useRef} from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const TodoList = ({ todos, delete_todo, updated, completeTodo}) => {

    let taskRef = useRef(null)
    let [toggle, setToggle] = useState(false)
    let [todoItem, setTodoItem] = useState("")
    let [todoId, setTodoId] = useState(0)
    let [todo, setTodo] = useState({})

    const toggleModel = (item,id,todo)=>{
        setToggle(true)
        setTodoItem(item)
        setTodoId(id)
        setTodo(todo)
    }

    return (
        <>
            <div className="todo-list">
                {todos.map((todo,index) => 
                        <div className="todo-list-item" key={index}>
                            <div className="task">
                                <input type="checkbox" onChange={(e)=> completeTodo(e,todo.id,todo)} />
                                <p id="t_task" className={todo.completed == true? "strike":""}>{todo.task}</p>
                            </div>

                            <div className="btn-container">
                                <div className="edit"><FaEdit size={25} onClick={(e)=>toggleModel(todo.task, todo.id, todo)} /></div>
                                <div className="del"><MdDelete size={25} onClick={()=>delete_todo(todo.id)} /></div>

                            </div>
                        </div>
                    )
                }
            </div>


            
        {/* modal section */}

   { toggle && <div className="modal-container">
      <div className="modal">
        <h1>Update Form</h1>


          <form action="" onSubmit={(e)=>{
            updated(e,todoId,todoItem);
            setToggle(false)
            }}>
            <input type="text" ref={ taskRef } placeholder='Update ToDo' value={todoItem} onChange={(e)=>setTodoItem(e.target.value)} required />
            <button id ="add">Add</button>
          </form>

            
        <div className="btn-container">
          <button className="cancel mod-btn" onClick={()=>setToggle(false)} >Cancel</button>
          
        </div>
      </div>
    </div> }
    
        
        </>
    )
}

export default TodoList