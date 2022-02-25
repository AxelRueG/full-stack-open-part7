const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const API = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
	},
];

const UserDefault = {
	username: 'rasta',
	name: 'diego',
	password: 'la_fafafa',
};

let Token;

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const user = await API.post('/api/users').send(UserDefault);
	const userR = user.body;

	const logData = {
		username: UserDefault.username,
		password: UserDefault.password,
	};
	const login = await API.post('/api/login').send(logData);
	Token = login.body;

	const newInitBlogs = initialBlogs.map((blog) => {
		return { ...blog, user: userR.id };
	});
	const blogsObject = newInitBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogsObject.map((blog) => blog.save());
	await Promise.all(promiseArray);
}, 90000);

describe('get all blogs', () => {
	test('all blogs are returned', async () => {
		const response = await API.get('/api/blogs');
		expect(response.body).toHaveLength(initialBlogs.length);
	});

	test('all blogs has an id', async () => {
		const response = await API.get('/api/blogs');
		expect(response.body[0].id).not.toBe(undefined);
	});
});

describe('adding a new blog', () => {
	const blog = {
		title: 'yarn vs npm, todo lo que necesitas saber',
		author: '4Developers',
		url: 'https://tekzup.com/yarn-vs-npm-lo-necesitas-saber/',
		likes: 143,
	};

	test('the blog is added in DB', async () => {
		await API.post('/api/blogs')
			.set('Authorization', 'bearer ' + Token.token)
			.send(blog)
			.expect(201);

		const result = await API.get('/api/blogs');
		const len = initialBlogs.length + 1;
		expect(result.body).toHaveLength(len);
	});

	test('the containt is saved successfully', async () => {
		const result = await API.post('/api/blogs')
			.set('Authorization', 'bearer ' + Token.token)
			.send(blog)
			.expect(201);

		// use the data of blog more the id asigned
		const dataO = { username: blog.username, name: blog.name };
		const dataR = { username: result.username, name: result.name };
		expect(dataR).toEqual(dataO);
	});

	test('when the like number is not defined, its zero for dafault', async () => {
		const data = { ...blog, likes: undefined };
		const result = await API.post('/api/blogs')
			.set('Authorization', 'bearer ' + Token.token)
			.send(data)
			.expect(201);
		expect(result.body.likes).toBe(0);
	});

	test('when title and url its not defined, throw status 400', async () => {
		const data = { ...blog, title: '', url: '' };
		await API.post('/api/blogs')
			.set('Authorization', 'bearer ' + Token.token)
			.send(data)
			.expect(400);
	});

	test('when try to add a new blog without token', async () => {
		await API.post('/api/blogs').send(blog).expect(401)
	})
});

describe('deleting a blog', () => {
	test('when one is removed, the length of blogs is subtract', async () => {
		const blog = await Blog.findOne();
		const id = blog._id.toString();

		await API.delete(`/api/blogs/${id}`);

		const result = await API.get('/api/blogs');
		const len = initialBlogs.length - 1;
		expect(result.body).toHaveLength(len);
	});
});

describe('updating likes of the blog', () => {
	test('when updating likes, the new number of likes is returned', async () => {
		const blog = await Blog.findOne();
		const id = blog._id.toString();

		const nl = { likes: 200 };

		const result = await API.put(`/api/blogs/${id}`).send(nl).expect(201);

		expect(result.body.likes).toBe(200);
	});
});

afterAll(() => mongoose.connection.close());
