import { useContext } from "react";
import { Outlet } from "react-router-dom";

function Home() {
    const date= new Date();
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return (<>
        <div id="home">
            <nav>
                <img src='../todo.jpg' alt="Todo logo" />
                <div>
                    <div id="day">{days[date.getDay()]}</div>
                    <div id="date">{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>
                </div>
            </nav>

            <div id="outlet">
                <Outlet/>
            </div>
        </div>
    </>);
}


export default Home;