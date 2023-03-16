import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'

test('renders content', () => {
    const blog = {
        title: 'Heroku is expensive',
        author: 'Gamma',
        url: 'www.notarealurl.com',
        likes: '5',
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Heroku is expensive Gamma')
    expect(element).toBeDefined()
})

test('view button pressed', async () => {
    const blog = {
        title: 'Heroku is expensive',
        author: 'Gamma',
        url: 'www.notarealurl.com',
        likes: '5',
        user: {
            id: 1,
            name: 'Alice',
        },
    }

    const user1 = {
        id: 1,
        name: 'Alice',
    }

    const mockHandler = jest.fn()

    render(
        <Blog
            blog={blog}
            user={user1}
            handleLike={mockHandler}
            handleRemove={mockHandler}
        />
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('Heroku is expensive Gamma')).toBeInTheDocument()
    expect(screen.getByText('www.notarealurl.com')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
})

test('like button clicked twice', async () => {
    const blog = {
        title: 'Heroku is expensive',
        author: 'Gamma',
        url: 'www.notarealurl.com',
        likes: '5',
        user: {
            id: 1,
            name: 'Alice',
        },
    }

    const user1 = {
        id: 1,
    }
    const mockHandler = jest.fn()

    render(
        <Blog
            blog={blog}
            user={user1}
            handleLike={mockHandler}
            handleRemove={mockHandler}
        />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Checking the createForm', async () => {
    const mockHandler = jest.fn()

    const { container } = render(<CreateForm handleNewBlog={mockHandler} />)
    const Tinput = container.querySelector('#title-input')
    const Ainput = container.querySelector('#author-input')
    const Uinput = container.querySelector('#url-input')

    const user = userEvent.setup()
    await user.type(Tinput, 'testing')
    await user.type(Ainput, 'testing')
    await user.type(Uinput, 'testing')
    const button = screen.getByText('create')
    await user.click(button)
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls).toEqual([
        [
            {
                title: 'testing',
                author: 'testing',
                url: 'testing',
            },
        ],
    ])
})
