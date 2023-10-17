import React, {useContext} from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from 'js-cookie';
import { userContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const navigate = useNavigate();
  const { setUser,setMsg , setAuthCookie } = useContext(userContext);
  const responseGoogle = async (response) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/google`;
    console.log(response.credential)
    const {data} = await axios.post(url, { token: response.credential });
   
 
  console.log(data)
  setMsg({ type: data.type, content: data.alert });
    if(data?.user) {
      Cookies.set('auth', data.token, { expires: 7 });
      setAuthCookie(data.token)
      console.log(Cookies.get("auth"))
      setUser(data.user)
      navigate("/")
    }
    console.log(response.credential);
  };

  return (
    <div className="btn_cont">
    <GoogleLogin
     
      onSuccess={responseGoogle}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    </div>
  );
}
