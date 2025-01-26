const validateEmail = (email) => {
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email
      );
    return isEmail;
};

function datavalidation({email,username,name,password}) {
    return new Promise((resolve,reject) => {

        if(!email || !username || !name || !password )
            reject("enter required credentials");

        if(typeof(name) !== "string" )
            reject("Incorrect formate of name");
        if(typeof(username) !== "string" )
            reject("Incorrect formate of username");
        if(typeof(email) !== "string" )
            reject("Incorrect formate of email");
        if(typeof(password) !== "string" )
            reject("Incorrect formate of password");

        if(username.length <5 || username.length >12)
            reject("username length should be 5-12 character");

        if(!validateEmail(email))
            reject("Incorrect formate of email");


        resolve();
    });
}

function loginvalidation({userid,password}) {
    return new Promise((resolve,reject) => {

        if(!userid || !password)
            reject("enter required credentials");

        if(typeof(userid) !== "string" )
            reject("Incorrect formate of userid");
        if(typeof(password) !== "string" )
            reject("Incorrect formate of Password");

        resolve();
    });
}

module.exports={datavalidation,loginvalidation};