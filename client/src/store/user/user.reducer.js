const initialState = {
  user: {},
  loading: false,
  error: {
    status: false,
    message: 'Load data failed'
  }
}

const userreducer = (state={ ...initialState }, action) => {
  switch (action.type) {
    case 'LOAD_LOGIN_SUCCESS':
      return ({
        ...state,
        user: action.payload,
        loading: false
      })
    case 'LOAD_LOGIN_LOADING':
      return ({
        ...state,
        loading: true
      })
    case 'LOAD_LOGIN_FAILED':
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

export default userreducer