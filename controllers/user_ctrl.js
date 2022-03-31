const {
    user,
    Sequelize
} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Op = Sequelize.Op

let self = {};

self.register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        if (!(username&&email&&password)) {
            return res.status(400).send("All Input is Required")
        }

        const oldUser = await user.findOne({where: {email: email}})
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login!");
        }

        const newUser = await user.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        return res.status(200).json({status:"ok", data:newUser});
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

self.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email&&password)) {
            return res.status(400).send("All Input is Required")
        }

        const findUser = await user.findOne({ where: { email: email } });
        if (!findUser) {
            return res.status(400).send("User is not yet Registered!");
        }
        const validatePassword = bcrypt.compareSync(password, findUser.password)

        if (validatePassword) {
            const token = jwt.sign({id: findUser.id}, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.json({status:"success", message: "user found!!!", data:{user: findUser, token:token}});
        } else {
            return res.json({status:"error", message: "Invalid email/password!!!", data:null});
        }

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

module.exports = self;