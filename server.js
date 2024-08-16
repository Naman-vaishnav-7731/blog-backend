import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js'
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/blog', blogRoutes);
app.use('/api/auth', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongooDB is connected");
}).catch((er) => {
  console.log(er)
})

