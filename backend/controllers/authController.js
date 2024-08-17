const express=require('express')
const authModel=require('../model/auth')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// register


const registerController = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => {
            authModel.create({ name, email, password: hash })
                .then((user) => {
                    res.json({ status: "success" });
                })
                .catch(err => {
                    console.error("Error creating user:", err);
                    res.status(500).json({ status: "error", message: "Internal server error" });
                });
        })
        .catch(err => {
            console.error("Error hashing password:", err);
            res.status(500).json({ status: "error", message: "Internal server error" });
        });
};





const logincontroller=(req,res)=>{
    const { email, password } = req.body;
    authModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie("token", token);
                        return res.json({ status: "success", role: user.role });
                    } else {
                        return res.status(401).json({ status: "error", message: "Incorrect password" });

                    }
                });
            } else {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ status: "error", message: "Internal server error" }));
}



module.exports={logincontroller,registerController}