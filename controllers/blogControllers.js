import Blog from '../models/blog.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

const addBlog = async (req, res) => {
   try {
    
    const { title, description, userId } = req.body;

     const user = await User.findById(userId);

     if (!user) {
         return res.json({ message: 'User not found', code: 404 });
     }

      const newBlog = new Blog({
        title,
        description,
        author: userId
    });

    const savedBlog = await newBlog.save();

    return res.json({ message: 'Blog created successfully', code: 200 });
    
   } catch (error) {
    console.error(error);
    return res.json({ message: 'Internal Server Error', code: 500 });
   }

}

const getAllBlogs = async (req, res) => {
   try {

    const { userId } = req.params;
    const { search, pageIndex, pageSize } = req.query;

    // Implementation logic here for pagination
    const pIndex = parseInt(pageIndex) || 1;
    const pSize = parseInt(pageSize) || 6;
    const skip = (pIndex - 1) * pSize;

    const filter = { author: new mongoose.Types.ObjectId(userId) };

    if (search) {
        filter.title = { $regex: search, $options: 'i' };
    }

    const totalBlog = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter).populate('author', 'email firstname lastname').sort({ createdAt: -1 }).skip(skip).limit(pSize);

    return res.json({
        data: blogs,
        pagination: {
            totalPages: Math.ceil(totalBlog / pSize),
            currentPage: pIndex,
            totalBlogs: totalBlog
        },
        code: 200
    });
    
   } catch (error) {
      console.error(error);
      return res.json({ message: 'Internal Server Error', code: 500 });
   }
}

const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: 'Invalid blog ID', code: 400 });
        }

        const blog = await Blog.findById(id).populate('author', 'email, firstname lastname');

        return res.json({
            data: blog,
            code: 200
        });
        
    } catch (error) {
        console.error(error);
        return res.json({ message: 'Internal Server Error', code: 500 });
    }
}

const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: 'Invalid blog ID', code: 400 });
      }

      await Blog.findByIdAndDelete(id);

      return res.json({ message: 'Blog Deleted successfully', code: 200 });

    } catch (error) {
        console.error(error);
        return res.json({ message: 'Internal Server Error', code: 500 });
    }
}

const updateBlog = async (req, res) => {
   try {

    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: 'Invalid blog ID', code: 400 });
    }
    
    const blog = await Blog.findById(id);

    if (title) blog.title = title;
    if (description) blog.description = description;

    await blog.save();

    return res.json({ message: 'Blog updated successfully', code: 200 });

   } catch (error) {
    console.error(error);
    return res.json({ message: 'Internal Server Error', code: 500 });
   }
   
}

export { getAllBlogs, getSingleBlog, deleteBlog, updateBlog, addBlog };