import React from "react";
import "../styles/WrongNetwork.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";

function WrongNetwork() {
  //Listening for changes in ChainId (Mainnet/Goerli/Others)
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
  return (
    <div className="WrongNetwork__Container">
      <Tellor className="WrongNetwork__Swoosh" />
      <h1>
        To vote, please use MetaMask to change to Goerli or Mainnet networks.
      </h1>
      <h1>Thank you!</h1>
    </div>
  );
}

export default WrongNetwork;
