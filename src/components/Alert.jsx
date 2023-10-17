import React, { useEffect, useContext } from "react";

import { userContext } from "../context/AppProvider";

export default function Alert() {
  const { msg, setMsg }= useContext(userContext)
  useEffect(() => {
    if (msg.content != "") {
        const timer = setTimeout(() => {
        setMsg({ type: "", content: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [msg.content]);

  return (
    <div className={`alert  ${msg.type} ${!msg.content ? "" : "show"}`}>
      <p>{msg.content}</p>
    </div>
  );
}
