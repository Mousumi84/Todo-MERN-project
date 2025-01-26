import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { details } from "../../App";

function Login() {
    const navigate=useNavigate();
    const{isLogin,setIsLogin,loginInfo,setLoginInfo}=useContext(details);

    const loginSubmit=async (e) => {
        e.preventDefault();

        const userid=e.target.userid.value;
        const password=e.target.password.value;

        try {
            const response=await axios({
                                        url:'http://localhost:8000/auth/login',
                                        method:"POST",
                                        data:{
                                            userid,
                                            password
                                        }
            });

            if(response.data.status !== 200) {
                
                alert(response.data.error);
                return;
            }

            console.log("LOGIN-> ",response);

            setIsLogin(true);
            setLoginInfo(response.data);
            let token=response.data.sid;
            localStorage.setItem("token",token);
            
            setTimeout(() => {
                navigate("/dashboard/today");
            },1000);

        } catch (error) {
            alert("An error to login");
        }
            
    }


    return (<>
        <div className="auth" id="log">
            <img src="todo.jpg" />
            <form className="authform" onSubmit={loginSubmit}>
                <label htmlFor="userid">User Id:</label>
                <input type="text" id="userid" name="userid" placeholder="Email / Username" />
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                <br/>
                <input type="submit" value="LOGIN" className="authbtn" />
            </form>
            <div className="authwrit">Don't have an account?<Link to='/signup'>Signup</Link></div>
            {isLogin && <p className="result">Login Successfully</p>}
        </div>
    </>);
}


export default Login; 