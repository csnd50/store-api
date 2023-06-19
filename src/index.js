const express=require("express");
const app =express();
app.use(express.json());
const {Registration}=require("./registration")
const Port =3000;
app.listen(Port,()=>{
    console.log(`app listening on port ${Port}`);
})
//test end-point for checklogin & checkRole
app.get("/",Registration.checklogin,Registration.checkRole,(req,res)=>{
    res.status(200).json({Message:"Hii"})
})
//1- signUp
app.post("/sign-up",Registration.signUp);
//2- login 
app.post("/login",Registration.login);