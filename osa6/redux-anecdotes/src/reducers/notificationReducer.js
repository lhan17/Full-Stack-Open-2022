import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        notificationDelete(state, action) {
            return ''
        },
    },
})

export const { notificationChange, notificationDelete } =
    notificationSlice.actions

export const setNotification = (content, timer) => {
    return (dispatch) => {
        dispatch(notificationChange(content))
        setTimeout(() => {
            dispatch(notificationDelete())
        }, 1000 * timer)
    }
}

export default notificationSlice.reducer
