import React, { useEffect, useState } from "react";
export const WindowChild = () => {
  const [receiveMessage, setReceivedMessage] = useState("");

  const sendMessage = () => {
    window.opener.postMessage("Hi dad!", "http://localhost:3000");
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setReceivedMessage("Got this message from parent: " + e.data);
    });
  }, []);

  return (
    <div>
      <h2>Child Window</h2>
      <button onClick={sendMessage}>Send message to parent</button>
      <p>{receiveMessage}</p>
    </div>
  );
};
