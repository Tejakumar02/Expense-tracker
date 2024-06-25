const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

//Get all expenses
const getAllExpenses = async(req, res) => {
    const expenses = await Expense.find().sort({createdAt: -1})

    res.status(200).json(expenses)
}

//Get a single expense
const getSpecifiedExpense = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findById(id)

    if(!expense) {
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}

//Create a new expense
const createExpense = async(req, res) => {
    const {date, place, amount} = req.body

    let emptyFields = []

    if(!date) {
        emptyFields.push('Date')
    }
    if(!place) {
        emptyFields.push('Place')
    }
    if(!amount) {
        emptyFields.push('Amount')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }
    else {
        //Add doc to DB
        try {
            const expense = await Expense.create({date, place, amount})
            res.status(200).json(expense)
        }
        catch(error) {
            res.status(400).json({error: error.message})
        }
    }
}

//Delete a expense
const deleteExpense = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})

    if(!expense) {
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}

//Update a expense
const updateExpense = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!expense) {
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}

module.exports = {
    createExpense,
    getAllExpenses,
    getSpecifiedExpense,
    deleteExpense,
    updateExpense
}