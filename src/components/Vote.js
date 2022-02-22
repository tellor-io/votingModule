
import React, { useState, useContext } from "react";
//Router
import { BrowserRouter as Router, useLocation } from "react-router-dom";
//Components
import Footer from "./Footer";
import Nav from "./Nav";
import Hero from "./Hero";

//Context
import { web3Context } from "../App";

function Vote(){

    const data = useContext(web3Context)

    

    //Component State
    // const [currAddr, setCurrAddr] = useState("");
    // const [signer, setSigner] = useState({});
    //Context
    // const data = useContext(AppContext);
    //Globals

    //Listening for changes in ChainId (Mainnet/Rinkeby/Others)
    window.ethereum.on("chainChanged", (data) => {
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
        <Nav currAddr={data.address} />
        <Hero currAddr={data.address} signer={data.signer} />
        <Footer />
    </div>
    );
}

export default Vote;
