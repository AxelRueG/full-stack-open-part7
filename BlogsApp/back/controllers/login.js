const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passwordHash =
		user === null ? null : await bcrypt.compare(password, user.password);

	if (!(username && passwordHash))
		return res.status(401).json({ error: 'invalid username or password' });

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	res.status(200).json({ token, id: user._id.toString(), username: user.username, name: user.name });
};

module.exports = {
	loginUser,
};
