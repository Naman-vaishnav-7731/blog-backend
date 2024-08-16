import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});


const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
