const isAuth=(req,res,next) => {
       console.log("isAuth page ->",req.session);
    if(req.session.isAuth ) {
        next();
    }
    else {
        return res.send({ 
            status:500,
            message:"Session Expired",
        })
    }
}
module.exports=isAuth;