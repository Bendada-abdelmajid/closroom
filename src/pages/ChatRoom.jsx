import React, { useState, useEffect } from "react";
import SideBar from "../components/chat/SideBar";
import "../css/chatroom.css";
import { chatContext } from "../context/AppProvider";
import Room from "../components/chat/Room";
import GroupRoom from "../components/chat/GroupRoom";
import MessageForm from "../components/chat/MessageForm";
import Pusher from "pusher-js";

export default function ChatRoom() {
  const [allmessages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [groups, setGroups] = useState([]);
  let activeRoom = room || groupData || null;
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_kEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
  
    channel.bind("inserted", function(data) {
      console.log("data")
      console.log(data)
      const message = data.messages[0];
      const roomId = message.room;
      const sender = message.sender;
  
      if (isMatchingRome(roomId)) {
        setMessages([...allmessages, data]);
      }  else if (message.fromFriend && document.getElementById(sender._id)) {
        updateMessageCount(sender._id);
      } else if (message.fromFriend && !document.getElementById(sender._id)) {
        setUsers([...users, sender]);
      } else if (!message.fromFriend && document.getElementById(roomId)) {
        updateMessageCount(roomId);
      }
    });
  
    const isMatchingRome = (id) => {
      return activeRoom && activeRoom.id === id;
    };
    const updateMessageCount = (elementId) => {
      const cont = document.getElementById(elementId);
      const messUC = cont.querySelector(".mess-count");
      messUC.innerHTML = parseInt(messUC.textContent) + 1;
      messUC.classList.remove("hide");
    };
  
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [allmessages]);
  function closeRoom() {
    setRoom(null);
    setGroupData(null);
  }
  return (
    <chatContext.Provider
      value={{
        users,
        setUsers,
        room,
        setRoom,
        groupData,
        setGroupData,
        allmessages,
        setMessages,
        groups,
        setGroups,
        closeRoom,
      }}
    >
      <div className={`body-container ${activeRoom ? "scroll" : ""}`}>
        <SideBar />
        <div>
          {room ? (
            <Room />
          ) : groupData ? (
            <GroupRoom />
          ) : (
            <div className="no-rome center">
              <div>
                <img src="/New team members-pana.svg" alt="" />
                <h3>Close Room</h3>
                <p>
                  Enjoy fast, simple and secure communication that's free*, and
                  available anywhere in the world.
                </p>
              </div>
            </div>
          )}
          <MessageForm
            id={activeRoom?.id}
            isRoom={room ? true : false}
            show={activeRoom ? "show" : ""}
          />
        </div>
      </div>
    </chatContext.Provider>
  );
}
