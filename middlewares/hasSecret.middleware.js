

module.exports = (req,res,next) => {
    const secret = req.headers['secret']
    if(!secret){
        return res.status(400).json({error:"secret is required"})
    }

    next()
}