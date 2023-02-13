import { useState, useEffect } from'react'
import countryService from "./services/country"
import Countries from "./components/Countries"
import FindCountry from "./components/FindCountry"


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("")
  const [city, setCity] = useState(null)

  useEffect(() => {
    countryService
      .getCountries()
      .then(c => {
        setCountries(c)
      })
  }, [])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }
  return (
    <div>
      <FindCountry country={country} handleCountryChange={handleCountryChange} />
      <Countries countries={countriesToShow} setCountry={setCountry} city={city} handleCityChange={handleCityChange} />
    </div >
  );
}

export default App;
