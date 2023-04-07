const express = require('express')
const { getAllBlog, createBlog, updateBlog, deleteBlog, getOneBlog } = require('../controllers/blogs')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/')
    .get(getAllBlog)
    .post(createBlog)
router.route('/:id')
    .patch(updateBlog)
    .delete(deleteBlog)
    .get(getOneBlog)

module.exports = router

