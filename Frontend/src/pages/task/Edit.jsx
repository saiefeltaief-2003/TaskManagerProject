import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () =>
{
    const [taskData, setTaskData] = useState({name: "", description: ""});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const taskId = window.location.pathname.split("/").pop();

        axios.get(
          `http://localhost:1337/tasks/${taskId}`
        ).then(res => {
          const taskUser = res.data.data.task.user;
          
          axios.get(
          "http://localhost:1337/users/me",
          {
              headers: {
                  Authorization: token
              }
          }
          ).then(res => {
            
              if (taskUser !== res.data.data.user._id)
              {
                alert("You are not authorized to edit this task.");
                navigate("/");
              }
          }).catch(err => {
              console.error(err);
          });

          setTaskData({
              name: res.data.data.task.name,
              description: res.data.data.task.description
          });
          
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const submitHandler = (e) =>
    {
        e.preventDefault();
        const taskId = window.location.pathname.split("/").pop();

        axios.patch(
          `http://localhost:1337/tasks/${taskId}`,
          {
            name: taskData.name,
            description: taskData.description
          },
          {
            headers: {
                Authorization: token
            }
          }
        ).then(res => {
            alert("Task updated successfully");
            navigate("/");
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <>
            <h1>Edit Task</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={taskData.name} onChange={(e) => setTaskData({...taskData, name: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" name="description" value={taskData.description} onChange={(e) => setTaskData({...taskData, description: e.target.value})}></textarea>
                </div>
                <button type="submit">Edit Task</button>
            </form>
        </>
    );
}

export default Edit;