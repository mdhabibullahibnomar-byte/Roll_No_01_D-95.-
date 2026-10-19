import { useState } from 'react'
function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const addTask = (e) => {
    e.preventDefault()
    if (task.trim() === '') return
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ])
    setTask('')
  }
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }
  const remaining = tasks.filter(
    (item) => !item.completed
  ).length
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-indigo-600">
          My Todo List
        </h1>
        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task..."
            className="min-w-0 flex-1 rounded-lg border p-3 outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
        <p className="mb-4 font-semibold text-gray-600">
          Remaining Tasks: {remaining}
        </p>
        <ul className="space-y-3">
          {tasks.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
                className="h-5 w-5 accent-indigo-600"
              />
              <span
                className={`min-w-0 flex-1 break-words ${
                  item.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-800'
                }`}
              >
                {item.text}
              </span>
              <button
                onClick={() => deleteTask(item.id)}
                className="rounded px-2 py-1 text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="mt-6 text-center text-gray-400">
            No tasks yet. Add your first task!
          </p>
        )}

      </div>
    </div>
  )
}
export default App
