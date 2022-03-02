import services from '../services/blogs'

const reducer = (state = [], action) => {

  switch (action.type) {
  case 'SETUSERS':
    return action.users
  default:
    return state
  }

}

export const loadAllUsers = () => {
  return async dispatch => {
    const users = await services.getAllUsers()
    dispatch({
      type: 'SETUSERS',
      users
    })
  }
}

export default reducer