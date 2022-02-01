import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonLine = ({ name, number, removePerson }) => {
  return(
    <p>
      {name} {number}
      <button onClick={removePerson}>remove</button>
    </p>
  )
  
}

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <>
    {personsToShow.map(person => 
      <PersonLine key={person.id} name={person.name} number={person.number} removePerson={() => removePerson(person.id)}/>)}
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={errorNotificationStyle}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ notifMessage, setNotifMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.map(person => person.name).includes(personObject.name)){

      if(window.confirm(`${personObject.name} is already added to the phonebook, replace the number with a new one?`)){

        const personToUpdate = persons.find(person => person.name === personObject.name)
        
        personService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotifMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${personToUpdate.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }

    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotifMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if(window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(id => {
          setPersons(persons.filter(p => p.id !== id))
          setNotifMessage(`Removed ${name}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
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
      <Notification message={notifMessage} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
