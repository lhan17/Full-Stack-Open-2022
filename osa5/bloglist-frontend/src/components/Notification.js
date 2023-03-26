import { Alert } from '@mui/material'
const Notification = ({ message, positive }) => {
    if (message === null) {
        return null
    }

    if (!positive) {
        return (
            <div className='error'>
                <Alert variant='filled' severity='error'>
                    {message}
                </Alert>
            </div>
        )
    }

    return (
        <div className='blogs'>
            <Alert variant='filled' severity='success'>
                {message}
            </Alert>
        </div>
    )
}
export default Notification
