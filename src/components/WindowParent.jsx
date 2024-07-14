import React, { useEffect, useState } from "react";
export const WindowParent = () => {
  const [receivedMessage, setReceivedMessage] = useState("");

  var childWindow;

  const sendMessage = () => {
    if (!childWindow) return;
    childWindow.postMessage("Hello son!", "http://localhost:3000");
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setReceivedMessage("Got this message from child: " + e.data);
    });
  }, []);

  const openWindow = () => {
    childWindow = window.open(
      "http://localhost:3000/window-child/",
      "childWindow",
      "width=500,height=500"
    );
  };

  return (
    <div>
      <h1>Parent Window</h1>
      <button onClick={openWindow}>Open Window</button>

      <br />
      <br />

      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send message to child
      </button>

      <p>{receivedMessage}</p>
    </div>
  );
};
