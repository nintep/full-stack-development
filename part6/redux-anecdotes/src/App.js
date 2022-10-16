import AnecdoteList from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Notifications from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App