const { deleteFromCloduinary } = require("../../config/cloudinary.congif");
const { readFile, writeFile } = require("../../utils");

const getAllExpenses = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const page = Number(req.query.page) || 1;
  let take = Number(req.query.take) || 30;
  take = Math.floor(Math.min(take, 30));
  const start = (page - 1) * take;
  const end = take * page;
  const rame = expenses.splice(start, end);
  res.status(200).json({ message: "reade sucssesfuly", data: rame });
};

const GetExpenseById = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const id = Number(req.params.id);
  const index = expenses.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(400).json({ error: "expense not found" });
  }
  res.json({ message: "read succsesfully", data: expenses[index] });
};

const createExpense = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;
  const newExpenses = {
    id: lastId + 1,
    name: req.body.name,
    price: req.body.price,
    image:req.file.path
  };
  expenses.push(newExpenses);
  await writeFile("expenses.json", JSON.stringify(expenses));
  res.status(201).json({ message: "created succsesfully", data: newExpenses });
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((item) => item.id === id);
  const filename = expenses[index].image.split('uploads/')[1]
  const fileId = filename.split('.')[0]
  const pubblicFierld =  `uploads/${fileId}`
  await deleteFromCloduinary(pubblicFierld)
  if (index === -1) {
    return res.status(400).json({ error: "expresnse not fdound" });
  }
  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", JSON.stringify(expenses));
  res
    .status(201)
    .json({ message: "deleted succsesfully", data: deletedExpense });
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(400).json({ error: "expresnse not fdound" });
  }
  
  const updateReq = {};

  if (req.file) {
  const filename = expenses[index].image.split('uploads/')[1]
  const fileId = filename.split('.')[0]
  const pubblicFierld =  `uploads/${fileId}`
  await deleteFromCloduinary(pubblicFierld)
  if(req.file?.path) updateReq.image = req.file?.path

  }

  if(req.body?.name) updateReq.name = req.body?.name
  if(req.body?.price) updateReq.price = req.body?.price
  if(req.body?.image) updateReq.image = req.body?.image

  expenses[index] = {
    ...expenses[index],
    ...updateReq
  };
  await writeFile("expenses.json", JSON.stringify(expenses));
  res
    .status(201)
    .json({ message: "updated succsesfully", data: expenses[index] });
};

module.exports = {
  getAllExpenses,
  GetExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
