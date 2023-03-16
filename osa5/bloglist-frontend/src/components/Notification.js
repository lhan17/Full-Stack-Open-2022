const Notification = ({ message, positive }) => {
    if (message === null) {
        return null
    }

    if (!positive) {
        return <div className='error'>{message}</div>
    }

    return <div className='blogs'>{message}</div>
}
export default Notification
