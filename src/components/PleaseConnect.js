import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/PleaseConnect.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {web3Context} from '../App';
import Web3Modal from "web3modal";
import { Message } from 'semantic-ui-react';
import {ethers} from 'ethers';

let provider = undefined;

function PleaseConnect() {
 
  const data = useContext(web3Context);

  const [chainId, setChainId] = useState(0x0);
  const [address, setAddress] = useState(0x0);


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
    
    web3Modal.clearCachedProvider();
    
    try{
      provider = await web3Modal.connect();
    }
    catch(error){
      provider = undefined;
    }
  
    let web3 = null;
    if(provider){
      web3 = new ethers.providers.Web3Provider(provider);
  
      // Subscribe to provider connection
      provider.on("connect", (info) => {
        console.log(info);
      });
  
      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        console.log(error);
      });
    }
  
    return [provider, web3];
  }
  // useContext(undefined);
  let navigate = useNavigate();

  let header;
  let content;
  if(data.error){
    console.log(data.errorCode);
    if(data.errorCode.localeCompare("setupweb3") == 0){
        header = "No Web3 Instance";
        content = "Please connect a wallet";
        data.error = false;
    }
    else if(data.errorCode.localeCompare("nometamask") == 0){
      header = "No MetaMask";
      content = "There is no Meta Mask wallet in this browser";
    }
  }

  return (
    <div className='PleaseConnect__page'>
      <div className="PleaseConnect__Container">
      <Message hidden={!data.error} error>
        <Message.Header>{header}</Message.Header>
        {content}
      </Message>
        {/* Logo */}
        <Tellor className="PleaseConnect__Swoosh" />

        {/* Bold text */}
        <h1>Please connect your wallet to this page to vote.</h1>
        <h1>Thank you!</h1>

        {/* Choose a wallet */}
        <div className="PleaseConnect__choose_wallet">
          <div className="PleaseConnect__Connect">
            <button onClick={async ()=>{
              [data.provider, data.web3] = await ConnectTrustWallet();
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
              Connect wallet
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

