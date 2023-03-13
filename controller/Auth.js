const AuthModal = require("../Modals/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.Register = async (req, res) => {
  console.log(req.body);
  try {
    await bcrypt
      .hash(req.body.Password, 10)
      .then((hashedPassword) => {
        console.log(hashedPassword);
        const user = new AuthModal({
          Email: req.body.Email,
          Password: hashedPassword,
        });
        user
          .save()
          .then((result) => {
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((e) => {
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// login requests
module.exports.Login = async (req, res) => {
    console.log(req.body)
    await AuthModal.findOne({ Email: req.body.Email })
    .then((user)=>{
        console.log(user,req.body.Password)
        bcrypt.compare(req.body.Password, user.Password,function(err,data){
            console.log(err,data);
            if(err){
                res.status(400).send({
                    message: "Passwords does not matchSS",
                  });
            }
            if(data){
                    //   create JWT token
         const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.Email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          console.log(jwt.verify(token,"RANDOM-TOKEN"))

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            Email: user.Email,
            token,
          });
            }
        })
       
        
        // res.status(200).json({message:'login in action'})
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
};
