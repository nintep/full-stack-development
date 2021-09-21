import React, { useState } from 'react'

const PersonLine = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ personsToShow }) => {
  return (
    <>
    {personsToShow.map(person => <PersonLine key={person.id} name={person.name} number={person.number} />)}
    </>
  )
}

const Filter = ({ filterText, handleFilterChange }) => {
  return(
    <div>
      filter shown numbers with
      <input
        value={filterText}
        onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
  return(
    <form>
      <h2> Add a new number </h2>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
          />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.map(person => person.name).includes(personObject.name)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const personsToShow = (filterText.length === 0)
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
