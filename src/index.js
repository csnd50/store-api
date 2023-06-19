const express=require("express");
const app =express();
app.use(express.json());
const Port =3000;
app.listen(Port,()=>{
    console.log(`app listening on port ${Port}`);
})

app.get("/",(req,res)=>{
    res.status(200).json({Message:"api work successfuly"})
})