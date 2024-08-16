const userService=require("../services/user.service.js")

//[Bearer, Token]
const getUserProfile=async(req,res)=>{
    

    try {
        console.log(req.headers);
        const jwt=req.headers.authorization?.split(" ")[1];
        // console.log("req: ", jwt);   
        
        if(!jwt){
            return res.status(404).send({error:"Token not found"});
        }

        const user =await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user);
    } catch (error) {
        
        return res.status(500).send({error:error.message})

    }
}

const getAllusers=async(req,res)=>{
    try {
        const users=await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={getUserProfile, getAllusers}