var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const morgan = require("morgan");
var dotenv = require("dotenv");
var multer = require('multer')
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')
var app = express();
dotenv.config();
//  swaagger option
const swaggerOptions={
    definition:{
       openapi: '3.0.0',
       info:{
           title:"test",
           description:" test BLOGS",
           contact:{
               name:''
           },
           servers:[process.env.PORT]
       }
    },
    apis:["./routes/*.js"]
   }
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.use(cors({origin:'*'}));
app.use('/public',express.static('./public'))
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.get('/',(req,res)=>{
    res.send('this is for test')
})

// router link
const Blog=require('./routes/Blogs');
const Auth=require('./routes/Auth');
app.use('/blog',Blog);

app.use('/auth',Auth);
// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file,req);
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        console.log(file,"here");
        cb(null , file.originalname );
    }
});

const upload = multer({ storage: storage })
app.post('/files',upload.single('file'),(req,res)=>{
    console.log(req.body)
    res.send('this is for hubit')
})
// app.listen(process.env.PORT);
// console.log("Application is running at port:"+process.env.PORT)

// mongoodb connection 
const CONNECTION_URL=process.env.CONNECTION_URL;
const PORT = process.env.PORT || 4000;
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>app.listen(PORT),console.log("Application is running at port:"+PORT)
).catch(err=>console.log(err))