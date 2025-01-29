const { savetodo, readTodaytodo, readUpcomingtodo, readCompletedtodo, readPendingtodo, editCompletedtodo, deletetodo, edittodo, readAlltodo } = require("../Models/TodoModel");
const { todoCheck, todoCheckeditdata } = require("../Utils/todoUtil");


const userid="6794f9814e3dfe26162b8699"


// 1. CREATE TODO------------------------------------------------------------
const createTodoController=async (req,res) => {
    console.log("CREATE TODO");
    
    const {title,content,dueDateTime}=req.body;
    // const userid=req.session.user.userid;
    
    //Todo check:
    try {
        await todoCheck({title,content,dueDateTime});
    } catch (error) {  
        return res.send({
            status:400,
            message:error,
            error:error,
        });
    }

    //Save todo:
    try {
        const todoDb=await savetodo({userid,title,content,dueDateTime});
        
        return res.send({
            status:200,
            message:"Todo created successfully",
            data:todoDb,
        });
        console.log("SAVE DATA",todoDb);
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }

}



// 2. READ ALL TODO------------------------------------------------------------
const readAllTodoController=async (req,res) => {
    console.log("READ ALL TODO");
    // const userid=req.session.user.userid;
    
    try {
        const todoDb=await readAlltodo({userid});
        console.log("todoDb All =>",todoDb)
        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



// 3. READ TODAY'S TODO------------------------------------------------------------
const readTodayTodoController=async (req,res) => {
    console.log("READ TODAY'S TODO");
    // const userid=req.session.user.userid;
    
    try {
        const todoDb=await readTodaytodo({userid});
        console.log("todoDb Today's=>",todoDb);
         
        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



// 4. READ UPCOMING TODO------------------------------------------------------------
const readUpcomingTodoController=async (req,res) => {
    console.log("READ UPCOMING TODO");
    // const userid=req.session.user.userid;
    
    try {
        const todoDb=await readUpcomingtodo({userid});
        console.log("todoDb upcoming=>",todoDb)

        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



// 5. READ COMPLETED TODO------------------------------------------------------------
const readCompletedTodoController=async (req,res) => {
    console.log("READ COMPLETED TODO");
    // const userid=req.session.user.userid;
    
    try {
        const todoDb=await readCompletedtodo({userid});
        console.log("todoDb isCompleted=>",todoDb)

        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



// 6. READ PENDING TODO------------------------------------------------------------
const readPendingTodoController=async (req,res) => {
    console.log("READ PENDING TODO");
    // const userid=req.session.user.userid;
    
    try {
        const todoDb=await readPendingtodo({userid});
        console.log("todoDb pending=>",todoDb)

        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



// 7. EDIT COMPLETED TODO------------------------------------------------------------
const editCompletedTodoController=async (req,res) => {
    console.log("EDIT COMPLETED TODO");
    const todoid=req.query.todoid;
    
    try {
        const todoDb=await editCompletedtodo({todoid});

        return res.send({
            status:200,
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }

}



// 8. EDIT TODO------------------------------------------------------------
const editTodoController=async (req,res) => {
    console.log("EDIT TODO");
    const todoid=req.query.todoid;
    const newttl=req.body.title;
    const newcnt=req.body.content;


     //Todo check:
     try {
        await todoCheckeditdata({title:newttl,content:newcnt});
    } catch (error) {  
        return res.send({
            status:400,
            message:error,
            error:error,
        });
    }


    try {
        const todoDb=await edittodo({todoid,newttl,newcnt});

        return res.send({
            status:200,
            data:todoDb,
            message:"Edit Successfull",
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
    
}



// 9. DELETE TODO------------------------------------------------------------
const deleteTodoController=async (req,res) => {
    console.log("DELETE TODO");
    const todoid=req.query.todoid;
    

    try {
        const todoDb=await deletetodo({todoid});

        return res.send({
            status:200,
            message:"Todo deleted",
            data:todoDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



module.exports={createTodoController,readAllTodoController ,readTodayTodoController,readUpcomingTodoController,readCompletedTodoController,readPendingTodoController,editCompletedTodoController,editTodoController,deleteTodoController};