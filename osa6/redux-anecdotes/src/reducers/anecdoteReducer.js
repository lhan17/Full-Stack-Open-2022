/* eslint-disable default-case */

import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    }
}

const initialState = []

// const anecdoteReducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)
//     switch (action.type) {
//         case 'VOTE':
//             const id = action.payload.id
//             const anec = state.find((n) => n.id === id)
//             const changedAnec = { ...anec, votes: anec.votes + 1 }
//             return state.map((anec) => (anec.id !== id ? anec : changedAnec))
//         case 'NEW':
//             const newAnec = {
//                 content: action.payload.content,
//                 id: getId(),
//                 votes: 0,
//             }
//             return [...state, newAnec]
//     }
//     return state
// }

// export const voted = (id) => {
//     return {
//         type: 'VOTE',
//         payload: { id },
//     }
// }

// export const newAnecdote = (content) => {
//     return {
//         type: 'NEW',
//         payload: { content },
//     }
// }

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push(content)
        },
        voted(state, action) {
            const id = action.payload
            const anec = state.find((n) => n.id === id)
            const changedAnec = { ...anec, votes: anec.votes + 1 }
            return state.map((anec) => (anec.id !== id ? anec : changedAnec))
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    },
})

export const { createAnecdote, voted, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdote))
    }
}

export const addAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }
}

export const updateVote = (content) => {
    return async (dispatch) => {
        const object = { ...content, votes: content.votes + 1 }
        await anecdoteService.updateAnecdote(content.id, object)
        dispatch(voted(content.id))
    }
}

export default anecdoteSlice.reducer
