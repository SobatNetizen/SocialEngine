export const getHistory = (historyId) => {
  return dispatch => {
    dispatch(getDataLoading())
    fetch('https://rickandmortyapi.com/api/character' /* tinggal tunggu endpoint*/)
      .then(function(response) {
        return response.json()
      })
      .then(function(result) {
        // self.setState({pemains: result.results})
        dispatch(getDataSuccess(result.results /* atur payloadnya*/))
      })
      .catch(err => {
        dispatch(getDataFailed())
      })
  }
}

const getDataSuccess = (payload) => ({
  type: 'LOAD_HISTORY_SUCCESS',
  payload
})

const getDataLoading = () => ({
  type: 'LOAD_HISTORY_LOADING'
})

const getDataFailed = () => ({
  type: 'LOAD_HISTORY_FAILED'
})