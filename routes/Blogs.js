const Express=require('express');
const BlogController=require('../controller/Blogs')
const router = Express.Router();
var multer = require('multer');
const uuid=require('uuid');
const AuthMid=require('../Auth_mdl')
const uploadImage=require('../Services/Firebase')
//  SWAGGER COMPONENTS
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BasicAuth: 
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     courseDto:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *             description: this is for blog title
 *           sub_title:
 *             type: string
 *             description: this is for blog sub title
 *           author_name:
 *             type: string
 *             description: this is for blog author name
 *           date:
 *             type: string
 *             format: date-time
 *             description: this is for blog author name
 *           description:
 *             type: string
 *             description: this is for blog description
 *           image:
 *             type: file
 *             description: this is for blog image
 *         example:
 *           _id: dfs43gfsdghshdsj
 *           course_name: kisan mahat
 *           course_category: web design
 */

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog managing api
 */

// acutal route
/**
 * @swagger
 * /blog:
 *  get:
 *     summary: Use to request all Blog
 *     tags: [Blog]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */
router.get('/', BlogController.getBlogs);

/**
 * @swagger
 * /blog/{id}:
 *  get:
 *    summary: Use to get blog by id
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true 
 *        description: this is for id
 *    responses:
 *       '200':
 *         description: A sucessfull response
 */
router.get('/:id',BlogController.getBlogsID);

// /**
//  * @swagger
//  * /blog:
//  *  post:
//  *    summary: create new Blog
//  *    tags: [Blog]
//  *    security:
//  *      - BasicAuth: []
//  *    requestBody:
//  *      content:
//  *        multipart/form-data:
//  *          schema:
//  *            $ref: '#/components/schemas/courseDto'
//  *    responses:
//  *        '201':
//  *          description: A sucessfull response
//  */
/**
 * @swagger
 * /blog:
 *  post:
 *    summary: create new Blog
 *    tags: [Blog]
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/courseDto'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */

// multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        console.log(req,file)
        cb(null ,uuid.v4() +file.originalname );
    }
});

const upload = multer({ storage: multer.memoryStorage(), })
// router.post('/',AuthMid,upload.array('image',15), BlogController.PostBlogs);
router.post('/',upload.any('image'),uploadImage, BlogController.PostBlogs);



// delete
/**
 * @swagger
 * /blog/{id}:
 *  delete:
 *    summary: Use to delete blog by id
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true 
 *        description: this is for id
 *    responses:
 *       '200':
 *         description: A sucessfull response
 */
router.delete('/:id', BlogController.DeleteBlogs)


module.exports=router;