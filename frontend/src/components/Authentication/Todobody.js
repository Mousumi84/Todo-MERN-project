import { useNavigate } from "react-router-dom";

function Todobody() {
    const navigate=useNavigate();
  
    function loginClick() {
       navigate(`/login`);
    }

    function signupClick() {
       navigate(`/signup`);
    }

    return (<>
        <div id="todobody">
            <button id='login' onClick={loginClick} className="btn">LOGIN</button>
            <button id='signup' onClick={signupClick} className="btn">SIGNUP</button>
        </div>
    </>);
}


export default Todobody;