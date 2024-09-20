import React, { useState, useEffect } from "react";
import "../styles/MetaMaskErrModal.css";
import { ReactComponent as Close } from "../assets/CloseX.svg";

function MetaMaskErrModal({ children }) {
  const [errMessage, setErrMessage] = children;
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (errMessage) {
      const splitMessage = errMessage.split("(");
      setDisplayMessage(splitMessage[0]);
    }
  }, [errMessage]);

  const closeModal = () => {
    setErrMessage(null);
  };

  return (
    <div
      className="ErrModal"
      style={{ display: errMessage ? "flex" : "none" }}
    >
      <div className="ErrModal__Content">
        <div className="ErrModal__Exit">
          <Close className="ErrModal__ExitIcon" onClick={closeModal} />
        </div>
        <div className="ErrModal__Message">
          <h1>Error</h1>
          <p>{displayMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default MetaMaskErrModal;
