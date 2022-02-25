const {
	dummy,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	totalLikes,
} = require('../utils/list_helper');

test('dummy returns one', () => {
	const blogs = [];

	const result = dummy(blogs);
	expect(result).toBe(1);
});

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
];

describe('which is the favorite blog', () => {
	test('when the list has one blog, equal the likes of that', () => {
		const vBlog = [blogs[0]];
		const result = favoriteBlog(vBlog);
		expect(result).toEqual(vBlog[0]);
	});

	test('when there is more than one blog, equal to the one with the most likes', () => {
		const result = favoriteBlog(blogs);
		expect(result).toEqual(blogs[2]);
	});

	test('when the list is empty, equal to empty object', () => {
		const result = favoriteBlog([]);
		expect(result).toEqual({});
	});
});

describe('get the author with the most blogs', () => {
	test('when send a list of blogs, return the author with the most blogs', () => {
		const result = mostBlogs(blogs);
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
	});

	test('when send a list with one, return the author', () => {
		const result = mostBlogs([blogs[0]]);
		expect(result).toEqual({ author: 'Michael Chan', blogs: 1 });
	});

	test("when send a list empty, return {'',0}", () => {
		const result = mostBlogs([]);
		expect(result).toEqual({ author: '', blogs: 0 });
	});
});

describe('get the author with the most likes', () => {
	test('when send a list of blogs, return the author with the most likes', () => {
		const result = mostLikes(blogs);
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
	});

	test('when send a list with one, return the author', () => {
		const result = mostLikes([blogs[0]]);
		expect(result).toEqual({ author: 'Michael Chan', likes: 7 });
	});

	test("when send a list empty, return {'',0}", () => {
		const result = mostLikes([]);
		expect(result).toEqual({ author: '', likes: 0 });
	});
});

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const vBlog = [blogs[0]];

		const result = totalLikes(vBlog);
		expect(result).toBe(vBlog[0].likes);
	});

	test('when list has more elements, equals the sum of likes', () => {
		const result = totalLikes(blogs);
		expect(result).toBe(36);
	});

	test('when list is empty, equals to zero', () => {
		const result = totalLikes([]);
		expect(result).toBe(0);
	});
});
