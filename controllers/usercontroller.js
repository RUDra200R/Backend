// bring in prisma and cookie

const bcrypt = require('bcryptjs')
const prisma = require('../prisma/index')

const cookieToken = require('../utils/cookieToken')

// User signup

exports.signup = async(req, res, next) =>{

    try{
        const {firstname, secondname, phoneno, email, password, organizationName } = req.body
        // check
        if(!firstname || !secondname || !phoneno ||!email || !password || ! organizationName){
            return res.status(400).json({error: 'Please write fields'})
        }

        const user = await prisma.user.create({
            data: {
                firstname,
                secondname,
                phoneno,
                organizationName,
                email,
                password
                // createdAt: new Date()
            }
        })

        //send user a token
        cookieToken(user, res)


    }catch(error){
        throw new Error(error)
    }


}

//User login
exports.login = async(req, res, next)=>{
    try{
        const {email, password} = req.body
        

        if (!email || !password){
            return res.status(400).json({ error : "Email and Password are required"})
        }

        // find a user base on email
        const user = await prisma.user.findUnique({
            where:{
                email,
                password
            },
        })
        // when there is no user
        if(!user){
            return res.status(401).json({ error : "User not found!"})
        }


        // password not match
        if(user.password !== password)
        {
            return res.status(401).json({ error: 'Password does not match'})
        }

        // user is there and validation

        cookieToken(user, res)

    } catch(error) {
        throw new Error(error)
    }
}


// logout user

exports.logout = async(req, res, next)=>{
    try{
        // clear the token from cookies
        res.clearCookie('token');
        res.json({
            message:"Logged out successfully"
        })
    }catch(error){
        throw new Error(error)
    }
}
