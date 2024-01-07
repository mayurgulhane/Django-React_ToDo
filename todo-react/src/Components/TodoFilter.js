import React from 'react'

const TodoFilter = ({filterToDo}) => {
  return (
    <select name="" id="" onChange={((e) => filterToDo(e.target.value))} >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="completed">Completed</option>
          </select>
  )
}

export default TodoFilter

