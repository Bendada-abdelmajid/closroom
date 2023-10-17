import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import axios from "axios";
import Cookies from "js-cookie";
import { userContext } from "./context/AppProvider";

import EmailVerify from "./pages/EmailVerify";
import PasswordReset from "./pages/PasswordReset";
import ChatRoom from "./pages/ChatRoom";
import Alert from "./components/Alert";
import LodingBage from "./components/LodingBage";
import "./css/App.css";
import NotFound from "./pages/NotFound";
function App() {
  const [loding, setLoding] = useState(true);
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState({ type: "", content: "" });

  const [authCookie, setAuthCookie] = useState('');

  const getUser = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/current-user`;
    const token = Cookies.get("auth");

    setAuthCookie(token);
    if(token){
      const res = await axios.post(url, { token: token });
    console.log(res);
    const data = res.data;
    setUser(data.user);
    
    }  
    setLoding(false);
  };

  useEffect(() => {
    getUser();
  }, []);
   
  const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
    headers: {'authorization': "Bearer " + (authCookie || "")}
})
  const Verify= ()=>{
    return (<div className="success_cont">
    <h1>
      An Email sent to your <br /> account please verify
    </h1>
    <a href="https://mail.google.com/" target="_blank">
      <button className="success_btn">verify</button>
    </a>
  </div>)
  }

  if (loding) {
    return <LodingBage/>;
   }
   console.log(loding)
   console.log(user)
  
  return (
    <>
      <userContext.Provider value={{ user, setUser, msg, setMsg, authCookie, setAuthCookie, api }}>
        <Routes>
          <Route path="/" element={user ? (user.verified ? <ChatRoom /> : <Verify />) : <Home /> } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/sing-up" element={user ? <Navigate to="/" /> : <SingUp />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/users/:id/reset-password/:token" element={user ? <Navigate to="/" /> : <PasswordReset />} />
          <Route path="*"element={<NotFound/> }/>
        </Routes>
        <Alert jmsg={msg } setMsg={setMsg} />
      </userContext.Provider>
    </>
  );
}

export default App;
