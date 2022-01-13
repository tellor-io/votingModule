import React, { useState, useEffect } from "react";
import "../styles/MetaMaskErrModal.css";
import { ReactComponent as Close } from "../assets/CloseX.svg";

function MetaMaskErrModal({ children }) {
  //Component State
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (children[0] && children[0].length > 92) {
      let string = children[0].split("{")[1];
      let string2 = string.split(":");
      let string3 = string2[3].split(",");
      let reason = string3[0].replace(/["']/gm, "");
      let reverted = string2[2].replace(/["']/gm, "");
      let final =
        reverted.charAt(0).toUpperCase() +
        reverted.slice(1) +
        ":" +
        reason +
        ".";
      setErrorMessage(final);
    } else if (children[0] && children[0].length === 92) {
      setErrorMessage(children[0]);
    } else if (children[0] && children[0].length === 57) {
      setErrorMessage(children[0]);
    }
    return () => {
      setErrorMessage("");
    };
  }, [children]);

  //Helpers
  const closeModal = () => {
    children[1](null);
    document.querySelector(".ErrModal").style.display = "none";
  };

  return (
    <div
      className="ErrModal"
      style={{ display: errorMessage ? "flex" : "none" }}
    >
      <div className="ErrModal__Content">
        <div className="ErrModal__Exit">
          <Close className="ErrModal__ExitIcon" onClick={closeModal} />
        </div>
        <div className="ErrModal__Message">
          <h1>Oops!</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default MetaMaskErrModal;
