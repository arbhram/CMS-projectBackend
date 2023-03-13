const express=require('express');
const router=express.Router();
const AuthController=require('../controller/Auth');
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDto:
 *         type: object
 *         properties:
 *           Email:
 *             type: string
 *             description: this is for email
 *           Password:
 *             type: string
 *             description: this is for Password
 *         example:
 *           Email: addad@gmail.com
 *           Password: aa12312!#
 */

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: Register managing api
 */

// /**
//  * @swagger
//  * /auth/register:
//  *  post:
//  *    summary: create new User
//  *    tags: [Register]
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/RegisterDto'
//  *    responses:
//  *        '201':
//  *          description: A sucessfull response
//  */

router.post('/register',AuthController.Register);
/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: create check user User
 *    tags: [Register]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterDto'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */
router.post('/login',AuthController.Login);



module.exports = router;