import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    )

    console.log(anecdotes)
    const dispatch = useDispatch()

    const vote = (content) => {
        dispatch(updateVote(content))
        dispatch(setNotification(`you voted '${content.content}'`, 5))
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}
export default AnecdoteList
