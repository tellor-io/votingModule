
import React, { useState, useContext } from "react";
//Router
import { BrowserRouter as Router } from "react-router-dom";
//Components
import Footer from "./Footer";
import Nav from "./Nav";
import Hero from "./Hero";
//Web3
import { ethers } from "ethers";
//Context
import { AppContext } from "../index";

function Vote({currentAddress, signer}){

    console.log("Loading Vote...");
    //Component State
    // const [currAddr, setCurrAddr] = useState("");
    // const [signer, setSigner] = useState({});
    //Context
    const data = useContext(AppContext);
    //Globals

    //Listening for changes in ChainId (Mainnet/Rinkeby/Others)
    window.ethereum.on("chainChanged", () => {
    window.location.reload();
    });

    console.log("Found Ethereum");

    //Listening for changes in Metamask Accounts
    // window.ethereum.on("accountsChanged", (accounts) => {
    //     setCurrAddr(ethers.utils.getAddress(accounts[0]));
    //     const signerFromProvider = data.provider.getSigner();
    //     setSigner(signerFromProvider);
    // });

    // currAddr = 0;
    // signer = 0;
    return (
    <div className="App">
        {/* <Nav currAddr={currAddr} />
        <Hero currAddr={currAddr} signer={signer} /> */}
        <Footer />
    </div>
    );
}

export default Vote;