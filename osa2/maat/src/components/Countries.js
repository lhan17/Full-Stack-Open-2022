import Weather from "./Weather"
import Country from "./Country"

const Button = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>show</button>
    </div>
  )
}

const Countries = ({ countries, setCountry }) => {

  if (countries.length === 1) {
    const url = countries[0].flags.png

    const country = countries[0]

    return (
      <div>
        <h1>{country.name.common}</h1>
        capital: {country.capital} <br />
        area: {country.area}
        <div>
          <h3>languages:</h3>
          <div>
            <ul>
              {Object.keys(country.languages).map(language => (
                <li key={language}>{countries[0].languages[language]}</li>
              ))}
            </ul>
          </div>
          <img src={url} />
        </div>
        <div>
          <h3>Weather in {country.capital}</h3>
          <Weather country={country} />
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

export default Countries;