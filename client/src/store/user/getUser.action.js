import axios from 'axios'
import swal from 'sweetalert';

export const getUser = () => {
  return dispatch => {
    let token = localStorage.getItem('token')
    dispatch(getUserLoading())
    axios.get('http://localhost:3001/users/getuser', { headers: { token }})
    .then( async result => {
      // localStorage.setItem('token', result.headers.token)
      // this.props.history.push({ pathname: '/home' })
      // console.log(result.data.user.keywords)
      dispatch(getUserSuccess(result.data.user))

      let histories = []

      for (let i = 0; i < result.data.user.keywords.length; i++) {
        await axios.post('http://localhost:3001/users/gethistory', { keyword: result.data.user.keywords[i] } ,{ headers: { token }})
        .then(history => {
          console.log(i)
          histories.push(history.data.history)
        })
        .catch(error => {
          console.log(error)
        })
      }
      console.log(histories)
      dispatch(getHistory(histories))
    })
    .catch(err =>{
      dispatch(getUserFailed())
      swal('info', 
      err.message=='Request failed with status code 400' ?
      'Tolong isi kolom email dan password' : err.message
      , 'info')
    })
  }
}

const getUserSuccess = (payload) => ({
  type: 'LOAD_USER_SUCCESS',
  payload
})

const getUserLoading = () => ({
  type: 'LOAD_USER_LOADING'
})

const getUserFailed = () => ({
  type: 'LOAD_USER_FAILED'
})

const getHistory = (payload) => ({
  type: 'LOAD_HISTORY',
  payload
})