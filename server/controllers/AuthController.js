const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class AuthController {
    static register = async (req, res) => {
        try {
            let { name, email, password, role } = req.body;

            email = email.toLowerCase();

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User with this email already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
            });

            await user.save();

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" }
            );

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    cart: user.cart,
                },
                token,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    };

    static login = async (req, res) => {
        try {
            let { email, password } = req.body;

            email = email.toLowerCase();

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" }
            );

            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    cart: user.cart,
                },
                token,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    };

    static deleteUser = async (req, res) => {
        try {
            const {password} = req.body;
            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }
            await User.findByIdAndDelete(userId);
            res.status(200).json({
                message: "User deleted successfully",
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = AuthController;