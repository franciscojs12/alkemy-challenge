const Router = require('express').Router;
const router = Router();

const {
  getOperations,
  getIncomeOperations,
  getExpenseOperations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
} = require('../controllers/operation.controller');

// router.get('/operations', getOperations);
// router.get('/operations/income', getIncomeOperations);
// router.get('/operations/expense', getExpenseOperations);
// router.post('/operations', createOperation);
// router.get('/operations/:id', getOperation);
// router.put('/operations/:id', updateOperation);
// router.delete('/operations/:id', deleteOperation);

module.exports = router;
