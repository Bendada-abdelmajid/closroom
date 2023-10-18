import React, {useContext} from 'react'
import { FaUser, FaLongArrowAltLeft } from "react-icons/fa";

import Audio from "./Audio";
import { AiTwotoneFileText } from "react-icons/ai";
import { chatContext, userContext } from '../../context/AppProvider';

export default function Room() {
const { user } = useContext(userContext);
const { room, allmessages, closeRoom} = useContext(chatContext);
  return (
    <div className="rome">
      <div className="header ">
        <div className="rome-title user f-start">
          <div className="back-btn icone" onClick={closeRoom}>
            <FaLongArrowAltLeft />
          </div>
          <div className="s-img center">
            {room.resiver.image ? (
              <img src={room.resiver.image} alt="" />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="name">{room.resiver.username}</div>
        </div>
      </div>
      <div className="messages scrollY">
        {allmessages.map((m, index) => (
          <div key={index} style={{ position: "relative" }}>
            {m.time && <div className="date">{m.time}</div>}
            {m.messages.map((item) => (
              <div
                className={`message-cont f-start ${
                  item.sender.email === user.email ? "f-end" : ""
                }`}
                key={item.id}
              >
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
                    <img src={item.message} width="250" alt="loding..." />
                  )}
                  {item.type === "audio" && <Audio src={item.message} />}
                  {item.type === "file" && (
                    <a
                      href={item.message}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-snipt center"
                    >
                      <div className="icon">
                        <AiTwotoneFileText />
                      </div>
                      <p>{item.message}</p>
                    </a>
                  )}
                  <small className="temp">{item.createdAt}</small>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
