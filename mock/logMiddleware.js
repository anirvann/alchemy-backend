module.exports = (req, res, next) => {
    console.log(`Time :: ${new Date()} :: req :: ${req.url}`)
    next();
}