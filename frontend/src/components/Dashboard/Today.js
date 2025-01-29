import { useState,useEffect } from "react";
//import todo from "../../todo";
import 'material-icons/iconfont/material-icons.css';
import axios from "axios";
import { dueDate,dueTime } from "./utils";
import { useNavigate } from "react-router-dom";

function Today() {
    const [todo,setTodo]=useState([]);
    const navigate=useNavigate();

    const CheckFun=async (e) => {

        const parent=e.target.parentNode;

            console.log(parent.id);
            const todoid=parent.id;

            try {
                const response=await axios({
                                            url:`http://localhost:8000/todo/markcompleted?todoid=${todoid}`,
                                            method:"POST",
                });
                console.log("delete response=>",response);
    
                if(response.data.status !== 200) {
                    alert(response.data.message);
                }

                navigate('/dashboard/completed');
    
            } catch (error) {
                alert("An error occured");
            }
    
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/todo/readtoday`)
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
        <div id="tdy" className="todocnt">
            <h2>TODAY'S TODO : </h2>
            <div className="todolist">
            {
                todo.length === 0 ? (<p>No todos available</p>) : (
                todo.map(item => {
                    return (
                        <div className="todos"  key={item._id} id={item._id}>
                            <input type="checkbox" className="check" onChange={CheckFun} />
                            <div className="tddt">
                                <div id="title">{item.title}</div>
                                <div id="content">{item.content}</div>
                                <div className="dt">
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

export default Today;