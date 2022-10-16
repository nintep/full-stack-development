const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodIncreased = {
        ...state,
        good: state.good + 1
      }
      return goodIncreased
    case 'OK':
      const okIncreased = {
        ...state,
        ok: state.ok + 1
      }
      return okIncreased
    case 'BAD':
      const badIncreased = {
        ...state,
        bad: state.bad + 1
      }
      return badIncreased
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer