import express from 'express';
const router = express.Router();
import { addBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog } from '../controllers/blogControllers.js'

router.get('/GetSingleBlog/:id', getSingleBlog);
router.get('/GetAllBlogs/:userId', getAllBlogs);

router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);
router.post('/', addBlog);

export default router;