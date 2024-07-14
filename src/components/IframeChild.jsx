import React, { useEffect, useState } from "react";
export const IframeChild = () => {
  const [receivedMessage, setReceivedMessage] = useState("");

  const sendMessage = () => {
    window.parent.postMessage("Hi dad!", "http://localhost:3000");
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setReceivedMessage("Got this message from parent: " + e.data);
    });
  }, []);

  return (
    <div>
      <h2>Child iFrame</h2>
      <button onClick={sendMessage}>Send message to parent</button>
      <p>{receivedMessage}</p>
    </div>
  );
};
