const ConnectMongoDBSession = require("connect-mongodb-session");
const { signupsaveinDB, emailAndUsernameCheck, findUserById } = require("../Models/AuthModel");
const { datavalidation, loginvalidation } = require("../Utils/authUtil");
const bcrypt=require('bcryptjs');
const mongoose=require("mongoose");
const jwt =require("jsonwebtoken");
const session=require('express-session');

const signupController = async (req,res) => {
    console.log("SIGNUP");

    const {email,username,name,password}=req.body;

    //Data Validation
    try {
        await datavalidation({email,username,name,password});
    } catch (error) {
        return res.send({
            status:400,
            error:error,
        });
    }

    //Email and Username exist
    try {
        await emailAndUsernameCheck({email,username});
    } catch (error) {
        return res.send({
            status:400,
            error:error,
        });
    }


    //Save user info in db
    try {
        const userDb=await signupsaveinDB({email,username,name,password});

        console.log(userDb);
        return res.send({
            status:200,
            message:"Registered successful",
            data:userDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const loginController = async (req,res) => {
    console.log("LOGIN");

    const {userid,password}=req.body;

    //Data Validation
    try {
        await loginvalidation({userid,password});
    } catch (error) {
        return res.send({
            status:400,
            error:error,
        });
    }


    //UserId registered or not
    try {
        const userdata=await findUserById({userid});

        //Compare Password
        const passwordcompare=await bcrypt.compare(password,userdata.password);

        if(!passwordcompare) {
            return res.send({
                status:400,
                message:"Incorrect Password",
            });
        }

        //Session
        req.session.isAuth=true;
        req.session.user={
            userid:userdata._id,
            email:userdata.email,
            username:userdata.username,
            name:userdata.name,
        }

      /*  const token=jwt.sign({ 
            userid:userdata._id,
            email:userdata.email,
            username:userdata.username,
            name:userdata.name
        },process.env.SECRET);
        */


        return res.send({
            status:200,
            message:"Login Successful",
            sid:req.session.id,
        });

    } catch (error) {
        return res.send({
            status:400,
            error:error,
        });
    }
}



const logoutController=(req,res) => {
    console.log("LOGOUT");

    req.session.destroy((er) => {
        if(er) {
            return res.send({
                status:500,
                message:"Internal server error",
            });
        }
        else {
            return res.send({
                status:200,
                message:"Logout successful",
            });
        }
    })
}




    //build module for session
    const Schema=mongoose.Schema;
    const sessionSchema=new Schema({ _id:String},{strict:false});
    const sessionModel=mongoose.model("session",sessionSchema);


const logoutFromAllDvController=async (req,res) => {
    console.log("LOGOUT FROM ALL DV.");

    const userid=req.session.user.userid;

    //delete session
    try {
        const deletesession =await sessionModel.deleteMany({"session.user.userid":userid});

        return res.send({
            status:200,
            message:"Logout from all devices",
        });

    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }

}



module.exports={signupController,loginController,logoutController,logoutFromAllDvController};