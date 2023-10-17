import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import GoogleAuth from "../components/GoogleAuth";
import Alert from "../components/Alert";
import { userContext } from "../context/AppProvider";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoChevronBack, IoClose } from "react-icons/io5";


function Login() {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_API_URL);
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState({ type: "", content: "" });
  const [forgetPass, setForgetPass] = useState(false);
  const [forgetPassSuccess, setForgetPassSuccess] = useState(false);
  const [loding, setLoding] = useState(false);
  async function handleSubmit(e) {
    try {
      setLoding(true)
      e.preventDefault();
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const res = await axios.post(url, { email, password });
      console.log(res.data);
      const data = res.data;
      if (data.token) {
        Cookies.set("auth", data.token, { expires: 7 });
        
      }
      setMsg({ type: data.type, content: data.message });
      console.log(res.data);
      if (data.user) {
        setUser(data.user);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      setLoding(false)
    } catch (error) {
      console.log(error);
      alert("sumting went wrong");
    }
  }
  async function forgetPassword(){
    try {
      const url = `${import.meta.env.VITE_API_URL}/users/forget-password`;
      const res = await axios.post(url, {email});
      console.log(res);
      setForgetPassSuccess(true)
     
    } catch (error) {
      console.log(error);
      alert("sumting went wrong");
    }
  }
  return (
    <div className="auth-cont">
      <Link to="/" className="return-btn center">
        <IoChevronBack />
        <h4>Back</h4>
      </Link>
      <div className="sing-in-cont center">
        <div className="sing-in-form">
          {forgetPass ? (
          <>
           {forgetPassSuccess ? <div style={{textAlign:"center"}}>
            <h1 style={{lineHeight:"1.2"}}> An Email sent to your <br /> account please verify</h1>
					<Link to="/">
						<button className="success_btn">verify</button>
					</Link>
           </div> :
            <div>
              
                <button type="button" className="center close-btn" onClick={()=>setForgetPass(false)}>
                  <IoClose/>
                </button>
                <h1> Reset your password</h1>
              
             
              <p className="auth-info "> We will send you an email to reset your password</p>
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
              <button className="btn" type="button" onClick={forgetPassword}>
                sent
              </button>
            </div>
             }
             </>
          ) : (
            <>
              <h1>Welcom back</h1>
              <div className="auth-info ">
                <p>Don't have an account?</p>
                <Link to="/sing-up">Sing Up</Link>
              </div>
              <GoogleAuth setMsg={setMsg}/>

              <div className="or">
                <span>OR continue with email</span>
              </div>
              <form onSubmit={handleSubmit}>
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
                    type={showPass ? "text" : "password"}
                    required
                  />
                  <label htmlFor="password">Passowrd</label>
                  <div
                    className="eye-icon"
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showPass ? <VscEyeClosed /> : <VscEye />}
                  </div>
                </div>
                <button type="button" className="forget-pass" onClick={()=>setForgetPass(true)}>
                  Forget Password ?
                </button>
                <button className={`btn ${loding ? "disable": ""}`} type="submit">
                  {loding ? <div className="btn-loader"></div> : <span>Login</span>}
                 
                  
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Alert msg={msg} setMsg={setMsg} />
    </div>

  );
}
export default Login;
