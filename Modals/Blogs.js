const mongoose=require('mongoose');
const BlogSchema=mongoose.Schema({
    title:String,
    sub_title:String,
    date:String,
    description:String,
    image:{
        type:Array
    },
    author_name:String,
    createdAt:{
        type:Date,
        default:new Date()
    }
    });
    
    const BlogModal=mongoose.model('blog',BlogSchema);
    module.exports=BlogModal;