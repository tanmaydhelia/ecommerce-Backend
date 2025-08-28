const mongoose = require("mongoose")
require('dotenv').config();

const connectDb=()=>{
    return mongoose.connect(process.env.monDbUrl);
}

module.exports={connectDb}