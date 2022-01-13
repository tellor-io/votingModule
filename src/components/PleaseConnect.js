import React from "react";
import "../styles/PleaseConnect.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";

function PleaseConnect() {
  const connectMetaMask = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.location.reload();
  };

  return (
    <div className="PleaseConnect__Container">
      <Tellor className="PleaseConnect__Swoosh" />
      <h1>Please connect your MetaMask wallet to this page to vote.</h1>
      <h1>Thank you!</h1>
      <div className="PleaseConnect__Connect">
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      </div>
      <div className="PleaseConnect__MetaMask">
        <p>
          If you don't have MetaMask currently installed as a browser extension,{" "}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="PleaseConnect__MetaMaskLink"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}

export default PleaseConnect;
