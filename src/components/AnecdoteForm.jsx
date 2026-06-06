import { useAnecdoteActions } from '../store'
import { useSetNotification } from '../store'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const setNotification = useSetNotification()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await create(content)
    event.target.anecdote.value = ''
    setNotification(`new anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm 
