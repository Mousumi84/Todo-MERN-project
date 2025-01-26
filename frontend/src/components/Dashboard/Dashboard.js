import { Outlet, useNavigate } from "react-router-dom";
import 'material-icons/iconfont/material-icons.css';
import { Suspense, useContext, useRef, useState } from "react";
import axios from "axios";
import { details } from "../../App";
import Taskboard from "./Taskboard";

function Dashboard() {
    const [poptask,setPoptask]=useState(false);
    const popupRef = useRef(null);
    const navigate=useNavigate();
    const {isLogin,setIsLogin,loginInfo}=useContext(details);

    const logoutfun=async (e) => {
        e.preventDefault();

        const token=localStorage.getItem("token");
        const session=loginInfo.session;
        
        console.log(token);
        console.log("LOGOUT =>",session);

        try {
            const response=await axios({
                                        url:"http://localhost:8000/auth/logout",
                                        method:"POST",
                                        token:token,
                                        session:session,
                                        withCredentials:true,
            });
            console.log("logout response=>",response);

            if(response.data.status == 200) {
                localStorage.removeItem("token");
                setIsLogin(Boolean(localStorage.getItem("token")));
                navigate("/");
            }
            else {
                alert(response.data.message);
            }

        } catch (error) {
            alert("An error occured");
        }
    }

   // const first=loginInfo.name[0];

    const handleBlur = (event) => {
        event.preventDefault();
       console.log("work");
    };


    return (<>
        <div id="dashboard">
            <div id="box">
                <div id="profile">
                    <div id="first">T</div>
                    <div id="name">TULI</div>
                </div>
                <div id="index">
                    <div id="all" className="cont" onClick={() => navigate('/dashboard/all')}>
                        <span className="material-icons-outlined">done_all</span><span>ALL</span>
                    </div>
                    <div id="tdy" className="cont" onClick={() => navigate('/dashboard/today')}>
                        <span className="material-icons-outlined">calendar_today</span><span>TODAY</span>
                    </div>
                    <div id="upcm" className="cont" onClick={() => navigate('/dashboard/upcoming')}>
                        <span className="material-icons-outlined">upcoming</span><span>UPCOMING</span>
                    </div>
                    <div id="cmp" className="cont" onClick={() => navigate('/dashboard/completed')}>
                        <span className="material-icons-outlined">checklist</span><span>COMPLETED</span>
                    </div>
                    <div id="inpg" className="cont" onClick={() => navigate('/dashboard/pending')}>
                        <span className="material-icons-outlined">edit_calendar</span><span>PENDING</span>
                    </div>
                    <ul id="icon">
                        <li><span className="material-icons-outlined">tag</span>My Project</li>
                        <li><span className="material-icons-outlined">tag</span>Daily Task</li>
                        <li><span className="material-icons-outlined">tag</span>Team</li>
                    </ul>
                    <div className="cont">
                        <span className="material-icons-outlined">settings</span><span>SETTING</span>
                    </div>
                    <div className="cont">
                        <span className="material-icons-outlined">help</span><span>HELP</span>
                    </div>
                </div>
                <button id="logout" onClick={logoutfun}>LOGOUT</button>
            </div>


            <div id="mainbox">
                <div id="wl">Welome back, TULI</div>
                <div id="outlet2">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Outlet/>
                    </Suspense>
                </div>
                <div id="addtask" onClick={()=>setPoptask(!poptask)}>
                    <span className="material-icons-outlined">add_task</span>
                </div>
                {poptask && <div id="taskboard" ref={popupRef} onBlur={handleBlur}>
                                <Taskboard setPoptask={setPoptask}/>
                            </div>}
            </div>
        </div>
    </>);
}


export default Dashboard;

//{loginInfo.data.name}  -> TULI