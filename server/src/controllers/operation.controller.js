const getRepository = require('typeorm').getRepository;
const Operation = require('../model/Operation').Operation;

const getOperations = async (req, res) => {
  const operations = await getRepository(Operation).find();
  return res.json(operations);
};

const getOperation = async (req, res) => {
  const operation = await getRepository(Operation).findOne({
    where: { id: req.params.id },
  });
  if (operation) {
    return res.json(operation);
  }
  return res
    .status(404)
    .json({ msg: `Operation with id: ${req.params.id} not found` });
};

const getIncomeOperations = async (req, res) => {
  const incomeOperations = await getRepository(Operation).find({
    where: { operationType: 'income' },
  });
  if (incomeOperations) {
    return res.json(incomeOperations);
  }
  return res.status(404).json({ msg: `Income operations not found` });
};

const getExpenseOperations = async (req, res) => {
  const expenseOperations = await getRepository(Operation).find({
    where: { operationType: 'expense' },
  });
  if (expenseOperations) {
    return res.json(expenseOperations);
  }
  return res.status(404).json({ msg: `Expense operations not found` });
};

const createOperation = async (req, res) => {
  const operationType = req.body.operationType;
  if (operationType != 'income' && operationType !== 'expense') {
    return res.status(404).json({ msg: 'Invalid operation type' });
  }

  const newOperation = getRepository(Operation).create(req.body);
  const operationSaved = await getRepository(Operation).save(newOperation);
  return res.json(operationSaved);
};

const updateOperation = async (req, res) => {
  const operation = await getRepository(Operation).findOne({
    where: { id: req.params.id },
  });

  if (req.body.operationType) {
    return res.status(403).json({ msg: 'Cannot change operation type' });
  }

  if (operation) {
    getRepository(Operation).merge(operation, req.body);
    const update = await getRepository(Operation).save(operation);
    return res.json(update);
  }

  return res
    .status(404)
    .json({ msg: `Operation with id: ${req.params.id} not found` });
};

const deleteOperation = async (req, res) => {
  const operation = await getRepository(Operation).delete(req.params.id);
  return res.json(operation);
};

module.exports = {
  getOperations,
  getOperation,
  getIncomeOperations,
  getExpenseOperations,
  createOperation,
  updateOperation,
  deleteOperation,
};
