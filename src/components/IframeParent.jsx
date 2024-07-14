import React, { useRef, useEffect, useState } from "react";
export const IframeParent = () => {
  const iFrameRef = useRef(null);
  const [receivedMessage, setReceivedMessage] = useState("");

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      "Hello son!",
      "http://localhost:3000"
    );
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setReceivedMessage("Got this message from child: " + e.data);
    });
  }, []);

  return (
    <div>
      <h1>Parent iFrame</h1>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send message to child
      </button>

      <br />
      <br />

      <iframe
        ref={iFrameRef}
        src="/iframe-child/"
        width="600"
        height="300"
        title="Child iframe"
      ></iframe>

      <p>{receivedMessage}</p>
    </div>
  );
};
