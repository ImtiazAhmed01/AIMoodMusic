const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ---------------- REGISTER ---------------- */

const register = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
};

/* ---------------- LOGIN ---------------- */

const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
};

/* ---------------- GET PROFILE ---------------- */

const getProfile = async (req: any, res: any) => {
    const user = await User.findById(req.user.id)
        .select("-password");

    res.json(user);
};

/* ---------------- UPDATE PROFILE ---------------- */

const updateProfile = async (req: any, res: any) => {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true }
    ).select("-password");

    res.json(user);
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};
