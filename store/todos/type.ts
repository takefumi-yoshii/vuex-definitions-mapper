// ______________________________________________________
//
export type Todo = {
  id: string
  createdAt: Date
  task: string
  done: boolean
}
export type S = {
  todos: Todo[]
}
// ______________________________________________________
//
export interface G {
  todosCount: number
  doneCount: number
}
// ______________________________________________________
//
export type M = {
  addTodo: { todo: Todo }
  doneTodo: { id: string }
}
// ______________________________________________________
//
export type A = {
  asyncAddTodo: { todo: Todo }
  asyncDoneTodo: { id: string }
}
