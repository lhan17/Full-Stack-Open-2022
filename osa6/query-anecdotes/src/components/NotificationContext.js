import { useContext } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return `anecdote '${action.payload}' added`
        case 'VOTED':
            return `anecdote '${action.payload}' voted`
        case 'NULL':
            return null
        case 'SMALL':
            return `too short anecdote, must have length 5 or more`
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    )

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}
