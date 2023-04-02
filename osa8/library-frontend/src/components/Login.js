import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN_USER)
    const navigate = useNavigate()

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
            navigate('/addbook')
        }
    }, [result.data]) // eslint-disable-line

    const handleSubmit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login
