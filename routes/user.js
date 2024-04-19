const {Router} = require("express") ; 
const User = require("../models/user") ; 
const router = Router() ; 

router.get("/signUp",(req,res)=>{
    return res.render("signUp") ; 
})

router.get("/signIn",(req,res)=>{
    return res.render("signIn") ; 
})

router.get("/logOut",(req,res)=>{
  res.clearCookie("token").redirect("/signIn") ; 
})

router.post("/signUp" , async(req,res)=>{
    const{fullName , email,password} = req.body ; 
    await User.create({
        fullName ,
        email,
        password,
    });
    return res.redirect("/signIn") ; 
});

router.post("/signIn" , async(req,res)=>{
 const{email,password} = req.body ; 
 try{
  const token = await User.matchPasswordAndGenerateToken(email,password) ; 
 
  return res.cookie("token" , token).redirect("/") ; 
 }catch(error){
  return res.render("signIn" , {
    error:"Incorrect Email And Password" ,
  })
 }
});

module.exports= router ;