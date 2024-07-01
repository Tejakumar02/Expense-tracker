const express = require('express')
const { createExpense, getAllExpenses, getSpecifiedExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')
const { signUp, signIn } = require('../controllers/authenticationController');

const router = express.Router()

router.get('/expenses', getAllExpenses)

router.get('/:id', getSpecifiedExpense)

router.post('/', createExpense)

router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

router.post('/signup', signUp)

router.post('/signin', signIn)

module.exports = router
