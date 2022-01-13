import React from "react";
import "../styles/WrongNetwork.css";
import { ReactComponent as Tellor } from "../assets/Tellor_TRB.svg";

function WrongNetwork() {
  return (
    <div className="WrongNetwork__Container">
      <Tellor className="WrongNetwork__Swoosh" />
      <h1>
        To vote, please use MetaMask to change to Rinkeby or Mainnet networks.
      </h1>
      <h1>Thank you!</h1>
    </div>
  );
}

export default WrongNetwork;
