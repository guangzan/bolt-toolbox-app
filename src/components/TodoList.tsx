import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">待办事项</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 apple-input mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="添加新任务"
        />
        <button
          onClick={addTodo}
          className="apple-button"
        >
          添加
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center p-3 bg-white rounded-lg shadow">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3 form-checkbox h-5 w-5 text-blue-500"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.text}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList