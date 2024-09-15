import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "计算机网络实验作业", completed: false },
    { id: 2, text: "英语作业", completed: true },
    { id: 3, text: "数据结构作业", completed: false },
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingId])

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      text: "新代办",
      completed: false
    }
    setTodos([...todos, newTodo])
    setEditingId(newTodo.id)
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const startEditing = (id: number) => {
    setEditingId(id)
  }

  const handleEdit = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const finishEditing = () => {
    setEditingId(null)
  }

  return (
    <Card className="w-full max-w-md mx-auto max-h-[249px]">
      <CardHeader className="pt-4 pb-2">
        <CardTitle>代办</CardTitle>
      </CardHeader>
      <CardContent className="py-0 h-[170px] overflow-y-auto">
        <ul className="space-y-2 h-full p-2 overflow-y-auto">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center space-x-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="focus:outline-none"
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-300" />
                )}
              </button>
              {editingId === todo.id ? (
                <Input
                  ref={editInputRef}
                  value={todo.text}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  onBlur={finishEditing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      finishEditing()
                    }
                  }}
                  className="flex-1"
                />
              ) : (
                <span
                  className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                  onClick={() => startEditing(todo.id)}
                >
                  {todo.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-center py-0">
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            size="icon"
            onClick={clearCompleted}
            aria-label="Clear completed tasks"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">{todos.length}个代办</span>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={addNewTodo}
          aria-label="Add new task"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}