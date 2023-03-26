const Menu = ({ Link }) => {
    const padding = {
        paddingRight: 5,
    }
    return (
        <div>
            <div>
                <Link style={padding} to='/'>
                    anecdotes
                </Link>
                <Link style={padding} to='/createnew'>
                    create new
                </Link>
                <Link style={padding} to='/about'>
                    about
                </Link>
            </div>
        </div>
    )
}

export default Menu
