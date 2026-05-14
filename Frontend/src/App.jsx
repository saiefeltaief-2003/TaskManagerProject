import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Create from "./pages/task/Create";

const App = () =>
{  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
      if (token)
      {
        navigate("/");
      }
      else
      {
        navigate("/login");
      }
  }, []);


  return (
    <>
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/tasks/create" Component={Create}/>
        <Route path="/" Component={Home}/>
      </Routes>
    </>
  );
}

export default App;
