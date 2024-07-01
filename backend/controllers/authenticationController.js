require('dotenv').config()
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async(req,res) => {
    const {userName, password} = req.body;
    try {
        let user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ msg: 'User aLready exists'});
        }

        user = new User({userName, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h'},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }            
        )
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const signIn = async(req, res) => {
    const {userName, password} = req.body;
    try {
        let user = await User.findOne({ userName });
        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Password'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    signUp,
    signIn
}