import bcrypt from 'bcrypt';
import User from "../models/user.js"
import { generateToken } from '../utlis/token.util.js'

const signup = async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.json({ message: 'All fields are required', code: 400 });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: 'Email already in use', code: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname: firstName,
            lastname: lastName,
            email,
            password: hashedPassword 
        });

        await newUser.save();
        return res.json({ message: 'User created successfully', code: 200, data: newUser });

    } catch (error) {
        console.log(error)
        return res.json({ message: 'Internal server error', code: 500 });
    }
};

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: 'Email and password are required', code: 400 });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: 'User is not exists', code: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: 'Invalid email or password', code: 400 });
        }

        const token = generateToken(user._id);

        return res.json({ message: 'Login successful', accessToken: token, code: 200, currentUser: user });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Internal server error', code: 500 });
    }
};

export { signup, login };
