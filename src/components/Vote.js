
import React, {useState, useContext} from "react";
//Router
import { BrowserRouter as Router, useNavigate, Navigate } from "react-router-dom";
//Components
import Footer from "./Footer";
import Nav from "./Nav";
import Hero from "./Hero";
import {ethers} from 'ethers';

//Context
import { web3Context } from "../App";

function Vote(){

    const data = useContext(web3Context)

    const [chainId, setChainId] = useState(`0x${data.chainId.toString(16)}`);
    const [address, setAddress] = useState(data.address);
    const [signer, setSigner] = useState(data.signer);
    
    const navigate = useNavigate();

    if(data === null || data.web3 === null || data.web3 === undefined){
        data.error = true;
        data.errorCode = 'setupweb3';
        return (
            <Navigate replace to='/'/>
        );
    }
    else{      

        data.web3.getNetwork().then((network)=>{
            console.log(`inside: ${network.chainId}`);
        })

        data.provider.on("chainChanged", (chainid) => {
            window.location.reload();
        });
        
        data.provider.on("accountsChanged", (account) => {
            window.location.reload();
        });

        data.provider.on("disconnect", (account) => {
            window.location.reload();
        });
        
        console.log(`Address: ${address}`);

        return (
        <div className="App">
            <Nav currAddr={address} chainId={chainId} />
            <Hero currAddr={address} signer={signer} />
            <Footer />
        </div>
        );
    }


}

export default Vote;
