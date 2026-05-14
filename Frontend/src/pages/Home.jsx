import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("token");
        console.log("Log out");
        navigate("/login");
    }

    return (
        <>
            <div>
                <h1>Home Page</h1>
                <h2>Welcome</h2>
                <button onClick={logoutHandler}>Log Out</button>
            </div>
        </>
    )
}

export default Home