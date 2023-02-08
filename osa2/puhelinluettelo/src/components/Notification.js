const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.length > 45) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return (
        <div className="phone">
            {message}
        </div>
    )
}
export default Notification