import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
// import WrongNetwork from "./components/WrongNetwork";
// import Loader from "./components/Loader";
import PleaseConnect from "./components/PleaseConnect";
// import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Wallet } from "ethers";
// import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from "web3";
import Web3Modal from "web3modal";
// import { resolvePath } from "react-router-dom";

// import 'sema ntic-ui-css/semantic.min.css'

const tellorGovMainnet = "0x51d4088d4EeE00Ae4c55f46E0673e9997121DB00";
const tellorGovRinkeby = "0xA64Bb0078eB80c97484f3f09Adb47b9B73CBcA00";
export const AppContext = React.createContext();

const determinePageToOpen = async () => {
    
    // const provider = await detectEthereumProvider();
    // const provider2 = new ethers.providers.Web3Provider(
    //     window.ethereum,
    //     "any"
    // );


    // console.log("'Detect' Provider");
    // console.log(provider);

    // console.log("'Window' provider");
    // console.log(provider2);

    // console.log("Finish from providers");

    // const signer = provider2.getSigner();
    
    // console.log("Got the signs");

    // let appContext = {
    //     chainId: "",
    //     currentAddress: "",
    //     provider: provider,
    //     signer: signer,
    //     tellorGovMainnet: tellorGovMainnet,
    //     tellorGovRinkeby: tellorGovRinkeby,
    //   };
    // console.log("'Got app context");
    // If Etherium is detected



    // console.log(accounts);

    ReactDOM.render(
    <div>
        {/* Hello World */}
        <PleaseConnect />
        {/* <script type="text/javascript" src="https://unpkg.com/web3@1.2.11/dist/web3.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
        <script type="text/javascript" src="https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fortmatic@2.0.6/dist/fortmatic.js"></script> */}
    </div>
    , document.getElementById("root"));

} 

determinePageToOpen();



// If crypto env var is available
/*
if (typeof window.ethereum !== "undefined") {
  
  detectEthereumProvider()
    .then((res) => {

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      const signer = provider.getSigner();

      let appContext = {
        chainId: "",
        currentAddress: "",
        provider: provider,
        signer: signer,
        tellorGovMainnet: tellorGovMainnet,
        tellorGovRinkeby: tellorGovRinkeby,
      };

      // ReactDOM.render(<PleaseConnect />, document.getElementById("root"));
      // return;

      // If mainnet
      if (res.chainId === "0x1") {
        appContext.chainId = "0x1";
        appContext.currentAddress = ethers.utils.getAddress(
          res.selectedAddress
        );

        ReactDOM.render(
          <AppContext.Provider value={appContext}>
            <App />
          </AppContext.Provider>,
          document.getElementById("root")
        );

      // If Rinkeby
      } else if (res.chainId === "0x4") {
        appContext.chainId = "0x4";
        appContext.currentAddress = ethers.utils.getAddress(
          res.selectedAddress
        );

        ReactDOM.render(
          <AppContext.Provider value={appContext}>
            <App />
          </AppContext.Provider>,
          document.getElementById("root")
        );

      // If no netid is found yet
      } else if (res.chainId === null) {
        ReactDOM.render(<Loader />, document.getElementById("root"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      // Any other problem
      } else {
        ReactDOM.render(<WrongNetwork />, document.getElementById("root"));
      }
    }) // If crypto wallet is not running yet
    .catch((err) => {
      console.log("MetaMask Error: ", err);
      ReactDOM.render(<PleaseConnect />, document.getElementById("root"));
    });
    // If no crypto wallet is detected
} else {
  window.alert("Please install MetaMask or Trust wallet");
  window.location.assign("https://metamask.io/");
}
*/

// if(typeof window.ethereum !== 'undefined'){
//     const connector = new WalletConnect({
//         bridge: "https://bridge.walletconnect.org", // Required
//         qrcodeModal: QRCodeModal,
//     })

//     if(!connector.connected){
//         // create new session
//         connector.createSession();
//     }

//     connector.on("connect", (error, payload) => {
//         if(error){
//             throw error;
//         }

//         const {accounts, chainId} = payload.params[0];
//     });

//     connector.on("session_update", (error, payload) => {
//         if(error){
//             throw error;
//         }

//         const {accounts, chainId} = payload.params[0];
//     });

//     connector.on("disconnect", (error, payload) => {
//         if(error){
//             throw error;
//         }

//         // Delete connector
//     });


// }
// else{ 

// }