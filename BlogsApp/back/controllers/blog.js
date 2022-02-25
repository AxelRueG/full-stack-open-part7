const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const findBlogs = async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs);
};

const addBlog = async (request, response) => {
	if (!request.token)
		return response.status(401).json({ error: 'token missing or invalid' });
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({ ...request.body, user: user.id });

	const result = await blog.save();
	const blogs = user.blogs.concat(result.id);
	await User.findByIdAndUpdate(user.id, { blogs }, { new: true });

	const newBlog = await Blog.findById(result._id).populate('user', {
		username: 1,
		name: 1,
	});

	response.status(201).json(newBlog);
};

const deleteBlog = async (req, res) => {
	const token = jwt.verify(req.token, process.env.SECRET);
	if (!token.id)
		return response.status(401).json({ error: 'token missing or invalid' });

	const { id } = req.params;
	const blog = await Blog.findById(id);

	if (blog.user.toString() !== token.id.toString())
		return res.status(401).json({ error: 'unauthorized' });

	await Blog.findByIdAndDelete(id);
	res.status(200).end();
};

const updateBlog = async (req, res) => {
	const { id } = req.params;
	const { likes } = req.body;
	const result = await Blog.findByIdAndUpdate(id, { likes }, { new: true });
	res.status(201).json(result);
};

module.exports = { findBlogs, addBlog, deleteBlog, updateBlog };
