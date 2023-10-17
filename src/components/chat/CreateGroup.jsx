import React, { useState, useRef, useContext } from "react";
import { FaBullseye, FaCloudUploadAlt, FaLongArrowAltLeft } from "react-icons/fa";
import { chatContext, userContext } from "../../context/AppProvider";
// import api from "../../api/local";
import { AiOutlineClose } from "react-icons/ai";
export default function CreateGroup({ openGroupeForm, setOpenGroupeForm }) {
  const { groups, setGroups } = useContext(chatContext);
  const { api, setMsg} = useContext(userContext);
  const [image, setImage] = useState("");
  const [loding, setLoding] = useState(false);
  const imageRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  function clickImage() {
    imageRef.current.click();
  }
  function cahngeImage() {
    const url = URL.createObjectURL(imageRef.current.files[0]);
    setImage(url);
  }
  async function createGroupe(e) {
    e.preventDefault();
    setLoding(true)
    if (image.length > 0) {
      const Data = new FormData();

      Data.append("title", titleRef.current.value);
      Data.append("description", descRef.current.value);
      Data.append("image", imageRef.current.files[0]);
      const {data} = await api.post("/group/new", Data);
      setLoding(false)
      setMsg({type:data.type, content:data.alert})

      if (data.group) {
        setGroups([...groups, data.group]);
      }
      setTimeout(() => {
        setOpenGroupeForm(false);
      }, 2000);
    } else {
     
      setMsg({type:"error", content:"pleas uploade image"})
      setTimeout(() => {
        setAlert([]);
      }, 2000);
    }
  }
 
  return (
    <div className={`group-form ${openGroupeForm ? "show": ""}`} >
      <div className="header space-b">
        <h4>Create Groupe</h4>
        <div className="icon" onClick={()=>setOpenGroupeForm(false)}>
          <AiOutlineClose />
        </div>
      </div>
      <form onSubmit={createGroupe}>
      <div className="img-box" onClick={clickImage}>
        {image !== "" ? (
          <img src={image} alt="uploded... " />
        ) : (
          <div className="uploade-icon center">
            <FaCloudUploadAlt />
            <p>Upload Image</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={cahngeImage}
        />
      </div>
      <div className="form-controll">
      <label htmlFor="title">Title :</label>
        <input type="text" id="title" ref={titleRef} required />
        
      </div>
      <div className="form-controll">
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          cols="6"
          rows="3"
          required
          ref={descRef}
        ></textarea>
      </div>
      <button type="submit" className={`btn ${loding ? "disable": ""}`}>
      {loding ? <div className="btn-loader"></div> : <span>Add</span>}
      </button>
      </form>
    </div>
  );
}
