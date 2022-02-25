import services from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LOAD_BLOGS':
    return action.blogs.sort((a, b) => b.likes - a.likes)
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'LIKE_BLOG': {
    let blog = state.find((elem) => elem.id === action.blog.id)
    let blogs = state.filter((elem) => elem.id !== action.blog.id)
    return [...blogs, { ...blog, likes: action.blog.likes }].sort(
      (a, b) => b.likes - a.likes
    )
  }
  case 'DELETE_BLOG':
    return state.filter(elem => elem.id !== action.blog.id)
  default:
    return state
  }
}

export const loadBlogs = () => {
  return async (dispatch) => {
    try{
      const blogs = await services.getAll()
      dispatch({
        type: 'LOAD_BLOGS',
        blogs,
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const handleAddBlog = (b) => {
  return async (dispatch) => {
    const blog = await services.addNewBlog(b)
    dispatch({
      type: 'ADD_BLOG',
      blog,
    })
  }
}

export const likeBlog = (b) => {
  return async (dispatch) => {
    try {
      const blog = await services.addLike(b)
      dispatch({
        type: 'LIKE_BLOG',
        blog,
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const handleDeleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await services.deleteBlog(blog)
      dispatch({
        type: 'DELETE_BLOG',
        blog
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default reducer
