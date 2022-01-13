import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WrongNetwork from "./components/WrongNetwork";
import Loader from "./components/Loader";
import PleaseConnect from "./components/PleaseConnect";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

//Listening for changes in ChainId (Mainnet/Rinkeby/Others)
window.ethereum.on("chainChanged", () => {
  window.location.reload();
});

const tellorGovMainnet = "0x51d4088d4EeE00Ae4c55f46E0673e9997121DB00";
const tellorGovRinkeby = "0xA64Bb0078eB80c97484f3f09Adb47b9B73CBcA00";
export const AppContext = React.createContext();
export const provider = new ethers.providers.Web3Provider(
  window.ethereum,
  "any"
);

if (typeof window.ethereum !== "undefined") {
  detectEthereumProvider()
    .then((res) => {
      const signer = provider.getSigner();
      let appContext = {
        chainId: "",
        currentAddress: "",
        signer: signer,
        tellorGovMainnet: tellorGovMainnet,
        tellorGovRinkeby: tellorGovRinkeby,
      };

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
      } else if (res.chainId === null) {
        ReactDOM.render(<Loader />, document.getElementById("root"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        ReactDOM.render(<WrongNetwork />, document.getElementById("root"));
      }
    })
    .catch((err) => {
      console.log("MetaMask Error: ", err);
      ReactDOM.render(<PleaseConnect />, document.getElementById("root"));
    });
} else {
  window.alert("Please install MetaMask");
  window.location.assign("https://metamask.io/");
}
