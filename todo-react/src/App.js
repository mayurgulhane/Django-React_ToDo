import logo from './logo.svg';
import './App.css';
import TodoSearch from './Components/TodoSearch';
import TodoFilter from './Components/TodoFilter';
import TodoList from './Components/TodoList';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  
  const [todos, setTodos] = useState([
  ]);
  const [errors, setErrors] = useState()

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/todos")
    .then((response) =>{
        setTodos(response.data)
    })
    .catch((err)=>{
      setErrors(err.message)
    })

},[])

   // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    const originalTodos = [...todos]
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .catch(err =>{ 
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

  const addTodo = (todo) => {
    const originalTodos = [...todos]
    setTodos([...todos, todo={...todo, id: parseInt(todos[todos.length-1].id)+1, status:"Active"}])
    axios.post("http://127.0.0.1:8000/todos/", todo)
    .then((res) => setTodos([...todos, res.data]))
    .catch((err) => {
      setErrors(err.message); 
      setTodos(originalTodos);
    });
  
  }

  const updateTodos = (e, id, newTask,todo) =>{
    // let todo = todos[id]
    e.preventDefault()
    const updateTodo = {...todo, task:newTask, status:"Active"}
    setTodos(todos.map(t=>t.id == id ? updateTodo : t))

    const updatedTodo = {...todo, task:newTask}
    axios.put("http://127.0.0.1:8000/todos/" + id, updatedTodo)

  }

  const completeTodo = (e,id,todo) => {
    if (e.target.checked){
      setTodos(todos.map(todo=>todo.id == id ? {...todo, completed:true} : todo))
      const updatedTodo = {...todo, completed:true}
      axios.put("http://127.0.0.1:8000/todos/" + id, updatedTodo)
    }
    else{
      setTodos(todos.map(todo=>todo.id==id ? {...todo, completed: false} : todo))
      const updatedTodo = {...todo, completed:false}
      axios.put("http://127.0.0.1:8000/todos/" + id, updatedTodo)
    }
  }

  const filterToDo = (text)=>{
    setTodos(todos.filter(todo => todo.status === text))
  }

  return (
    <div className="App">
    {errors && <p>{errors}</p> }
     <TodoSearch add_todo={addTodo} />
     <TodoFilter filterToDo={filterToDo} />
     <TodoList todos={todos} delete_todo = {delTodo} updated={updateTodos} completeTodo={completeTodo} />
    </div>
  );
}

export default App;
