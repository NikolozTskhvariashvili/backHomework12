const { Router } = require("express");
const { getAllExpenses, GetExpenseById, createExpense, deleteExpense, updateExpense } = require("./expenses.service");
const hasSecretMiddleware = require("../../middlewares/hasSecret.middleware");
const hasAllRequredMiddleware = require("../../middlewares/hasAllRequred.middleware");
const { upload } = require("../../config/cloudinary.congif");
const expenseRoute = Router()

expenseRoute.get("/", getAllExpenses);

expenseRoute.get('/:id', GetExpenseById)

expenseRoute.post("/", upload.single('image') ,  hasAllRequredMiddleware, createExpense);

expenseRoute.delete("/:id" , hasSecretMiddleware, deleteExpense);

expenseRoute.put("/:id", upload.single('image') , updateExpense);




module.exports = expenseRoute