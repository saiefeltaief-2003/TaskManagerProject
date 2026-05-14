import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState({id: "", name: ""});
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        console.log("Log out");
        navigate("/login");
    }

    const deleteHandler = (taskId) => {
        console.log(taskId);
        
        if (confirm("Are you sure you want to delete this task?"))
        {
            axios.delete(
                `http://localhost:1337/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                }
            ).then(() => {
                setTasks(tasks.filter(task => task._id !== taskId));
            }).catch(err => {
                console.error(err);
            });
        }
    }

    
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(
          "http://localhost:1337/users/me",
          {
              headers: {
                  Authorization: token
              }
          }
        ).then(res => {
            setUserData({id: res.data.data.user.id, name: res.data.data.user.name});

            axios.post(
                "http://localhost:1337/tasks/user",
                {},
                {
                    headers: {
                        Authorization: token
                    }
                }
            ).then(res => {
                setTasks(res.data.data.tasks);
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            console.error(err);
        })


    }, []);

    return (
        <>
            <div className="page-card">
                <h1>Home Page</h1>
                <h2>Welcome, {userData.name}!</h2>
                <h3>Tasks:</h3>
                <button onClick={() => navigate("/tasks/create")}>Add new task</button>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Creation Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                                <td><button onClick={() => navigate(`/tasks/edit/${task._id}`)}>Edit</button></td>
                                <td><button onClick={() => deleteHandler(task._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={logoutHandler}>Log Out</button>
            </div>
        </>
    )
}

export default Home