import React from 'react'
export const Todoitem=({todo})=> {
  return (
    <div>
      <h4>{todo.title}</h4>
      <button className='btn btn-sm btn-danger'>Delete</button>
    </div>
  );
}
export default Todoitem;
