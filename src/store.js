
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
    },
    initAnecdotes: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    setFilter: (filterText) => set(() => ({
      filter: filterText
    }))
  },
}))

const useNotificationStore = create((set) => ({
  notification: null,
  setNotification: (message, timeout) => {
    set(() => ({ notification: message }))
    if (timeout) {
      setTimeout(() => {
        set(() => ({ notification: null }))
      }, timeout * 1000)
    }
  }
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useSetNotification = () => useNotificationStore((state) => state.setNotification)
export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
