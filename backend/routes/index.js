const express = require('express')
const { createExpense, getAllExpenses, getSpecifiedExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')
const { signUp, signIn, authMiddleware } = require('../controllers/authenticationController');

const router = express.Router()

router.get('/expenses', authMiddleware, getAllExpenses)

router.get('/:id', getSpecifiedExpense)

router.post('/', authMiddleware, createExpense)

router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

router.post('/signup', signUp)

router.post('/signin', signIn)

module.exports = router
