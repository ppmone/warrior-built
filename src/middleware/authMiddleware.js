// ... inside the try block
// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Get user from the token
req.user = await User.findById(decoded.id).select('-password');

if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, user not found');
}

next();
// ...