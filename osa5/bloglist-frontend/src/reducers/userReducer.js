import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const user = null

const userSlice = createSlice({
    name: 'user',
    initialState: user,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export const userLogin = (user) => {
    return async (dispatch) => {
        dispatch(setUser(user))
        blogService.setToken(user.token)
    }
}

export default userSlice.reducer
