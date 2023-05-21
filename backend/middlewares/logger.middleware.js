const logger = (req,res,next)=>{
    console.log(`endpoint: ${req.url} | method: ${req.method}`);
    next();
}

module.exports = {
    logger
}