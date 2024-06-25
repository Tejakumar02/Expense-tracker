const express = require('express')
const { createExpense, getAllExpenses, getSpecifiedExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')

const router = express.Router()

router.get('/expenses', getAllExpenses)

router.get('/:id', getSpecifiedExpense)

router.post('/', createExpense)

router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

module.exports = router
