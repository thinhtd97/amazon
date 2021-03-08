import jwt from 'jsonwebtoken'

export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export const protect = (req, res, next) => {
    let token 
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded 
            next()
        } else {
            res.status(404)
            throw new Error("Not authorized, no token")
        }
    } catch (error) {
        console.log(error);
        res.status(404)
        throw new Error("Not authorized")
    }
   
}