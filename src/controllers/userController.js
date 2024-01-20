const userModel = require('../models/userModel'); 
const todoModel = require('../models/todoModel');
const SendEmailUtility = require('../utility/SendEmailUtility');

const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../middleware/hash_password');



  
  
exports.Sining = async(req, res) => {
  try {
    const { name, password, email, admin} = req.body;

    if (!name) {
      return res.json({
        "success": false,
        error: "name is required"
      });
    }
    if (!password && password.length<7) {
      return res.json({
        "success": false,
        error: "Password must be getter then 7 Character"
      });
    }
    if (!email) {
      return res.json({
        "success": false,
        error: "Email is required"
      });
    }

    const existsUser = await userModel.findOne({email});

    if (existsUser) {
      return res.status(409).json({
        "success": false,
        error: "User already exists"
      })
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(code);


    // send email notification------------------
    // let EmailText = `Hi ${name} Welcome to myToDoApplication \nEmail Verification Code is \n\n${code} \n \n\nThanks for signing`;
   
    const hashedPassword = await hashPassword(password)
   
    

    const user = await new userModel({
      name,
      password: hashedPassword,
      email,
      otp: code,
      admin,
    }).save();

    // await SendEmailUtility(email, EmailText, "Email Verification Code");


    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '7d'
    })

    res.json({
      "success": true,
      user,
      token: token,
    })

  

  } catch (error) {
    res.json({
      "success": false,
      error: "user Sining failed and Error: " + error
    })
  }
}


exports.verifyUser = async (req, res) => {
 
    const { email, otp } = req.params;

    if (!email && !otp) {
      return res.json({
        "success": false,
        error: "Please ensure your Valid information"
      });
    }


    const user = await userModel.findOne({ email: email, otp: otp }).count('total');

    const userDetails = await userModel.find({ email });

    
    if (user === 1) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
      res.json({
        "success": true,
        user: userDetails,
        token: token,

      })
    } else {
      res.json({
        "success": false,
        "massage": "User invalid and invalid Otp",
        "error": "User verification failed"
      })
    }
}


// user can delete account ------------

exports.deleteAccount = async (req, res) => {
  try {
  
    const userCanTodo = await todoModel.findOne({ user: req.user._id });
    if (userCanTodo) {
      return res.json({
        "success": false,
        "massage": "delete Created Todo before account Delete",
        error: "this User has information in database",
      })
    }

    const userFind = await userModel.findOne({_id: req.user._id });

    if (!userFind) {
      return res.json({
        "success": false,
        error: "user dose not  exists"
      })
    }

    const userDeleted = await userModel.findByIdAndDelete(req.user._id);

    res.json({
      "success": true,
      "massage": "User Delete Success",
      "data": userDeleted,
    })


  } catch (error) {
    res.json({
      "success": false,
      error: "User verification failed Account deletion failed and error : " + error
    })
  }
}