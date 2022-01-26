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
    <div className='PleaseConnect__page'>

      <div className="PleaseConnect__Container">
      
        {/* Logo */}
        <Tellor className="PleaseConnect__Swoosh" />

        {/* Bold text */}
        <h1>Please connect your wallet to this page to vote.</h1>
        <h1>Thank you!</h1>

        {/* Choose a wallet */}
        <div className="PleaseConnect__choose_wallet">
          <div className="PleaseConnect__Connect">
            <button onClick={connectMetaMask}>Connect to MetaMask</button>
          </div>
          <div className="PleaseConnect__seperator">
            <div className="PleaseConnect__line"></div>
            <label className="PleaseConnect__seperator_text">or</label>
            <div className="PleaseConnect__line"></div>
          </div>
          <div className="PleaseConnect__Connect">
            <button onClick={connectMetaMask}>Connect to Trusr wallet</button>
          </div>
        </div>
        
        {/* Suggestion for a wallet */}
        <div className="PleaseConnect__MetaMask">
          <p>
            If you don't have a wallet currently, we suggest you to install MetaMask as a browser extension,{" "}
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
    </div>
  );
}

export default PleaseConnect;
