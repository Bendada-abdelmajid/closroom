import React , {useContext, useState} from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut , FiPlus} from "react-icons/fi";
import { userContext } from "../../context/AppProvider";

import Users from "./Users";
import Groups from "./Groups";
import CreateGroup from "./CreateGroup";
import Profile from "./Profile";
import LogoutBox from "./LogoutBox";

export default function SideBar() {
    const { user, setUser } = useContext(userContext);
    const [openGroupeForm , setOpenGroupeForm]=useState(false)
    const [swip, setSwip]=useState("0")
   
    const [seeProfile , setSeeProfile]=useState(false)
    const [logout , setLogout]=useState(false)
    
      
  return (
  
    <div className='side-bar'>
        <div className="header space-b">
        <div className="s-img center" onClick={()=>{setSeeProfile(true)}}>
         
          {user?.image ? <img src={user.image} alt="" /> : <FaUser/> }
          
        </div>
       
        <div className="center">
          <div className="add-btn icon" onClick={()=>{setOpenGroupeForm(true)}}>
          <FiPlus />
          </div>
          <div className="logeout-btn icon" onClick={()=>setLogout(true)}>
            <FiLogOut />
          </div>
        </div>
      </div>
      <div className="romes">
      <ul className="open-rooms nav center" >
       <li  className="nav-link active" onClick={()=>setSwip("0")}>Friends</li>
       <li className="border"></li>
       <li  className="nav-link" onClick={()=>setSwip("-100%")}>Romes</li>
      </ul>
      <div className="slide" style={{transform:`translateX(${swip})`}}>
    
        <Users  />
        <Groups />
      </div>
      </div>
      <Profile seeProfile={seeProfile}  setSeeProfile={setSeeProfile}/>
      <CreateGroup openGroupeForm={openGroupeForm }  setOpenGroupeForm={setOpenGroupeForm}/>
      <LogoutBox logout={logout}  setLogout={setLogout} />
    </div>
 
  )
}
