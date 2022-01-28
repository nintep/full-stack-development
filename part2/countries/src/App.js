import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, selectCountry }) => {
  
  if(countries.length === 0) {
    return(
      <>No matches, specify a filter</>
    )

  } else if(countries.length === 1){
    return(
      <Country country={countries[0]} />
    )
  } else if (countries.length < 11){
    return(
      <>
        {countries.map(c => 
        <div key={c.cca2}>
          {c.name.common}
          <button onClick={() => selectCountry(c.name.common)}>
            show
          </button>
        </div>
        )}
      </>
    )
  } else {
    return(
      <>Too many matches, specify another filter</>
    )
  }
}

const Country = ({ country }) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital}<br/>
      Official name: {country.name.official}<br/>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l,i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={country.flags.png} alt="Image of the country flag" height="150"></img>
    </div>
  )
}

const App = () => {

  const [ filterText, setFilterText ] = useState('')
  const [ countries, setCountries ] = useState([])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const selectCountry = (countryName) => {
    setFilterText(countryName)
  }

  const countriesToShow = (filterText.length === 0)
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(filterText.toLocaleLowerCase()))

  return(
    <div>
      Find countries
      <input value={filterText} onChange={handleFilterChange}/>
      <br />
      <CountryList countries={countriesToShow} selectCountry={selectCountry} />
    </div>
  )
}

export default App