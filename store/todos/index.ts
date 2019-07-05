import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
// ______________________________________________________
//
export const state = (): S => ({
  todos: []
})
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  todosCount(state) {
    return state.todos.length
  },
  doneCount(state) {
    return state.todos.filter(todo => todo.done).length
  }
}
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  addTodo(state, payload) {
    state.todos.push(payload.todo)
  },
  doneTodo(state, payload) {
    state.todos = state.todos.map(todo => {
      if (todo.id !== payload.id) return todo
      return { ...todo, done: true }
    })
  }
}
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  asyncAddTodo({ commit, rootGetters }, payload) {
    const n = rootGetters['counter/hogehoge']
    commit('addTodo', payload)
  },
  asyncDoneTodo({ commit }, payload) {
    commit('doneTodo', payload)
  }
}
