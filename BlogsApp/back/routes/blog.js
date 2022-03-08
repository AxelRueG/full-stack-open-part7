const { Router } = require('express');
const router = Router();
const {
	deleteBlog,
	updateBlog,
	findBlogs,
	addBlog,
} = require('../controllers/blog');
const { getAllComments, addNewComment } = require('../controllers/commentary')

router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);
router.get('/', findBlogs);
router.post('/', addBlog);

router.get('/:id/comments', getAllComments)
router.post('/:id/comments', addNewComment)

module.exports = router;
