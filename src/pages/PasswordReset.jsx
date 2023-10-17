import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";

function PasswordReset() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [msg, setMsg] = useState({ type: "", content: "" });
  const [validUrl, setValidUrl] = useState(false);
	const param = useParams();
	const verifyEmailUrl = async () => {
		try {
			const url = `${import.meta.env.VITE_API_URL}/users/${param.id}/reset-password/${param.token}`;
			const { data } = await axios.get(url);
			console.log(data);
            if(data.access){
                setValidUrl(true);
                setName(data.name)
            }
			
		} catch (error) {
			console.log(error);
			setValidUrl(false);
		}
	};
	useEffect(() => {
		verifyEmailUrl();
	}, [param]);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const url = `${import.meta.env.VITE_API_URL}/users/${param.id}/reset-password/${param.token}`;
      const data = { password, confirmPassword };
      const res = await axios.post(url, data);
      const resData = res.data;
      if (resData.type === "success") {
        setTimeout(() => {
            navigate("/login");
          }, 1500);
      } 
      
        setMsg({ type: resData.type, content: resData.message });
     
      
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg({ type: "error", content: "somting went wrong" });
    }
  }
  if (!validUrl) return(<h1>404 Not Found</h1>)
  return (
    <>
      <Link to="/" className="back-btn center">
        <IoChevronBack />
        <h4>Back</h4>
      </Link>

      <div className="sing-in-cont center">
        <form
          onSubmit={handleSubmit}
          className="sing-in-form"
        >
          <h4 style={{ fontSize: "14px", color:"#444" }}>Hi {name} </h4>

          <h1 style={{lineHeight:"1.4",fontSize:"20px", textTransform:"uppercase", margin:"5px 0 30px"}}>
            Enter your new password twice to make sure you type it
            correctly.
          </h1>
          <div className="input-cont">
            <input
              id="password"
              defaultValue={password}
              onChange={(e) => setPassowrd(e.target.value)}
              name="password"
              type={showPass ? "text" : "password"}
              required
            />
            <label htmlFor="password">New Passowrd</label>
            <div
              className="eye-icon"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <VscEyeClosed /> : <VscEye />}
            </div>
          </div>
          <div className="input-cont">
            <input
              id="confirm-password"
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm_password"
              type={showPass2 ? "text" : "password"}
              required
            />
            <label htmlFor="confirm-password">Confirm Passowrd</label>
            <div
              className="eye-icon"
              onClick={() => setShowPass2((prev) => !prev)}
            >
              {showPass2 ? <VscEyeClosed /> : <VscEye />}
            </div>
          </div>
          <button className="btn" type="submit">
            Create Account
          </button>
        </form>
      </div>
      <Alert msg={msg} setMsg={setMsg} />
    </>
  );
}

export default PasswordReset;
