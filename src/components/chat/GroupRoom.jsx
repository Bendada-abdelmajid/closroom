import React, { useContext ,  useState, useEffect, useRef} from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLongArrowAltLeft, FaUser } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";

import Audio from "./Audio";
import {
  AiOutlineClose,
  AiOutlineMessage,
  AiTwotoneFileText,
} from "react-icons/ai";
// import api from "../../api/local";
import { chatContext, userContext } from "../../context/AppProvider";
import { FiChevronDown } from "react-icons/fi";
import DeleteBox from "./DeleteBox";


export default function GroupRoom() {
  const { user , setMsg, api} = useContext(userContext);
  const { groupData, allmessages, setGroupData, closeRoom} = useContext(chatContext);
  const [isParticipant, setIsParticipant] = useState(groupData.isParticipant);
  const [smedai, setSmedai] = useState(false);
  const [audioSrc, setAudioSrc]= useState(null)
  const [deleteId, setDeleteId]= useState(null)
 
  const lastMsg= useRef()
  const group = groupData.group;
  const media= groupData.media;
  const groupUsers = groupData.users;
  const creater = groupData.creater;
  const isAdmin = groupData.isAdmin;
  useEffect(()=> {
    if(lastMsg.current) {
      lastMsg.current.scrollIntoView({smooth:true})
    }
  }, [])

  
  

  function showmenu(e) {
    e.target.classList.toggle("active");
    document.querySelector(".mini-menu").classList.toggle("active");
  }
  function navigate(e) {
    // setmedai(e.target.id)
    document.querySelector(".medai .nav li.active").classList.remove("active");
    e.target.classList.add("active");
    document.querySelector('.medai .slide').style =`transform: translateX(${ -100 * parseInt(e.target.id) }%)`
   
  }

  function showDetail(e) {
    setSmedai(false);
    document.querySelector(".body-container").classList.add("showDetail");
  }
  function showMedai(e) {
    setSmedai(true);
    document.querySelector(".body-container").classList.add("showDetail");
  }
  function hideDetail(e) {
    document.querySelector(".body-container").classList.remove("showDetail");
  }
  async function join() {
    alert("clicked")
    const {data} = await api.post(`/group/join/${groupData.id}`);
    console.log(data)
    setMsg({ type: data.type, content: data.alert });
    setIsParticipant(data.joind);
  }
 
  async function exit(e) {
    const id = e.target.dataset.userId;
    const {data} = await api.post(`/group/exit/${groupData.id}/${id}`);
    console.log(data)
    setMsg({ type: data.type, content: data.alert });
    setIsParticipant(data.joind);

  }
  return (
    <>
      {!isParticipant ? (
        <div className="joingroup center">
          <div className="s-img center">
            <img src={group.image} alt="loding..." />
          </div>
          <h3 className="name">{group.title}</h3>
          <h4> by {creater.username}</h4>
          <p>{group.description}</p>
          <div className="center" style={{gap:"15px"}}>
          <button className="main-btn" onClick={join}>Join now </button>
          <div className="back-btn icon" onClick={closeRoom}> cancel</div>
          </div>
          
        </div>
      ) : (
        <div className="rome-cont">
          <div className="rome">
            <div className="header space-b">
              <div className="rome-title user f-start">
                <div className="back-btn icon" onClick={closeRoom}>
                  <FaLongArrowAltLeft />{" "}
                </div>
                <div className="s-img center" onClick={showDetail}>
                  <img src={group.image} alt="loding..." />
                </div>
                <div className="name">{group.title}</div>
              </div>
              <div className="icon" onClick={showmenu}>
                <BsThreeDotsVertical />
                <div className="mini-menu">
                  <div className="link" onClick={showDetail}>
                    Group info
                  </div>
                  <div className="link" onClick={showMedai}>
                    Group media
                  </div>
                  {isAdmin ? (
                    <div className="link" onClick={()=>setDeleteId(groupData.id)}>
                      Delete group
                    </div>
                  ) : (
                    <div
                      className="link"
                      data-user-id={user._id}
                      onClick={exit}
                    >
                      Exit group
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="messages scrollY">
         
              {allmessages.map((m, index) => (
                <div key={index} style={{ position: "relative" }}>

                  <div className="date">{m.time}</div>
                  
                  {m.messages.map((item) => ( 
                  item.message &&
                    <div
                      className={`message-cont f-start ${ item.sender.email === user.email ? "f-end" : "" }`} key={item.id}
                    >
                      {item.sender.email !== user.email && (
                        <div className="s-img">
                          <img src={item.sender.image} alt="loding..." />
                        </div>
                      )}

                      <div className={`message ${item.type} `}>
                        {item.sender.email === user.email ? (
                          <svg
                            viewBox="0 0 8 13"
                            width="8"
                            height="13"
                            className="tringel"
                          >
                            <path
                              opacity=".13"
                              d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
                            ></path>
                            <path
                              fill="currentColor"
                              d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 8 13"
                            width="8"
                            height="13"
                            className="tringel"
                          >
                            <path
                              opacity=".13"
                              fill="#0000000"
                              d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
                            ></path>
                            <path
                              fill="currentColor"
                              d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
                            ></path>
                          </svg>
                        )}

                        {item.type === "string" && <p>{item.message}</p>}
                        {item.type === "image" && (
                          <img src={item.message} alt="loding..." width="250" />
                        )}
                        {item.type === "audio" && <Audio src={item.message} />}
                        {item.type === "file" && (
                          <a
                            href={item.message}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-snipt f-start"
                          >
                            <div className="icon">
                              <AiTwotoneFileText />
                            </div>
                            <p>
                              {item.message}
                            </p>
                          </a>
                        )}
                        <small className="temp">{item.createdAt}</small>
                      </div>
                    </div>
                        ))}
                </div>
              ))}
              </div>
             <div ref={lastMsg}></div>
          </div>
          <div className="group-detail">
          <div className="group-detail-content">
            <div className="space-b header">
              <h5>Group {smedai ?"media ":  "info"} </h5>
              <div className="icon close" onClick={hideDetail}>
                <AiOutlineClose />
              </div>
            </div>
            {smedai ? (
              <div  className="medai">
                <ul className="nav center">
                  <li onClick={navigate} className="nav-link active" id="0">
                    files
                  </li>
                  <li className="border"></li>
                  <li onClick={navigate} className="nav-link" id="1">
                    Images
                  </li>
                  <li className="border"></li>
                  <li onClick={navigate} className="nav-link" id="2">
                    Audios
                  </li>
                </ul>
                <div >
                <div  className="slide">
                  {media.map((m, index) => (
                    <div className='col scrollY' key={index}>
                    {m.map((f, index) => (
                      <>
                      <div className="date">{f.time}</div>
                      <div className="cont">
                      {f.messages.map((item) => (
                      item.message &&
                        <>
                        {item.type === "image" && (
                          <img src={item.message} alt="loding..."/>
                        )}
                        {item.type === "audio" && <div onClick={()=>setAudioSrc(item.message)} className={`audio-card ${audioSrc == item.message ? "active":"" } center`}><IoHeadset/></div>}
                        {item.type === "file" && (
                          <a
                            href={item.message}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-snipt f-start"
                          >
                            <div className="icon">
                              <AiTwotoneFileText />
                            </div>
                            <p>
                              {item.message}
                            </p>
                          </a>
                        )}
                        </>
                        
                      ))}
                      </div>
                      </>
                    ))}
                    {index == 2 && 
                    <div className={`audio-cont ${audioSrc ? "show":"" }  space-b`}>
                    {audioSrc && <Audio src={audioSrc} />}
                    <div className="icon" onClick={()=>setAudioSrc(null)}>
                    <FiChevronDown/> </div> </div>}
                    </div>
                  ))}
                </div>
                </div>
              </div>
            ) : (
              <div>
                
                <p style={{padding:"15px", fontSize:"14px"}}>{group.description}</p>
                <div style={{margin:"15px 0",background:"var(--header-bg)", padding:"15px", fontSize:"14px"}}>{groupUsers.length} participants</div >
                <div className="list scrollY">
                <div className="link f-start">
                  <div className="s-img center">
                    {creater.image ? (
                      <img src={creater.image} alt="loding..." />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="info space-b">
                    <h4>{creater.username}</h4>
                    <small className="admin">Admin</small>
                  </div>
                </div>
                  {groupUsers.map((item) => (
                    <div className="link f-start" key={item._id} id={item._id}>
                      <div className="s-img center">
                        {item.image ? (
                          <img src={item.image} alt="loding..." />
                        ) : (
                          <FaUser />
                        )}
                      </div>
                      <div className="info space-b">
                        <h4>{item.username}</h4>
                        <small className="icon">
                          <AiOutlineMessage />
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
          <DeleteBox  deleteId={ deleteId} setDeleteId={setDeleteId}  setGroupData={setGroupData}/>
        </div>
      )}
    </>
  );
}
