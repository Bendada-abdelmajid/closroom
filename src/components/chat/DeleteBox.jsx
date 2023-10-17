import React, {useContext} from 'react'
import { useState } from 'react';
// import api from "../../api/local";
import { userContext } from '../../context/AppProvider';

export default function DeleteBox({deleteId, setDeleteId, setGroupData}) {
  const {setMsg, api} = useContext(userContext);
  const [success , setSuccess]= useState(false)
  async function deleteGroup(e) {
    const {data} = await api.post(`/group/delete/${deleteId}`);
    console.log(data)
    
    document.getElementById(deleteId).remove();
    setMsg({ type: data.type, content: data.alert });
    if(data.type ==="success") {
      setSuccess(true);
      setTimeout(() => {
        setDeleteId(null);
        setGroupData(null)
        setSuccess(false);
      }, 5000);
    }
    
  }
  return (
    <>
    <div className={`overlay ${deleteId? "show": ""}`} onClick={()=>setDeleteId(null)}></div>
    <div className={`delete-box popup ${deleteId? "show": ""}`} >
      {success ? <>
        <h4 style={{paddingBottom: "5px", color:"green"}}> group deleted with sucess </h4>
      </> : <>
      <h4>are you sure you want <br/> to delete this group </h4>
        <div className="center btns">
            <button onClick={()=>setDeleteId(null)}>cancel</button>
            <button className='danger' onClick={deleteGroup}>Delete</button>
        </div>
      </>}
        
    </div>
    </>
  )
}

