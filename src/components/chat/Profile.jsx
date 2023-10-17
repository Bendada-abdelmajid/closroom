import React, { useState , useRef, useContext} from 'react';
import { FaCheck, FaLongArrowAltLeft, FaPencilAlt, FaUser } from 'react-icons/fa'
import {RiCameraLensFill } from 'react-icons/ri'
// import api from "../../api/local";
import { userContext } from '../../context/AppProvider';

export default function Profile({ seeProfile,  setSeeProfile }) {
   
    const { setUser, user, setMsg , api} = useContext(userContext);
    const [editUsername, setEditUsername] = useState(false)

    const userImageRef = useRef();
    const usernameRef = useRef();
 
    function clickImage() {
        userImageRef.current.click();
      }
   
    async function editeProfile(e) {
        e.preventDefault();
        if(usernameRef.current.value !== user.name) {
            const {data} = await api.post(`/users/editUsername/${user._id}`, {username:usernameRef.current.value});
            console.log(data)
          
          setMsg({ type: data.type, content: data.alert })
          
          if(data.user) {
            setUser(data.user)
            
          }
        }
        setEditUsername(false)
       
    }
    async function editImage(e) {
        e.preventDefault();
        const img= userImageRef.current.files[0]
        setUser({...user , image: URL.createObjectURL(img)})
          const Data = new FormData();
      
          Data.append("userImage", img);
          const {data} = await api.post(`/users/editImage/${user._id}`, Data);
          console.log(data)
          setMsg({ type: data.type, content: data.alert })
         
          if(data.user) {
            setUser(data.user)
          } 
    }

  
    return (
        <div className={`Profile ${seeProfile ? "show" : ""}`}>
            <div className="header f-start"><div className="icon" onClick={()=>setSeeProfile(false)}><FaLongArrowAltLeft /></div> Profile</div>
            <div className="info scrollY">
                <div className="s-img center" onClick={clickImage}>
                    {user.image ? <img src={user.image} alt="" />: <FaUser />}
                    <div className="uploade-icon center"> <RiCameraLensFill /></div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={userImageRef}
                        style={{ display: "none" }}
                        onChange={editImage}
                    />
                        
                </div>
                <form onSubmit={editeProfile}>
                    
                    <h4>username:</h4>
                    <div className={`input-box f-start ${editUsername ? "active" : ""}`}>
                        <input type="text" defaultValue={user.username} ref={usernameRef} autoFocus={editUsername }/>
                        <div className="input-icon" >{editUsername ? <FaCheck onClick={editeProfile} /> : <FaPencilAlt onClick={() => { setEditUsername(true) }} />}</div>
                    </div>
            
                </form>
                
            </div>
        </div>
    )
}
