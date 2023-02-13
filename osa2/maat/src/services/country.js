import axios from "axios"

const allCountry = "https://restcountries.com/v3.1/all"

const getCountries = () => {
    const request = axios.get(allCountry)
    return request.then(response => response.data)
}


export default { getCountries }