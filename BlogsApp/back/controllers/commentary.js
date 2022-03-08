const Commentary = require('../models/commentary')


const getAllComments = async (req, res) => {
  const { id } = req.params

  const result = await Commentary.find({ blog: id })
  res.status(200).json(result)
}

const addNewComment = async (req, res) => {
  const { content } = req.body
  const { id } = req.params

  const commentary = new Commentary({
    content,
    blog: id
  })

  const result = await commentary.save()
  res.status(201).json(result)
}

module.exports = {
  getAllComments,
  addNewComment,
}