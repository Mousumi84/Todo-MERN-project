const express=require("express");
const cors=require("cors");
const mongoose=require('mongoose');
require("dotenv").config();
const session=require('express-session');
const mongoDbsession=require('connect-mongodb-session')(session);


//constants:
const app=express();
const PORT=process.env.PORT || 8001;
const store=new mongoDbsession({
    uri:process.env.MONGO,
    collection:"sessions",
});


//connect mongoDb
mongoose
.connect(process.env.MONGO)
.then(() => {console.log("mongoDb connected")})
.catch((er) => {console.log(er)});


//middleware:
app.set("view engine","ejs");  
app.use(cors(
    {
        credentials:true,
        origin:"http://localhost:3000",
    }
));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
    session({
        cookie: { secure: false, // Set `true` if using HTTPS 
         httpOnly: true, // Prevents client-side JavaScript access 
         maxAge: 1000 * 60 * 60 * 24, // 1 day 
        },
        secret: process.env.SECRET,
        store: store,
        resave: false,
        saveUninitialized: false,
    })
);

//file imports:
const AuthRouter = require("./Routers/AuthRouter");
const TodoRouter = require("./Routers/TodoRouter");

//router:
app.use('/auth',AuthRouter);
app.use('/todo',TodoRouter);

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})