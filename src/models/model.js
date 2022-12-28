const mongoose = require("mongoose");
const Userdata = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rpassword: {
        type: String,
        required: true
    }
});
const User = new mongoose.model("User",Userdata);
module.exports=User;