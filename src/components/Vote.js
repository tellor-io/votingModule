
import React, { useState, useContext, useEffect } from "react";
//Router
import { BrowserRouter as Router, useNavigate, Navigate } from "react-router-dom";
//Components
import Footer from "./Footer";
import Nav from "./Nav";
import Hero from "./Hero";

//Context
import { web3Context } from "../App";


function Vote(){
    
    const navigate = useNavigate();
    const data = useContext(web3Context)

    console.log(`Data: ${Object.values(data)}`);
    
    // useEffect(()=>{
    //      console.log("inside effect");
    //     if(data === null || data.web3 === null || data.web3 === undefined){
    //         data.error = true;
    //         data.errorCode = 'setupweb3';
    //         navigate('/');
    //         return;
    //     }
    // }, []);
    
    //Component State
    // const [currAddr, setCurrAddr] = useState("");
    // const [signer, setSigner] = useState({});
    //Context
    // const data = useContext(AppContext);
    //Globals

    //Listening for changes in ChainId (Mainnet/Rinkeby/Others)
    // window.ethereum.on("chainChanged", (data) => {
    //     window.location.reload();
    // });

    console.log("Found Ethereum");

    //Listening for changes in Metamask Accounts
    // window.ethereum.on("accountsChanged", (accounts) => {
    //     setCurrAddr(ethers.utils.getAddress(accounts[0]));
    //     const signerFromProvider = data.provider.getSigner();
    //     setSigner(signerFromProvider);
    // });

    // currAddr = 0;
    // signer = 0;
    if(data === null || data.web3 === null || data.web3 === undefined){
        data.error = true;
        data.errorCode = 'setupweb3';
        return (
            <Navigate replace to='/'/>
        );
    }
    else{      
        return (
        <div className="App">
            <Nav currAddr={data.address} />
            <Hero currAddr={data.address} signer={data.signer} />
            <Footer />
        </div>
        );
    }


}

export default Vote;
