const { Router } = require('express');
const router = Router();
const {
	deleteBlog,
	updateBlog,
	findBlogs,
	addBlog,
} = require('../controllers/blog');

router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);
router.get('/', findBlogs);
router.post('/', addBlog);

module.exports = router;
