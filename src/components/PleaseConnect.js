import React from "react";
import "../styles/PleaseConnect.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import {Moral} from 'react-moralis'
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = undefined;

const connectMetaMask = async ({web3})=>{

}

const connectTrustWallet = async ({web3})=>{
  
  console.log("Hello");

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "c520d3ab5dfc483e90822fbdfd707bf3" // required
      }
    } 
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });
  
  
  try{
    provider = await web3Modal.connect();
  }
  catch(error){
    provider = undefined;
  }

  if(provider){
    const web3 = new Web3(provider);
    console.log(web3);

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log(error);
    });
  }
}

function PleaseConnect() {
 
  // useContext(undefined);

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
            <button onClick={connectTrustWallet}>Connect to Trusr wallet</button>
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
