const { userModel } = require("../Schemas/AuthSchema");
const bcrypt=require('bcryptjs');

function signupsaveinDB({email,username,name,password}) {
    return new Promise(async (resolve,reject) => {

        const hashpassword=await bcrypt.hash(password,Number(process.env.SALT));
        
        const userdata=new userModel({
            email:email,
            username:username,
            name:name,
            password:hashpassword,
        });

        try {
            const userDb=await userdata.save();
            resolve(userDb);
        } catch (error) {
            reject(error);
        }
    });
}



function emailAndUsernameCheck({email,username}) {
    return new Promise(async (resolve,reject) => {

        try {
            const userExist=await userModel.findOne({
                $or:[{email:email},{username:username}],
            });

            if(userExist && userExist.email === email)
                reject("Email already registered");
            if(userExist && userExist.username === username)
                reject("Username already registered");
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}



function findUserById({userid}) {
    return new Promise(async (resolve,reject) => {

        try {
            const userdata=await userModel.findOne({
                $or:[{email:userid},{username:userid}],
            }).select("+password");


            if(!userdata)
                reject("User does not exist");


            resolve(userdata);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports={signupsaveinDB,emailAndUsernameCheck,findUserById};