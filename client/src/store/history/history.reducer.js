const initialState = {
  history: {},
  loading: false,
  error: {
    status: false,
    message: 'Load data failed'
  }
}

const historyreducer = (state={ ...initialState }, action) => {
  switch (action.type) {
    case 'LOAD_HISTORY_SUCCESS':
      return ({
        ...state,
        history: action.payload,
        loading: false
      })
    case 'LOAD_HISTORY_LOADING':
      return ({
        ...state,
        loading: true
      })
    case 'LOAD_HISTORY_FAILED':
      return ({
        ...state,
        error: {
          status: true,
          message: state.error.message
        },
        loading: false
      })
    default:
      return state;
  }
}

export default historyreducer