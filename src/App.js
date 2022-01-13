import React, { useState } from "react";
//Router
import { BrowserRouter as Router } from "react-router-dom";
//Components
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
//Web3
import { ethers } from "ethers";
import { provider } from "./index";

function App() {
  //Component State
  const [currAddr, setCurrAddr] = useState("");
  const [signer, setSigner] = useState({});
  //Globals
  //Listening for changes in Metamask Accounts
  window.ethereum.on("accountsChanged", (accounts) => {
    setCurrAddr(ethers.utils.getAddress(accounts[0]));
    const signerFromProvider = provider.getSigner();
    setSigner(signerFromProvider);
  });

  return (
    <div className="App">
      <Router>
        <Nav currAddr={currAddr} />
        <Hero currAddr={currAddr} signer={signer} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
