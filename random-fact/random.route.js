const { Router } = require("express");

const randomRoute = Router()

randomRoute.get('/', (req,res)=> {
    const randomNum = Math.floor(Math.random()*200000) + 1
    if(randomNum % 2 === 0){
        res.send(`price of btc is ${randomNum}`)
    }

    return res.status(400).json({error:'decnided'})
})

module.exports = randomRoute