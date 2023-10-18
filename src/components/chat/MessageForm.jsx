import React, { useRef, useContext } from "react";
import { FiSmile } from "react-icons/fi";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { AiTwotoneFileText } from "react-icons/ai";
import { IoHeadset, IoImageSharp } from "react-icons/io5";
// import api from "../../api/local";

import EmojiPicker from "emoji-picker-react";
import { userContext } from "../../context/AppProvider";

export default function MessageForm({ id, isRoom, show }) {
  const { api} = useContext(userContext);
  console.log(id)
  console.log("isRoom: " + isRoom)
  function showIcons() {
    document.querySelector(".icons-list").classList.toggle("show");
  }
  const messRef = useRef();
  const imageRef = useRef();
  const fileRef = useRef();
  const audioRef = useRef();


  async function sentMessage(e) {
    e.preventDefault();
    const Data = {
      file: "",
      mess: messRef.current.value,
      isRoom,
      type: "string",
    };
    
    await api.post(`/message/new/${id}`, Data);
    messRef.current.value = "";
  }
  async function sentficher(e) {
    e.preventDefault();
    alert(id)
    let type = null;
    let mes = null;
    if (imageRef.current.files[0]) {
      mes = imageRef.current.files[0];
      type = "image";
    } else if (fileRef.current.files[0]) {
      mes = fileRef.current.files[0];
      type = "file";
    } else if (audioRef.current.files[0]) {
      mes = audioRef.current.files[0];
      type = "audio";
    }
    const Data = new FormData();
    Data.append("mess", "");
    Data.append("isRoom", isRoom);
    Data.append("type", type);
    Data.append("file", mes);
    
    await api.post(`/message/new/${id}`, Data);
    messRef.current.value = "";
    imageRef.current.value = "";
    fileRef.current.value = "";
    audioRef.current.value = "";
  }
  function showEmojis() {
    document.querySelector(".body-container").classList.toggle("showemojis");
  }

  const onEmojiClick = (emojiData, event) => {
    messRef.current.value += emojiData.emoji + " ";
  };

  return (
    <div className={`footer rome-cont ${show}`}>
      <div>
       <div className="emoji-picker">
       {/* <EmojiPicker width="100%" onEmojiClick={onEmojiClick} previewConfig={{showPreview:false}} lazyLoadEmojis={true} skinTonesDisabled={true} />  */}
        </div>
        <div className="center header">
          <div className="icon smile" id="emojis" onClick={showEmojis}>
            <FiSmile />
          </div>
          <div className="icons">
            <div className="icon" id="attchment" onClick={showIcons}>
              <IoIosAttach />
            </div>
            <div className="icons-list">
              <div
                className="icon center"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                <IoImageSharp />
              </div>
              <div
                className="icon center "
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <AiTwotoneFileText />{" "}
              </div>
              <div
                className="icon center"
                onClick={() => {
                  audioRef.current.click();
                }}
              >
                <IoHeadset />
              </div>
            </div>
          </div>
          <form className="sentForm center" onSubmit={sentMessage}>
            <textarea
              placeholder="Tapez un message"
              row="1"
              ref={messRef}
            ></textarea>

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <input
              type="file"
              accept="file/*"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <input
              type="file"
              accept="audio/*"
              ref={audioRef}
              style={{ display: "none" }}
              onChange={sentficher}
            />
            <button type="submit" className="icon">
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}
