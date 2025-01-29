//import todo from "../../todo";
import { useEffect, useState } from "react";
import 'material-icons/iconfont/material-icons.css';
import axios from "axios";
import { dueDate,dueTime } from "./utils";

function Upcoming() {
    const [todo,setTodo]=useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/todo/readupcoming`)
        .then((response) => {
    
            if(response.data.status !== 200) {
                alert(response.data.message);
            }
            else {
                const data=response.data.data;
                setTodo(...todo,data);
            }
        })
        .catch((error) => {
            alert("An error occured");
        });

    },[]);
    
    console.log(todo);


    return (<>
        <div id="upcm" className="todocnt">
            <h2>UPCOMING TODO : </h2>
            <div className="todolist">
            {
                todo.length === 0 ? (<p>No todos available</p>) : (
                todo.map(item => {
                    return (
                        <div className="todos"  key={item._id}>
                            <div className="tddt">
                                <div id="title">{item.title}</div>
                                <div id="content">{item.content}</div>
                                <div className="dt">
                                    <span>{dueDate(item.dueDateTime)}</span>
                                    <span>{dueTime(item.dueDateTime)}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
                )
            }
            </div>
        </div>

    </>)
}

export default Upcoming;