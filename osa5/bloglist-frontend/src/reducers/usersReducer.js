/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import users from '../services/users'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const initialUsers = await users.getAll()
        dispatch(setUsers(initialUsers))
    }
}

export default usersSlice.reducer
