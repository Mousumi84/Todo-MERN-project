const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const todoSchema=new Schema({
    userid:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50,
    },
    content:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:100,
    },
    dueDateTime:{
        type:Date,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true,
});

const todoModel=mongoose.model("todo",todoSchema);

module.exports={todoModel};