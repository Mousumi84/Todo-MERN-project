import todo from "../../todo";
import 'material-icons/iconfont/material-icons.css';

function Upcoming() {
    return (<>
        <div id="upcomingtodo" className="todocnt">
            <h2>UPCOMING TODO : </h2>
            <div className="todolist">
            {
                
                todo.map(item => {
                    return (
                        <div className="todos"  key={item.userid}>
                            <div className="tddt">
                                <div className="tt-ct">
                                    <div>{item.title}</div>
                                    <div>{item.content}</div>
                                </div>
                                <div className="dt">
                                    <div>DueDate:</div>
                                    <div>DueTime:</div>
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

            }
            </div>
        </div>

    </>)
}

export default Upcoming;