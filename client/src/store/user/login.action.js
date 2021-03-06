import axios from 'axios'
import swal from 'sweetalert';

export const login = (email, password, history) => {
  return dispatch => {
    dispatch(loginLoading())
    axios.post('http://35.240.159.235/users/login',{ email, password })
    .then(result => {
        localStorage.setItem('token', result.headers.token)
        swal('Success', result.data.message, 'success')
        // this.props.history.push({ pathname: '/dashboard' })
        dispatch(loginSuccess(result.data.user))
        history.push({ pathname: '/dashboard' })
    })
    .catch(err =>{
        dispatch(loginFailed())
        swal('Info', 
        err.message==='Request failed with status code 400' ?
        'Please input with correct email and password' : err.message
        , 'info')
    })
  }
}

const loginSuccess = (payload) => ({
  type: 'LOAD_USER_SUCCESS',
  payload
})

const loginLoading = () => ({
  type: 'LOAD_USER_LOADING'
})

const loginFailed = () => ({
  type: 'LOAD_USER_FAILED'
})