import React, { useContext, useRef, useState, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { chatContext, userContext } from "../../context/AppProvider";
// import api from "../../api/local";

export default function Groups() {
  const { setGroupData, setRoom, groups, setGroups, setMessages } =
    useContext(chatContext);
  const { api} = useContext(userContext);
  const [q, setQ] = useState("myGroups");
  const [active, setActive] = useState(null);
  const input = useRef();
  useEffect(() => {
    const fetchdata = async () => {
      const responce = await api.get(`/group/search/${q}`);
      setGroups(responce.data.Groups);
    };
    fetchdata();
  }, [q]);
  function search() {
    const value = input.current.value;
    if (value.length > 0) {
      setQ(value);
    } else {
      setQ("myGroups");
    }
  }

  async function openGroup(e) {
    setMessages([]);
    setRoom(null);
    const id = e.target.id;
    setActive(id);
    const {data} = await api.get(`/group/` + id);
    console.log(data)
    setGroupData(data);
    setMessages(data.allmessages);
  }
  return (
    <div className="col">
      <div className="search-bar center">
        <input
          type="text"
          placeholder="Search for group"
          ref={input}
          onChange={search}
        />
        <button type="button">
          <FaSearch />
        </button>
      </div>
      <div className="list scrollY">
        {groups.map((item) => (
          <div
            className={`link f-start ${active === item._id ? "active" : ""} `}
            key={item._id}
            id={item._id}
            onClick={openGroup}
          >
            <div className="s-img center">
              <img src={item.image} alt="" />
            </div>
            <div className="info space-b">
              <h4>{item.title}</h4>
              <small className="mess-count center hide">0</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
