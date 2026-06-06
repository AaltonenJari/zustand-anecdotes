import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useAnecdoteActions } from './store'
import anecdoteService from './services/anecdotes'
import Notification from './components/Notification'

const App = () => {
  const { initAnecdotes } = useAnecdoteActions()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initAnecdotes(anecdotes))
  }, [initAnecdotes])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App