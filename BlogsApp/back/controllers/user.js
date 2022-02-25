const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async (req, res) => {
	const { username, name, password } = req.body;
	// check length of password
	if (password.length < 3)
		return res.status(400).json({ error: 'user invalid' });

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		password: passwordHash,
	});

	const result = await user.save();
	res.status(201).json(result);
};

const getAllUser = async (req,res) => {
  const result = await User.find({}).populate('blogs',{url: 1, title:1, author:1})
  res.status(200).json(result)
}

module.exports = {
	createUser,
  getAllUser
};
