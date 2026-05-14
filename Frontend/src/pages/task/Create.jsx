import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();

    const submitHandler = (e) =>
    {
        e.preventDefault();
        axios.post(
            "http://localhost:1337/tasks",
            {
                name: e.target.name.value,
                description: e.target.description.value
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            }
        ).then(res => {
            alert("Task created successfully!");
            navigate("/");
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <>
            <h1>Create Task</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <button type="submit">Create Task</button>
            </form>
        </>
    );
}

export default Create;