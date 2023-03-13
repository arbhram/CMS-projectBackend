const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    console.log('ggg',req.headers.authorization)
    try {
        let token;
        if(req.headers.authorization.match('Bearer ')){
console.log('working')
            token= await req.headers.authorization.split('Bearer ')[1];
        }else{
            token=await req.headers.authorization;

        }
        console.log(token," jhjhx")
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
        const user = await decodedToken;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
          });
    }
   
}
