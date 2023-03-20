import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import Filter from './components/Filter'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
            <Filter />
        </div>
    )
}

export default App
