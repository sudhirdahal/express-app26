module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey === 'secret-123') {
        next(); // Authorized!
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
};