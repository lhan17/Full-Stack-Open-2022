/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: null,
    positive: true,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        notificationDelete(state, action) {
            return { content: null, positive: true }
        },
    },
})

export const { notificationChange, notificationDelete } =
    notificationSlice.actions

export const setNotification = (content) => {
    return (dispatch) => {
        dispatch(notificationChange(content))
        setTimeout(() => {
            dispatch(notificationDelete())
        }, 5000)
    }
}

export default notificationSlice.reducer
