const mongoose=require('mongoose');
const AuthSchema=mongoose.Schema({
    Email:String,
    Password:String,
    createdAt:{
        type:Date,
        default:new Date()
    }
    });
    
    const AuthModal=mongoose.model('User',AuthSchema);
    module.exports=AuthModal;