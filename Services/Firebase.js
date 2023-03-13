


var admin = require("firebase-admin");

var serviceAccount = require("../firebase-key.json");
const uuid=require('uuid');
const Bucket='aribt-blog.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:Bucket,
});

const bucket =admin.storage().bucket();
const uploadImage=(req,res,next)=>{
    if(!req.files) return next();


    req.files.map((val,i)=>{
        const Images=val;
        const Name= uuid.v4()+Images.originalname.split(".").pop();
    
        const file= bucket.file(Name);
        console.log(file)
    
        const stream=file.createWriteStream({
            metadata:{
                contentType:Images.mimetype,
            },
        });
        stream.on("error",(e)=>{
            console.error(e)
        })
        stream.on("finish",async()=>{
            // make public
             file.makePublic();
    // console.log('working');
            // get url
            val.firebaseUrl=`https://storage.googleapis.com/${Bucket}/${Name}`;
    // console.log(val,"first");
    // if(i===req.files.length-1){

    // res.status(200).json({msg:'done'})
    // }
    setTimeout(function(){return next()},10000);

        })
        // console.log(stream)
       
        stream.end(Images.buffer);
        

    });

    console.log(req.files,"files")

    return;
   
}

module.exports=uploadImage;