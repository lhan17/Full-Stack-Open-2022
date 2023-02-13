import { useState, useEffect } from 'react'
import axios from "axios"
const Weather = ({ country }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        console.log('effect run, capital is now', country.capital)
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=5&appid=${api_key}`)
            .then(c => {
                axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${c.data[0].lat}&lon=${c.data[0].lon}&appid=${api_key}`)
                    .then(p => {
                        setWeather(p.data)
                        console.log(p)
                    })
            })
    }, [country])

    if (weather) {
        return (
            <div>
                temperature {weather.main.temp - 273.15} Celsius
                <div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                    <div>
                        wind {weather.wind.speed} m/s
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather;