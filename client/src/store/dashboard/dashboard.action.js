export const getStatus = () => {
  return dispatch => {
    dispatch(getStatusReducer())
  }
}

const getStatusReducer = () => {
  return {
    type: 'GET_STATUS_SUCCESS',
  }
}


export const updateStatus = (objStatus) => {
  return dispatch => {
    dispatch(updateStatusReducer(objStatus))
  }
}

const updateStatusReducer = (objStatus) => {
  return {
    type: 'UPDATE_STATUS_SUCCESS',
    payload: objStatus
  }
}


