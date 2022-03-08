const mongoose = require('mongoose')

const commentarySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Blog'
  }
})

commentarySchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Commentary',commentarySchema)