import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Home from "./pages/Home";

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
        <Route path="/" Component={Home}/>
      </Routes>
    </>
  );
}

export default App;
