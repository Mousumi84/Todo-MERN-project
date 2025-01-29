import axios from "axios";
import { useNavigate } from "react-router-dom";

function Taskboard({setPoptask}) {
    const navigate=useNavigate();

    const taskcreated=async (e) => {
        //e.preventDefault();

        const title=e.target.title.value; 
        const content=e.target.content.value;
        const dueDate=e.target.dueDate.value;
        const dueTime=e.target.dueTime.value;

        setPoptask(false);

        const dt=`${dueDate}T${dueTime}:00Z`
        const dueDateTime=new Date(dt);
        //console.log(dt, Date(),dueDateTime,dueDateTime.toISOString());
    
        const token=localStorage.getItem("token");
        console.log("token=>",token);

        try {
            const response=await axios({
                                        url: "http://localhost:8000/todo/create",
                                        method: "POST",
                                        data: {
                                            title,
                                            content,
                                            dueDateTime
                                        },
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        }
            });

            console.log(response);

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }                       

            navigate('/dashboard/all');
            
        } catch (error) {
            alert("an error occured");
        }

    }

    return (<>
        <div id="createTask" >
            <h1>Add Task</h1>
            <form id="addtsk" onSubmit={taskcreated}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title"/>
                <br/>
                <label htmlFor="cnt">Task Description:</label>
                <textarea id="cnt" name="content" rows="2" cols="10" />
                <br/>
                <label htmlFor="dueDate">Due date:</label>
                <input type="date" id="dueDate" name="dueDate"/>
                <br/>
                <label htmlFor="dueTime">Due time:</label>
                <input type="time" id="dueTime" name="dueTime"/>
                <br/>
                <input type="submit" id="submit" value="ADD" />
            </form>
        </div>
    </>)
}

export default Taskboard;