import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState({name: ""});
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        console.log("Log out");
        navigate("/login");
    }

    
    useEffect(() => {
        axios.get(
          "http://localhost:1337/users/me",
          {
              headers: {
                  Authorization: `${localStorage.getItem("token")}`
              }
          }
        ).then(res => {
            console.log(res.data);
            setUserData({name: res.data.data.user.name});
        }).catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <>
            <div>
                <h1>Home Page</h1>
                <h2>Welcome, {userData.name}!</h2>
                <button onClick={logoutHandler}>Log Out</button>
            </div>
        </>
    )
}

export default Home