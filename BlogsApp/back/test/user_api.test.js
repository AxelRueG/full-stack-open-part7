const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const API = supertest(app);

const User = require('../models/user');

const initialUsers = [
	{
		username: 'userNum1',
		name: 'nombre one',
		password: 'Soy_un_usuario',
	},
	{
		username: 'userNum2',
		name: 'nombre two',
		password: 'Soy_otro_usuario',
	},
];

const othersUser = [
	{
		username: 'userNum3',
		name: 'nombre three',
		password: 'pwd123456',
	},
	{
		username: 'u',
		name: 'nombre four',
		password: 'pwdlength',
	},
	{
		username: 'userNum4',
		name: 'nombre four',
		password: 'ab',
	},
	{
		username: '',
		name: 'nombre four',
		password: '',
	},
];

beforeAll(async () => {
	// cleaning DB
	await User.deleteMany({});
}, 10000);

describe('get users', () => {
	test('get all users', async () => {
		// send data to DB
		await API.post('/api/users').send(initialUsers[0]).expect(201);
		await API.post('/api/users').send(initialUsers[1]).expect(201);
		// getting from DB
		const result = await API.get('/api/users');
		expect(result.body).toHaveLength(initialUsers.length);
	});
});

describe('create a new user', () => {
	test('when create a new user, this is save in DB', async () => {
		await API.post('/api/users').send(othersUser[0]).expect(201);
		const result = await User.find({});
		expect(result).toHaveLength(1);
	});

	test('the user should be unique', async () => {
		await API.post('/api/users').send(othersUser[0]).expect(201);
		const res = await API.post('/api/users').send(othersUser[0]).expect(400);
		expect(res.body.error).toBe(
			`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${othersUser[0].username}\``
		);
	});

	test('the username length dont be less than 3', async () => {
		const res = await API.post('/api/users').send(othersUser[1]).expect(400);
		expect(res.body).toEqual({
			error: `User validation failed: username: Path \`username\` (\`${othersUser[1].username}\`) is shorter than the minimum allowed length (3).`,
		});
	});

	test('the password length dont be less than 3', async () => {
		const res = await API.post('/api/users').send(othersUser[2]).expect(400);
		expect(res.body).toEqual({
			error: 'user invalid',
		});
	});

	test('the username and password are required', async () => {
		const res = await API.post('/api/users').send(othersUser[3]).expect(400);
		expect(res.body).toEqual({
			error: 'user invalid',
		});
	});
});

afterAll(() => mongoose.connection.close());
