import { useAnecdotes, useFilter, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filter = useFilter()
    const { vote } = useAnecdoteActions()
    
    const sortefAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

    const filteredAnecdotes = sortefAnecdotes.filter((a) => 
      a.content.toLowerCase().includes(filter.toLowerCase())
    )

    return (
      <div>
        {filteredAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
               has {anecdote.votes}
               <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    )
}

export default AnecdoteList