import { applyMiddleware, combineReducers, createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
