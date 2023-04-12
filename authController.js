const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

class authController {
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message:"Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value:"User"})
            const user = new User({username, password:hashPassword, role: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
    async login(req,res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message:`Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
    async getUsers(req,res){
        try {

            res.json('server work')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
}

module.exports = new authController()