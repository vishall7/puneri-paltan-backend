export const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        console.log(err.message);
        return next();
    }
    return res
    .status(500)
    .json({
        error: err.message || 'Something went wrong',
        status: err.status || 500
    });
};