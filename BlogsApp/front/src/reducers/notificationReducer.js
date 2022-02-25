const reducer = (state='', action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.notification
  case 'DROP_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const setNewNotification = (notification) => {
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({ type: 'DROP_NOTIFICATION' })
    }, 5000)
  }
}

export default reducer