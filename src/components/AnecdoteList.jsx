import { useAnecdotes, useFilter, useAnecdoteActions } from '../store'
import { useSetNotification } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filter = useFilter()
    const { vote } = useAnecdoteActions()
    const setNotification = useSetNotification()
    
    const sortefAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

    const filteredAnecdotes = sortefAnecdotes.filter((a) => 
      a.content.toLowerCase().includes(filter.toLowerCase())
    )

    const handleVote = (id) => {
      vote(id)
      const anecdote = anecdotes.find(a => a.id === id)
      setNotification(`You voted '${anecdote.content}'`, 5)
    }
    
    return (
      <div>
        {filteredAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
               has {anecdote.votes}
               <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    )
}

export default AnecdoteList