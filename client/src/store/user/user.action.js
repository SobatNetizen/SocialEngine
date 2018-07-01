import axios from 'axios'
import swal from 'sweetalert';

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginLoading())
    axios.post('http://localhost:3001/users/login',{ email, password })
    .then(result => {
        localStorage.setItem('token', result.headers.token)
        swal('success', result.data.message, 'success')
        // this.props.history.push({ pathname: '/home' })
        dispatch(loginSuccess(result.data.user))
    })
    .catch(err =>{
        dispatch(loginFailed())
        swal('info', 
        err.message=='Request failed with status code 400' ?
        'Tolong isi kolom email dan password' : err.message
        , 'info')
    })
  }
}

const loginSuccess = (payload) => ({
  type: 'LOAD_LOGIN_SUCCESS',
  payload
})

const loginLoading = () => ({
  type: 'LOAD_LOGIN_LOADING'
})

const loginFailed = () => ({
  type: 'LOAD_LOGIN_FAILED'
})