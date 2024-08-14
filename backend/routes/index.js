const express = require('express')
const { createExpense, getAllExpenses, getSpecifiedExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')
const { signUp, signIn, authMiddleware, updatePassword } = require('../controllers/authenticationController');

const router = express.Router()

router.get('/expenses', authMiddleware, getAllExpenses)

router.get('/:id', getSpecifiedExpense)

router.post('/', authMiddleware, createExpense)

router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

router.post('/signup', signUp)

router.post('/signin', signIn)

router.post('/change_password', updatePassword)

module.exports = router
