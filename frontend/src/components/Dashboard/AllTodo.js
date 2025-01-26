import { useEffect, useState } from "react";
//import todo from "../../todo";
import 'material-icons/iconfont/material-icons.css';
import axios from "axios";
import { dueDate,dueTime } from "./utils";
import { useNavigate } from "react-router-dom";

function AllTodo() {
    const [todo,setTodo]=useState([]);
    const [skip,setSkip]=useState(0);
    let limit=3;
    const navigate=useNavigate();

    function more() {
        setSkip(skip+limit);
        console.log(skip);
    }

    useEffect(() => {
        console.log("component didupdate")
        axios.get(`http://localhost:8000/todo/readall?skip=${skip}`)
        .then((response) => {
    
            if(response.data.status !== 200) {
                alert(response.data.message);
            }
            else {
                const data=response.data.data;
                setTodo([data,...todo]);
                //navigate('/dashboard/all');
            }
        })
        .catch((error) => {
            alert("An error occured");
        });

    },[skip]);
    
    console.log(todo);

    const editTodo=async (e) => {
        e.preventDefault();
        console.log(e.target);

        try {
            const response=await axios({
                                        url:"http://localhost:8000/todo/edit",
                                        method:"POST",
                                        //todoid:
            });
            console.log("logout response=>",response);

            if(response.data.status !== 200) {
                alert(response.data.message);
            }

        } catch (error) {
            alert("An error occured");
        }

    }

    const deleteTodo=async (e) => {
        e.preventDefault();
        console.log(e.target);

        try {
            const response=await axios({
                                        url:"http://localhost:8000/todo/delete",
                                        method:"POST",
                                        //todoid:
            });
            console.log("logout response=>",response);

            if(response.data.status !== 200) {
                alert(response.data.message);
            }

        } catch (error) {
            alert("An error occured");
        }

    }


    return (<>
        <div id="alltodos" className="todocnt">
            <h2>ALL TODO : </h2>
            <div onClick={more}>...more</div>
            <div className="todolist">
                {
                    todo.length === 0 ? (<p>No todos available</p>) : (
                        todo.map(item => {
                            return (
                                <div className="todos" key={item._id}>
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
                                        <button onClick={editTodo}>
                                            <span className="material-icons-outlined">edit</span>
                                        </button>
                                        <button onClick={deleteTodo}>
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

export default AllTodo;