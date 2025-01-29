import { useEffect, useState } from "react";
//import todo from "../../todo";
import 'material-icons/iconfont/material-icons.css';
import axios from "axios";
import { dueDate,dueTime } from "./utils";
import { useNavigate } from "react-router-dom";


function AllTodo() {
    const [todo,setTodo]=useState([]);
    const [pop,setPop]=useState(false);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
   // const [dateTime,setDateTime]=useState("");
    const [todoid,setTodoid]=useState("");
    const navigate=useNavigate();



    function EditPop() { 
        console.log(title,content);
        
        /*
        const dt = new Date(dateTime); 
        const isoDate = dt.toISOString().split('T')[0]; 
        const hours = dt.getUTCHours();
        const minutes = dt.getUTCMinutes();
        const tm=`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; 
        */


        const editData=async (e) => {
           // e.preventDefault();

            setTitle(e.target.title.value);
            setContent(e.target.content.value);

            
            try {
                const response=await axios({
                                            url:`http://localhost:8000/todo/edit?todoid=${todoid}`,
                                            method:"POST",
                                            data: {
                                                todoid,
                                                title,
                                                content
                                            }
                });
                console.log("edit response=>",response);
    
                if(response.data.status !== 200) {
                    alert(response.data.error);
                    return;
                }


                navigate('/dashboard/all');
                //setPop(false);
    
            } catch (error) {
                alert("An error occured");
            }
                
        }
            
        
            return (<>
                <div id="editboard">
                    <button id="cross" onClick={(e)=>setPop(false)}>X</button>
                    <form id="edittsk" onSubmit={editData}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" defaultValue={title}/>
                        <br/>
                        <label htmlFor="cnt">Task Description:</label>
                        <textarea id="cnt" name="content" rows="2" cols="10" defaultValue={content}/>
                        <br />
                        <input type="submit" id="submit" value="EDIT" />
                    </form>
                </div>
            </>);

            /*  <br/>
                <label htmlFor="dueDate">Due date:</label>
                <input type="date" id="dueDate" name="dueDate" value={isoDate}/>
                <br/>
                <label htmlFor="dueTime">Due time:</label>
                <input type="time" id="dueTime" name="dueTime" value={tm} />
                <br/>
                        */
        }


        


    const clickbtn=async (e) => {
        

        if(e.target.classList[1] == "edit") {
            e.preventDefault();

            const parent=e.target.parentNode.parentNode;

            const title=parent.children[0].children[0].children[0].innerHTML;
            const content=parent.children[0].children[0].children[1].innerHTML;
            //const dateTime=parent.children[0].children[1].id;
            
            setTitle(title);
            setContent(content);
           // setDateTime(dateTime);
            setPop(true);
            setTodoid(parent.id);
        }
        else  if(e.target.classList[1] == "delete") {
            const parent=e.target.parentNode.parentNode;

            console.log(parent);
            const todoid=parent.id;

            try {
                const response=await axios({
                                            url:`http://localhost:8000/todo/delete?todoid=${todoid}`,
                                            method:"POST",
                });
                console.log("delete response=>",response);
    
                if(response.data.status !== 200) {
                    alert(response.data.message);
                }

                navigate(0);
    
            } catch (error) {
                alert("An error occured");
            }
    
        }

    }


    useEffect(() => {
        axios.get(`http://localhost:8000/todo/readall`)
        .then((response) => {
    
            if(response.data.status !== 200) {
                alert(response.data.message);
            }
            else {
                const data=response.data.data;
                setTodo(data);
                //navigate('/dashboard/all');
            }
        })
        .catch((error) => {
            alert("An error occured");
        });
    
    },[]);

    console.log(todo);

    return (<>
        <div id="all" className="todocnt">
            <h2>ALL TODO : </h2>
            <div className="todolist">
                {
                    todo.length === 0 ? (<p>No todos available</p>) : (
                        todo.map(item => {
                            return (
                                <div className="todos" key={item._id} id={item._id}>
                                    <div className="tddt">
                                        <div className="tt-ct">
                                            <div className="title">{item.title}</div>
                                            <div id="content">{item.content}</div>
                                        </div>
                                        <div className="dt" id={item.dueDateTime}>
                                            <span>{dueDate(item.dueDateTime)}</span>
                                            <span>{dueTime(item.dueDateTime)}</span>
                                        </div>
                                    </div>
                                    <div className="btn" onClick={clickbtn}>
                                        <button className="material-icons-outlined edit">edit</button>
                                        <button className="material-icons-outlined delete">delete</button>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            {pop && <EditPop />}
        </div>

    </>)
}

export default AllTodo;

//value={title} content={content} data={date} time={time}