const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>filter shown with<form><input value={filter} onInput={handleFilterChange} /></form></div>
    )
}

export default Filter