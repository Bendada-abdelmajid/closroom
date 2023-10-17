import React, {useContext} from 'react'
import Cookies from "js-cookie";
import { googleLogout } from '@react-oauth/google';
import { userContext } from '../../context/AppProvider';
export default function LogoutBox({logout, setLogout}) {
    const {setUser} = useContext(userContext);
    function hundelLogout(){
        Cookies.remove('auth');
        googleLogout();
        setUser(null)
      }
  return (
    <>
    <div className={`overlay ${logout? "show": ""}`} onClick={()=>setLogout(false)}></div>
    <div className={`delete-box popup ${logout? "show": ""}`} >
      
      <h4>are you sure you want <br/> to Logout </h4>
        <div className="center btns">
            <button onClick={()=>setLogout(false)}>cancel</button>
            <button className='danger' onClick={hundelLogout}>Logout</button>
        </div>
      
        
    </div>
    </>
  )
}
