import services from '../services/blogs'
import { setNewNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const logUser = (User) => {
  return async (dispatch) => {
    try {
      const user = await services.login(User)
      dispatch({
        type: 'LOGIN',
        user,
      })
      window.localStorage.setItem('userData', JSON.stringify(user))
      services.setToken(user.token)
    } catch (e) {
      dispatch(setNewNotification('invalid credentials'))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.clear()
    window.location.reload(false)
  }
}

export const userLoged = () => {
  return (dispatch) => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      const user = JSON.parse(userData)
      dispatch({
        type: 'LOGIN',
        user,
      })
      services.setToken(user.token)
    }
  }
}

export default reducer
