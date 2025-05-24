const { Router } = require("express");
const expenseRoute = require("./expenses/expenses.routes");
const apiRouter = Router()

apiRouter.use('/expenses' , expenseRoute)


module.exports = apiRouter