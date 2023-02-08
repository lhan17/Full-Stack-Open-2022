import { useState, useEffect } from 'react'
import countryService from "./services/country"
import axios from "axios"

const Countries = ({ countries, setCountry, setCity, city, weather, handleCityChange }) => {
  if (countries.length === 1) {
    const url = countries[0].flags.png
    const city = countries[0].capital
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        capital: {city} <br />
        area: {countries[0].area}
        <div>
          <h3>languages:</h3>
          <div>
            <ul>
              {Object.keys(countries[0].languages).map(language => (
                <li key={language}>{countries[0].languages[language]}</li>
              ))}
            </ul>
          </div>
          <img src={url} />
        </div>
        <div>
          <h3>Weather in {city}</h3>
          {/* <Weather weather={weather} /> */}
        </div>
      </div>
    )
  }

  if (countries.length < 10) {
    return (
      <div>
        {countries.map(c => (
          <div key={c.name.common}>
            <Country key={c.name.common} country={c} /> <Button handleClick={() =>
              setCountry(c.name.common)
            } />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const Weather = ({ weather }) => {
  return (
    <div>
      temperature {weather.main.temp - 273.15} Celsius
      <div>
        <div>
          wind {weather.wind.speed} m/s
        </div>
      </div>
    </div>
  )
}

const Button = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>show</button>
    </div>
  )
}

const FindCountry = ({ country, handleCountryChange }) => {
  return (
    <div>find countries<form><input value={country} onInput={handleCountryChange} /></form></div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [weather, setWeather] = useState([])
  const [city, setCity] = useState(null)
  const [long, setLong] = useState("")
  const [lat, setLat] = useState("")

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    countryService
      .getCountries()
      .then(c => {
        setCountries(c)
      })
  }, [])

  // useEffect(() => {
  //   console.log('effect run, currency is now', city)
  //   if (city) {
  //     axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
  //       .then(c => {
  //         setLong(c.data.lon)
  //         setLat(c.data.lat)
  //       })
  //     axios
  //       .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
  //       .then(c =>
  //         setWeather(c.data)
  //       )
  //       console.dir(weather)
  //       console.log('effect run, currency is now', city)
  //   }
  // }, [city])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleCityChange = (target) => {
    setCity(target)
  }
  return (
    <div>
      <FindCountry country={country} handleCountryChange={handleCountryChange} />
      <Countries countries={countriesToShow} setCountry={setCountry} setCity={setCity} city={city} weather={weather} handleCityChange={handleCityChange} />
    </div >
  );
}

export default App;
