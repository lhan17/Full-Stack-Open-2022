/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        createBlog(state, action) {
            const content = action.payload
            state.push(content)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const blog = action.payload
            const likedBlog = state.find((b) => b.id === blog.id)
            const changedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
            return state.map((b) => (b.id !== blog.id ? b : changedBlog))
        },
        deleteBlogR(state, action) {
            return state.filter((b) => b.id !== action.payload.id)
        },
    },
})

export const { createBlog, setBlogs, updateBlog, deleteBlogR } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const initialBlogs = await blogs.getAll()
        dispatch(setBlogs(initialBlogs))
    }
}

export const addBlog = (blog) => {
    return async (dispatch) => {
        await blogs.create(blog)
        dispatch(createBlog(blog))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        await blogs.update({ ...blog, likes: blog.likes + 1 })
        dispatch(updateBlog(blog))
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogs.deleteblog(blog.id)
        dispatch(deleteBlogR(blog))
    }
}

export default blogSlice.reducer
