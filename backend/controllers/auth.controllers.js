import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
export const signup = async (req ,res,next) => {

    const { username, email, password } = req.body
    console.log(req.body)

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All fields are required"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    try {
      await user.save()
      res.json( "Signup Sucessful" )
      
    } catch (error) {
      next(error)
    }

      
    
}    