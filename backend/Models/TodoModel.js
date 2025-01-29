const { todoModel } = require("../Schemas/TodoSchema");


function savetodo({userid,title,content,dueDateTime}) {
    return new Promise(async (resolve,reject) => {

        const todoObj=new todoModel({
            userid:userid,
            title:title,
            content:content,
            dueDateTime:new Date(dueDateTime),
        });

        try {
            const TodoDb=await todoObj.save();
            resolve(TodoDb);
        } catch (error) {
            reject(error);
        }
    });
}


//READ-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function readAlltodo({userid}) {
    return new Promise(async (resolve,reject) => {
        console.log("userid",userid, typeof(userid));
        
        try {
            /*
            const todoDb=await todoModel.aggregate([
                {
                    $match : { userid: userid },
                },
                {
                    $sort : { createdAt:-1 },
                }
            ]);
            */
            
            const todoDb=await todoModel.find({userid:userid});

            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
            
    });
}



function readTodaytodo({userid}) {
    return new Promise(async (resolve,reject) => {

        const now=new Date();
        const day1=new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() , now.getUTCDate()));
        const day2=new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() , now.getUTCDate()+1));

        console.log( day1 ,day2, now);
        
        try {
            const todoDb=await todoModel.aggregate([
                {
                    $match:{ dueDateTime: {  $gte: day1, $lt: day2} },
                },
                {
                    $sort:{ dueDateTime: 1 }
                }
            ]);

            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
            
    });
}



function readUpcomingtodo({userid}) {
    return new Promise(async (resolve,reject) => {
        const now=new Date();
        const day=new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() , now.getUTCDate()+1));

        try {
            const todoDb=await todoModel.aggregate([
                {
                    $match:{ dueDateTime: { $gte: day} },
                },
                {
                    $sort:{ createdAt: -1 }
                }
            ]);

            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
    });
}



function readCompletedtodo({userid}) {
    return new Promise(async (resolve,reject) => {
       
        try {
            const todoDb=await todoModel.aggregate([
                {
                    $match:{ userid: userid, "isCompleted": { $eq: true } },
                },
                {
                    $sort:{ createdAt: -1 }
                }
            ]);

            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
    });
}



function readPendingtodo({userid}) {
    return new Promise(async (resolve,reject) => {
       
        try {
            const todoDb=await todoModel.aggregate([
                {
                    $match:{ userid: userid, isCompleted: { $ne: true } },
                },
                {
                    $sort:{ createdAt: -1 }
                }
            ]);

            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
    });
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function editCompletedtodo({todoid}) {
    return new Promise(async (resolve,reject) => {

        try {
            const todoDb=await todoModel.findOneAndUpdate({_id:todoid},{isCompleted:true}) ;
            
            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
        
    });
}



function edittodo({todoid,newttl,newcnt}) {
    return new Promise(async (resolve,reject) => {

        try {
            const todoDb=await todoModel.findByIdAndUpdate({_id:todoid},
                {
                    title:newttl,
                    content:newcnt,
                }) ;
            resolve(todoDb);
        } catch (error) {
            reject(error);
        }
    });
}



function deletetodo({todoid}) {
    return new Promise(async (resolve,reject) => {

        try {
            const todoDb=await todoModel.findByIdAndDelete(todoid);
            resolve(todoDb);
        } catch (error) {
            reject(error);
        }

    });
}




module.exports={savetodo,readAlltodo,readTodaytodo,readUpcomingtodo,readCompletedtodo,readPendingtodo,editCompletedtodo,edittodo,deletetodo};






/*

$expr:{
    $eq:[
        { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
        { $dateToString: { format: "%Y-%m-%d", date:  now } }
    ]
}

*/

/*
    {   $skip: SKIP },
    {   $limit: LIMIT }
*/