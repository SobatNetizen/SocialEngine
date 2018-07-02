import axios from 'axios'
import swal from 'sweetalert';

export const getUser = () => {
  return dispatch => {
    let token = localStorage.getItem('token')
    dispatch(getUserLoading())
    axios.get('http://localhost:3001/users/getuser', { headers: { token }})
    .then(result => {
        // localStorage.setItem('token', result.headers.token)
        // this.props.history.push({ pathname: '/home' })
        dispatch(getUserSuccess(result.data.user))
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