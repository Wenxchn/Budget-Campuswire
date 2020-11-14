const isAuthenticated = (req, res, next) => {
    if (req.session.username !== '' || typeof req.session.username !== 'undefined' || req.session.username.length > 0) {
        next()
    } else {
        next(new Error('Failed to authenticate'))
    }
}

module.exports = isAuthenticated

