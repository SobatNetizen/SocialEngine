let initialState = {
  statusList: {
    status: 'initial',
    statusKeyword: 'disabled',
    keywordToShow: '',
  } 
}

const status = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'GET_STATUS_SUCCESS':
      return ({
        ...state
      })
    case 'UPDATE_STATUS_SUCCESS':
      return({
        ...state,
        statusCheck: action.payload
      })
    default:
      return state;
  }
}

export default status;