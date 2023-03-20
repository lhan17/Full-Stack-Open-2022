import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
    const queryClient = useQueryClient()
    const updateAnecdoteMutate = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })
    const dispatch = useNotificationDispatch()
    const handleVote = (anecdote) => {
        updateAnecdoteMutate.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        let type = 'VOTED'
        const payload = anecdote.content
        dispatch({ type, payload })
        setTimeout(() => {
            type = 'NULL'
            dispatch({ type })
        }, 5000)
    }

    const result = useQuery('anecdotes', getAnecdotes, {
        retry: false,
    })
    console.log(result)
    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <span>Error: {result.error.message}</span>
    }
    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
