module.exports = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next(); // Crucial! This tells Express to move to the next function.
};