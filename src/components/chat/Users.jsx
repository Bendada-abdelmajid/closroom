import Cookies from 'js-cookie';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa';
import { chatContext, userContext } from '../../context/AppProvider';
// import api from "../../api/local";

export default function Users() {
  const { api} = useContext(userContext);
    const { users, setUsers, setRoom, setGroupData, setMessages} = useContext(chatContext);
    const [q, setQ]= useState("friends")
    const [active, setActive]= useState(null)
    const input=useRef()
   
    useEffect(() => {
      const fetchdata = async () => {
        console.log("hu")
        const res = await api.get(`/users/search/${q}`);
        console.log(res)
        setUsers(res.data.users);
      }
      return () => {
        fetchdata()
      }
    },[q])
    
    function search(){
        const value = input.current.value;
        if(value.length > 0) {
        setQ(value)
        } else {
            setQ("myGroups")
        }
        
      }
    async function openRoom(e){
        setMessages([])
        setGroupData(null);
        const id = e.target.id
        setActive(id)
        const {data} = await api.get(`/room/`+id );
        console.log(data)
        setRoom(data);
        setMessages(data.allmessages)
        const mesN=e.target.querySelector(".mess-count")
        mesN.innerHTML=0
        mesN.classList.add('hide')
      }
  return (
    <div className='col'>
    <div className="search-bar center">
          <input type="text" placeholder="search for Friend" ref={input} onChange={search}/>
          <button type="button">
          <FaSearch />
          </button>
        </div>
        <div className="list users scrollY">
          {users.map((item) => (
            <div className={`link f-start ${active === item.id ? "active" : "" } `} key={item._id || item.id} id={item._id || item.id} onClick={openRoom}>
              <div className="s-img center">
              {item.image ? <img src={item.image} alt="" /> : <FaUser/>}
              </div>
              <div className="info space-b">
                <h4>{item.username}</h4>
              
                <div className="mess-count center hide">0</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
