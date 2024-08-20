import { AUTH_HEADER_MISSING_ERR, AUTH_TOKEN_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } from '../helpers/error/error.js'
import User from '../models/user.js'
import { verifyToken } from '../utlis/token.util.js';

const checkAuth = async (req, res, next) => {
    try {

        const header = req.headers.authorization

        if (!header) {
            next({ status: 403, message: AUTH_HEADER_MISSING_ERR })
            return
        }

        const token = header.split("Bearer ")[1]

        if (!token) {
            next({ status: 403, message: AUTH_TOKEN_MISSING_ERR })
            return
        }

        const userObj = verifyToken(token, next);

        if (!userObj?.userId) {
            next({ status: 403, message: JWT_DECODE_ERR })
            return
        }

        const user = await User.findById(userObj?.userId)

        if (!user) {
            next({status: 404, message: USER_NOT_FOUND_ERR })
            return
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}

export default checkAuth;
