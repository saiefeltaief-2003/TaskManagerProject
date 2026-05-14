import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const loginHandler = () => {
        console.log(userData.email + " " + userData.password);
        axios.post(
            "http://localhost:1337/users/signIn",
            {
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.password
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
            }
        )
        setUserData({email: "", password: ""});
    }

    const onChangeHandler = ({target}) => {
        const {name, value} = target
        setUserData({ ...userData, [name]: value})
    }

    return (
        <>
        <div>
            <h2>Log in</h2>
            <div>
                <label>Email: </label>
                <input type="email" name="email" id="email" value={userData.email} onChange={onChangeHandler} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" id="password" value={userData.password} onChange={onChangeHandler}/>
            </div>
            <button onClick={loginHandler}>Login</button>
        </div>
        </>
    )
}

export default Login
