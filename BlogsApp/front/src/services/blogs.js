import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// -- LOGIN --------------------------------------------------------------------
const login = async (credentials) => {
  const request = await axios.post('/api/login', credentials)
  return request.data
}

// -- BlOGS --------------------------------------------------------------------
const config = () => {
  return {
    headers: {
      Authorization: token,
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addNewBlog = async (blog) => {
  const request = await axios.post(baseUrl, blog, config(token))
  return request.data
}

const addLike = async (blog) => {
  const { id, likes } = blog
  const request = await axios.put(`${baseUrl}/${id}`, {
    ...blog,
    likes: likes + 1,
  })
  return request.data
}

const deleteBlog = async (blog) => {
  const { id } = blog
  await axios.delete(`${baseUrl}/${id}`, config(token))
}

// -- USERS --------------------------------------------------------------------
const getAllUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

// -- COMMENTS -----------------------------------------------------------------
const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const addComment = async ({ id, content }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return response.data
}

export default {
  setToken,
  getAll,
  login,
  addNewBlog,
  addLike,
  deleteBlog,
  getAllUsers,
  getComments,
  addComment,
}
