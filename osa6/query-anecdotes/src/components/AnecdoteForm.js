import { useQueryClient, useMutation } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
        onError: () => {
            let type = 'SMALL'
            dispatch({ type })
            setTimeout(() => {
                type = 'NULL'
                dispatch({ type })
            }, 5000)
            return
        },
    })
    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        if (content.length < 5) {
            let type = 'SMALL'
            dispatch({ type })
            setTimeout(() => {
                type = 'NULL'
                dispatch({ type })
            }, 5000)
            return
        }

        newAnecdoteMutation.mutate({ content, votes: 0 })
        let type = 'ADD'
        const payload = content
        dispatch({ type, payload })
        setTimeout(() => {
            type = 'NULL'
            dispatch({ type })
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
