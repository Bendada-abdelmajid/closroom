import React, { useState, useContext } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import GoogleAuth from "../components/GoogleAuth";
import Alert from "../components/Alert";
import Cookies from 'js-cookie';
import { userContext } from "../context/AppProvider";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {IoChevronBack} from "react-icons/io5"

function SingUp() {
  const { setUser, setMsg } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loding, setLoding] = useState(false);


  async function handleSubmit(e) {
    try {

      e.preventDefault();
      setLoding(true)
    const url = `${import.meta.env.VITE_API_URL}/auth/sing-up`;

    const {data} = await axios.post(url,  { username, email, password, confirmPassword });

    if(data.type === "error") {
    
      setMsg({type:"error", content:data.message})
    }
    if(data.user){
      setUser(data.user)
    }
    if(data.token) {
      Cookies.set('auth', data.token, { expires: 7 });
    }
    console.log(data);
    setLoding(false)
    } catch (error) {
      console.log(error)
      setMsg({type:"error", content:"somting went wrong"})
    }
    
  }
  return (
    <div className="auth-cont">
     <Link to="/" className="return-btn center">
    <IoChevronBack/>
    <h4>Back</h4>
    </Link>
   
    <div className="sing-in-cont center">
   
      <div className="sing-in-form" style={{maxWidth:"500px"}}>

        <h1>We're so glad you are here </h1>
        <div className="auth-info ">
          <p>alerdy have an account?</p>
          <Link to="/login">Login</Link>
        </div>
        <GoogleAuth setMsg={setMsg} />
        <div className="or">
          <span>OR continue with email</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`input-cont ${username !="" ? "active" :""} `}>
           
            <input
              id="username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              name="username"
              required
            />
             <label htmlFor="username">Username</label>
          </div>
          <div className={`input-cont ${email !="" ? "active" :""} `}>
            
            <input
              id="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={`input-cont ${password !="" ? "active" :""} `}>
            
            <input
              id="password"
              defaultValue={password}
              onChange={(e) => setPassowrd(e.target.value)}
              name="password"
              type={showPass ? "text": "password"}
              required
            />
            <label htmlFor="password">Passowrd</label>
            <div className="eye-icon" onClick={()=>setShowPass((prev)=>!prev)}>
              {showPass ? <VscEyeClosed  /> : <VscEye /> }
            </div>
          </div>
          <div className={`input-cont ${confirmPassword !="" ? "active" :""} `}>
            
            <input
              id="confirm-password"
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm_password"
              type={showPass2 ? "text": "password"}
              required
            />
            <label htmlFor="confirm-password">Confirm Passowrd</label>
            <div className="eye-icon" onClick={()=>setShowPass2((prev)=>!prev)}>
              {showPass2 ? <VscEyeClosed  /> : <VscEye /> }
            </div>
          </div>
          <button className={`btn ${loding ? "disable": ""}`} type="submit">
          {loding ? <div className="btn-loader"></div> : <span>Create Account</span>}
            
          </button>
        </form>
      </div>
    </div>
   
    </div>
  );
}

export default SingUp;
