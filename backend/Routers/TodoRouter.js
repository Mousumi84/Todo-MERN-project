const express=require('express');
const isAuth = require('../Middlewares/isAuth');
const { createTodoController, editTodoController, deleteTodoController, readTodayTodoController, readUpcomingTodoController, readCompletedTodoController, readPendingTodoController, editCompletedTodoController, readAllTodoController } = require('../Controllers/TodoController');
const TodoRouter=express.Router();

/*
TodoRouter.post('/create',createTodoController);
TodoRouter.get('/readall',readAllTodoController);
TodoRouter.get('/readtoday',readTodayTodoController);
TodoRouter.get('/readupcoming',readUpcomingTodoController);
TodoRouter.get('/readcompleted',readCompletedTodoController);
TodoRouter.get('/readpending',readPendingTodoController);
TodoRouter.post('/markcompleted',editCompletedTodoController);
TodoRouter.post('/edit',editTodoController);
TodoRouter.post('/delete',deleteTodoController);
*/



TodoRouter.post('/create',isAuth,createTodoController);
TodoRouter.get('/readall',isAuth,readAllTodoController);
TodoRouter.get('/readtoday',isAuth,readTodayTodoController);
TodoRouter.get('/readupcoming',isAuth,readUpcomingTodoController);
TodoRouter.get('/readcompleted',isAuth,readCompletedTodoController);
TodoRouter.get('/readpending',isAuth,readPendingTodoController);
TodoRouter.post('/markcompleted',isAuth,editCompletedTodoController);
TodoRouter.post('/edit',isAuth,editTodoController);
TodoRouter.post('/delete',isAuth,deleteTodoController);



module.exports=TodoRouter;