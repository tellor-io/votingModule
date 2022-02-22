import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/PleaseConnect.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import {Moral} from 'react-moralis'
import WalletConnectProvider from "@walletconnect/web3-provider";
import sdf from '@metamask/detect-provider'

import {web3Context} from '../App';

import Web3Modal from "web3modal";

import { Message } from 'semantic-ui-react';

import {ethers} from 'ethers';

let provider = undefined;

const ConnectMetaMask = async ()=>{

    let web3;

    if(window.ethereum !== null){

      web3 = new ethers.providers.Web3Provider(window.ethereum);
    }
    else{
      web3 = null;
    }

    console.log(`Web3:${web3}`);


    return web3;

}

const ConnectTrustWallet = async ()=>{
  

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

  let web3 = null;
  if(provider){
    web3 = new ethers.providers.Web3Provider(provider);

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

  return web3;
}

function PleaseConnect() {
 
  // useContext(undefined);
  let navigate = useNavigate();

  const data = useContext(web3Context);

  const provider2 = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
  );

  let signer = provider2.getSigner();
  console.log(Object.keys(signer));
  console.log(Object.values(signer));

  

  return (
    <div className='PleaseConnect__page'>
      <div className="PleaseConnect__Container">
      <Message hidden={!data.error} error>
        <Message.Header>No MetaMask</Message.Header>
        There is no Meta Mask wallet in this browser
      </Message>
        {/* Logo */}
        <Tellor className="PleaseConnect__Swoosh" />

        {/* Bold text */}
        <h1>Please connect your wallet to this page to vote.</h1>
        <h1>Thank you!</h1>

        {/* Choose a wallet */}
        <div className="PleaseConnect__choose_wallet">
          <div className="PleaseConnect__Connect">
            <button onClick={async () => {
              data.web3 = await ConnectMetaMask();
              if(data.web3 === null){
                console.log('NULL!');
                data.error = true;
                navigate('/');
                return;
              }

              let accounts = await data.web3.listAccounts();
              data.address = accounts[0];
              let network = await data.web3.getNetwork();
              data.chainId = network.chainId;
              data.signer = data.web3.getSigner();
              console.log(`Address:${data.address}, Chain:${data.chainId}`);
              navigate('/vote');
            }}>
              Connect to MetaMask
            </button>
          </div>
          <div className="PleaseConnect__seperator">
            <div className="PleaseConnect__line"></div>
            <label className="PleaseConnect__seperator_text">or</label>
            <div className="PleaseConnect__line"></div>
          </div>
          <div className="PleaseConnect__Connect">
            <button onClick={async ()=>{
              data.web3 = await ConnectTrustWallet();
              if(data.web3 === null){
                data.error = false;
                navigate('/');
                return;
              }

              let accounts = await data.web3.listAccounts();
              data.address = accounts[0];
              let network = await data.web3.getNetwork();
              data.chainId = network.chainId;
              data.signer = data.web3.getSigner();              
              navigate('/vote');
            }}>
              Connect to Trusr wallet
            </button>
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
