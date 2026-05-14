import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({email: "", password: "", name: ""});
    const navigate = useNavigate();

    const registerHandler = () => {
        console.log(userData.email + " " + userData.password);
        axios.post(
            "http://localhost:1337/users/signUp",
            {
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.password,
                name: userData.name
            }
        ).then(res =>
            {
                localStorage.setItem("token", res.data.token)
                console.log(res.data.token)
                navigate("/");
            }
        ).catch(er =>
            {
                console.log(er)
                alert("Registration failed. Please check your details and try again.");
            }
        )
        setUserData({email: "", password: "", name: ""});
    }

    const onChangeHandler = ({target}) => {
        const {name, value} = target
        setUserData({ ...userData, [name]: value})
    }

    return (
        <>
        <div className="page-card">
            <h2>Register</h2>
            <div>
                <label>Email: </label>
                <input type="email" name="email" id="email" value={userData.email} onChange={onChangeHandler} />
            </div>
            <div>
                <label>Name: </label>
                <input type="text" name="name" id="name" value={userData.name} onChange={onChangeHandler} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" id="password" value={userData.password} onChange={onChangeHandler}/>
            </div>
            <button onClick={registerHandler}>Register</button><br />
            <Link to="/login">Already have an account? Log in</Link>
        </div>
        </>
    )
}

export default Register
