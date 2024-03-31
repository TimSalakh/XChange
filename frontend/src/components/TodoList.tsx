import { useState } from 'react'
import Todo from './Todo'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const TodoList = () => {
  const [items, setItems] = useState<{ id: number; content: number }>([])

  const addItemClick = () => setItems([...items, { id: 1, content: 5 }])

  return (
    <div>
      <button onClick={addItemClick}>Add todo</button>
    </div>
  )
}

export default TodoList
