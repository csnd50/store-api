class ErrorsProfile{
static async updateProfile(req,res,next){
    const {  password } = req.body;
    if(!password){
            const errorMessage = {
              Message: 'Please provide  password as JSON',
              Note:'firstName ,lastName ,email optional if the user will not send them user Info will not change',
              Example: {
                firstName: "Jhon",
                lastName: "Smith",
                email: "example@gmail.com",
                password: "password",
              }
            };
            return res.status(400).json(errorMessage);
          }
          return next();
}
}
module.exports={
    ErrorsProfile
}