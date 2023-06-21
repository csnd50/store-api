const e = require("express");

class Errors{
static async signUp(req,res,next){
    const {firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password  || !confirmPassword) {
    const errorMessage = {
      Message: 'Please provide firstName, lastName, email, password, confirmPassword  as JSON',
      Example: {
        firstName: "Jhon",
        lastName: "Smith",
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "password"
      }
    };
    return res.status(400).json(errorMessage);
  } 
  return next();
}
static async login(req,res,next){
  const { email, password } = req.body;
  if(!email || !password){
    const errorMessage = {
      Message: 'Please provide  email, password as JSON',
      Example: {
        email: "example@gmail.com",
        password: "password"
      }
    };
    return res.status(400).json(errorMessage);
  }
  return next();
}
}
module.exports={
    Errors
}