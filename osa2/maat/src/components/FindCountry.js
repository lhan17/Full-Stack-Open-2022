const FindCountry = ({ country, handleCountryChange }) => {
    return (
        <div>find countries<form><input value={country} onChange={handleCountryChange} /></form></div>
    )
}

export default FindCountry;