import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '12h' });
}

export const verifyToken = (token, next) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (err) {
    console.error('Invalid token:', err)
    next(err)
  }
}
