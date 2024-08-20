import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import blogRoutes from './routes/blogRoutes.js'
import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 3002

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blog', blogRoutes)
app.use('/api/auth', userRoutes)

// Handling not found api route
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "API endpoint is not found",
  };
  next(error);
});

// Global Error handling
app.use((err, req, res, next) => {
  const status = err.code || 500
  const message = err.message || 'Internal Server Error'
  const data = err.data || null
  res.json({
    code: status,
    message,
    data
  })
})

const main = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })

    const connection = await mongoose.connect(process.env.MONGO_URL)
    if (connection) {
      console.log('MongooDB is connected')
    }
  } catch (error) {
    console.log(error)
  }
}

main();
