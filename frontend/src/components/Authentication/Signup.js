import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [isSignup,setIsSignup]=useState(false);
    const navigate=useNavigate();
    
    const signupsubmit=async (e) => {
        e.preventDefault();
        console.log("signup");

        const email=e.target.email.value;
        const username=e.target.username.value;
        const name=e.target.name.value;
        const password=e.target.password.value;

        try {
            let response=await axios({
                                url:'http://localhost:8000/auth/signup',
                                method:"POST",
                                data:{
                                        email,
                                        username,
                                        name,
                                        password
                                    }
            });

            if(response.data.status !== 200) {
                alert(response.data.error);
                return;
            }

            setIsSignup(true);

            setTimeout(() => {
                navigate("/login");
            },1000);

        } catch (error) {
            alert("An error to Signup");
        }
    }

    return (<>
        <div className="auth" id="sign">
            <img src="todo.jpg" />
            <form className="authform" onSubmit={signupsubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Email" />
                <br/>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Username" />
                <br/>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Name" />
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                <br/>
                <input type="submit" value="SIGNUP" className="authbtn" />
            </form>
            <div className="authwrit">Have an account?<Link to='/login'>Login</Link></div>
            {isSignup && <p className="result">Signup Successfully</p>}
        </div>
    </>);
}


export default Signup;