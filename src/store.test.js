import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test anecdote', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initAnecdotes()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('add creates a new anecdote', async () => {
    const newAnecdote = { id: 2, content: 'New anecdote', votes: 0 }
    anecdoteService.createNew.mockResolvedValue(newAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.create('New anecdote')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toContainEqual(newAnecdote)
  })
  
  it('filter ensures that the correct React component receives the correctly filtered list of anecdotes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'First anecdote', votes: 0 },
      { id: 2, content: 'Second anecdote', votes: 0 }
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })
    
    const { result } = renderHook(() => useAnecdoteActions())
    act(() => {
      result.current.setFilter('Second')
    })
    
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([
      { id: 2, content: 'Second anecdote', votes: 0 }
    ])
  })  

  it('vote updates the anecdote votes', async () => {
    const mockAnecdote = { id: 1, content: 'Test anecdote', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] })

    const updatedAnecdote = { ...mockAnecdote, votes: 1 }
    anecdoteService.update.mockResolvedValue(updatedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toContainEqual(updatedAnecdote)
  })

})