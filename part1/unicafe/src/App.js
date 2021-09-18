import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}> {text} </button>
  )
}

const StatisticLine = ({ text, value }) => (<>{text} {value}</>)

const Statistics = ({ good, neutral, bad, all }) => {

  if(all.length === 0){
    return (
      <p> No feedback given </p>
    )
  }

  const avg = (good - bad) / all.length
  const pos = good / all.length

  return (
    <table>
      <tbody>
        <tr><td><StatisticLine text={'good'} value={good} /></td></tr>
        <tr><td><StatisticLine text={'neutral'} value={neutral} /></td></tr>
        <tr><td><StatisticLine text={'bad'} value={bad} /></td></tr>
        <tr><td><StatisticLine text={'all'} value={all.length} /></td></tr>
        <tr><td><StatisticLine text={'average'} value={avg} /></td></tr>
        <tr><td><StatisticLine text={'positive'} value={pos*100 + ' %'} /></td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])


  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
