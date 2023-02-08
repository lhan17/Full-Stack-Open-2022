import axios from "axios"

const allCountry = "https://restcountries.com/v3.1/all"
const api_key = process.env.REACT_APP_API_KEY

const getCountries = () => {
    const request = axios.get(allCountry)
    return request.then(response => response.data)
}

const getLongLat = ({ city }) => {
    console.log(city)
    const request = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
    return request.then(response => response.data)
}

const getWeather = ({ lon, lat }) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getCountries, getLongLat, getWeather }