const _ = require('lodash')

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((tot, elem) => (tot += elem.likes), 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return {}

	const favorite = blogs.reduce((fav, elem) =>
		fav.likes < elem.likes ? elem : fav
	);
	return favorite;
};

const mostBlogs = (blogs) => {
	const response = {author: '', blogs: 0}
	if (!blogs.length) return response

	const obj = _.countBy(blogs, (b) => b.author)
	const keys = Object.keys(obj)

	for (let author of keys){
		if (obj[author] > response.blogs) {
			response.author = author
			response.blogs = obj[author]
		}
	}

	return response
}

const mostLikes = (blogs) => {
	const response = {author: '', likes: 0}
	if (!blogs.length) return response

	const obj = _.groupBy(blogs, (b) => b.author)
	const keys = Object.keys(obj)

	for (let author of keys){
		const likes = obj[author].reduce((tot,b) => tot+=b.likes, 0)
		if (likes > response.likes) {
			response.author = author
			response.likes = likes
		}
	}
	
	return response
}

module.exports = {
	dummy,
	totalLikes,
  favoriteBlog,
	mostBlogs,
	mostLikes
};
