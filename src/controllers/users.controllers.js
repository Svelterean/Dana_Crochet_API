import { User } from "../models/users.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async(req, res) => {
    const usersList = await User.find()

    if(!usersList) {
        res.status(500).json({success: false})
    }

    res.send(usersList)
}

export const getUsersCount = async (req, res) => {
    const UsersCount = await User.countDocuments()

    if(!UsersCount){
        res.status(500).json({success: false})
    }

    res.send({
        count: UsersCount
    })
}

export const deleteUser = async(req, res) => {
    try {
        User.findByIdAndDelete(req.params.id)
        .then(User => {
            if(User) {
                return res.status(200).json({success: true, message: "User deleted"})
            }
            else {
                return res.status(404).json({success: false, message: "User not found"})
            }
        }).catch(err => {
            return res.status(400).json({success: false, message: err})
        })
    }
    catch (error) {
        res.send(error)
    }
}

export const registerUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        zip: req.body.zip,
        isAdmin: req.body.isAdmin || false
    })
        
    user.save()
    .then(createdUser => {
        res.status(201).json(createdUser)
    })
    .catch((err) => {
        res.status(500).json(err)
    })   
}


export const logUser = async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.SECRET_JWT_STRING;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            {expiresIn : '1w'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

};