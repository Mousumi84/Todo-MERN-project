function todoCheck({title,content,dueDateTime}) {
    return new Promise((resolve,reject) => {

        if(!title)
            reject("Enter title");
        if(!dueDateTime)
            reject("Select Date and time");

        if(typeof(title) !== "string")
            reject("Title formate is incorrect");
        if(typeof(content) !== "string")
            reject("Content formate is incorrect");


        resolve();
    });
}


function todoCheckeditdata({title,content}) {
    return new Promise((resolve,reject) => {

        if(!title)
            reject("Enter title");

        if(typeof(title) !== "string")
            reject("Title formate is incorrect");
        if(typeof(content) !== "string")
            reject("Content formate is incorrect");


        resolve();
    });
}


module.exports={todoCheck,todoCheckeditdata};