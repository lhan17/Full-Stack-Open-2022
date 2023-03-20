import { useDispatch } from 'react-redux'
import { addAnecdote, createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const CreateAnecdote = () => {
    const dispatch = useDispatch()

    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`you added '${content}'`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div>
                    <input name={'content'} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default CreateAnecdote
