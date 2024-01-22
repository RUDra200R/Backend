// bring in prisma and cookie

const prisma = require('../prisma/index')

const cookieToken = require('../utils/cookieToken')

// User signup

exports.signup = async(req, res, next) =>{

    try{
        const {name, email, password} = req.body
        // check
        if(!name || !email || !password){
            return res.status(400).json({error: 'Please write fields'})
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })

        //send user a token
        cookieToken(user, res)


    }catch(error){
        throw new Error(error)
    }


}

