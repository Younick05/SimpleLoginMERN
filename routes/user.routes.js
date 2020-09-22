const User = require("../model/user.model");
const express = require('express');
const router = express.Router();

//create data into database
router.post("/", (req,res) => {
    const newRecord = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cpassword:req.body.cpassword,
        gender:req.body.gender
    })
    
    newRecord
        .save(newRecord)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                message:"error encountered"
            });
        });
});

//deleting the data into database
router.delete("/dashboard/:id", (req,res) => {
    const id=req.params.id
    User
    .findByIdAndRemove(id)
    .then(data => {
        res.send({
            message:'Record deleted successfully'
        })
    })
    .catch(err => {
        res.send({
            message:"error"
        })
    })
})

//update the data into database
router.put("/dashboard/:id", (req,res) => {
    const id=req.params.id
    User
    .findByIdAndUpdate(id, req.body)
    .then( () => {
        res.send({
            message:"updated successfully"
        })
    })
    .catch(err => {
        res.send(err)
    })
})

//retrieve data from database
router.get("/dashboard/:id", (req,res) => {
    const id=req.params.id
    User
    .findById(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        message:"error"
    })
})

//login
router.post("/login", (req, res) => {
    
    const {email,password} = req.body
    
    User.findOne({email:email})
       .then( (data)=> {
           
        if(data.password===password){
            res.send(data)
        }
        else res.send(err)  
        })   
          
       .catch(err => {
        res.status(500).send({
         message:
            err.message || "Some error"
        });
     });
  });
    
module.exports = router;

