

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/sibasis",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongodb");
}).catch((e)=>{
    console.log("not connected");
})

