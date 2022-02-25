const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    minlength: 3,
    unique: true,
  },
  name: String,
  password: {
    type:String,
    required:true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // password should not be revealed
    delete returnedObject.password
  }
})

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',UserSchema)