const mongoose = require('mongoose');
const BlogModal=require('../Modals/Blogs')

module.exports.getBlogs=async(req,res,next)=>{
    try{
        const data = await BlogModal.find();
        res.status(200).json({message:'blog has been fetched',data:data});

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports.PostBlogs=async(req,res,next)=>{
    // console.log(req.body,req.files,req.file)
    let Imagesss=[];
    console.log()
    console.log(req.files,'here we are')
    if(req.files){
        req.files.map((val,i)=>{
            Imagesss.push({path:val.firebaseUrl})
        })
    }
console.log(Imagesss)
    try{
        const BlogData=new BlogModal({
            title:req.body.title,
            sub_title:req.body.sub_title,
            date:req.body.date,
            description:req.body.description,
            image:Imagesss,
            author_name:req.body.author_name,
        });
       const blogSave=await BlogData.save();
       res.status(200).json({message:'blog has been added',data:blogSave});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


// module.exports.PatchBlogs=async(req,res)=>{
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await BlogModal.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }
module.exports.getBlogsID=async(req,res,next)=>{
    try{
      console.log(req.params.id)
      if(mongoose.isValidObjectId(req.params.id)){

        const data = await BlogModal.findById(req.params.id);
        res.status(200).json({message:'blog has been fetched',data:[data]});
      }else{
        res.status(400).json({message:'enter a valid id'})

    }

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports.DeleteBlogs=async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id)
        if(mongoose.isValidObjectId(id)){
            const data = await BlogModal.findByIdAndDelete(id);
            console.log(data)
            res.status(200).json({message:'data has been deleted'})
        }else{
            res.status(400).json({message:'enter a valid id'})

        }
       
        // res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}