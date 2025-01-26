import { useState,useEffect } from "react";
//import todo from "../../todo";
import 'material-icons/iconfont/material-icons.css';
import axios from "axios";
import { dueDate,dueTime } from "./utils";

function Today() {

    const [todo,setTodo]=useState([]);
    const [skip,setSkip]=useState(0);
    let limit=3;

    function more() {
        setSkip(skip+limit);
        console.log(skip);
    }

   /* useEffect(() => {
        console.log("component didupdate")
        axios.get(`http://localhost:8000/todo/readtoday?skip=${skip}`)
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

    },[skip]);
    */
 //   console.log(todo);


    return (<>
        <div id="today" className="todocnt">
            <h2>TODAY'S TODO : </h2>
            <div onClick={more}>...more</div>
            <div className="todolist">
            {
                todo.length === 0 ? (<p>No todos available</p>) : (
                todo.map(item => {
                    return (
                        <div className="todos"  key={item.userid}>
                            <div className="tddt">
                                <div className="tt-ct">
                                    <div>{item.title}</div>
                                    <div>{item.content}</div>
                                </div>
                                <div className="dt">
                                    <div>DueDate: {dueDate(item.dueDateTime)}</div>
                                    <div>DueTime: {dueTime(item.dueDateTime)}</div>
                                </div>
                            </div>
                            <div className="btn">
                                <button>
                                    <span className="material-icons-outlined">edit</span>
                                </button>
                                <button>
                                    <span className="material-icons-outlined">delete</span>
                                </button>
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

export default Today;