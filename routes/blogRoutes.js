import express from 'express';
const router = express.Router();
import { addBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog } from '../controllers/blogControllers.js'
import checkAuth from '../middleware/auth.middleware.js';

router.get('/GetSingleBlog/:id', checkAuth, getSingleBlog);
router.get('/GetAllBlogs/:userId', checkAuth, getAllBlogs);

router.delete('/:id', checkAuth, deleteBlog);
router.put('/:id', checkAuth, updateBlog);
router.post('/', checkAuth, addBlog);

export default router;