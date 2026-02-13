const jwt = require("jsonwebtoken");

const auth = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token)
            return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
