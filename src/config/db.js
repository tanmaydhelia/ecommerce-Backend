const mongoose = require("mongoose")

const monDbUrl = "mongodb+srv://tanmaydhelia03:222ZbHHEwH4NhkwA@cluster0.6us63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(monDbUrl);
}

module.exports={connectDb}