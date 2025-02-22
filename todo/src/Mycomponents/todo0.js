import React from 'react'
import {Todoitem} from "./todoitem"
function Todo0(props) {
  return (
    <div>
        <h1 className='text-center'>LIST</h1>
        {props.todo.map((todo)=>{
          return     <Todoitem todo={todo}/>
        }
        )}

    </div>
  )
}

export default Todo0;