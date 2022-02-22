import React, { useContext } from "react";
import "../styles/Nav.css";
// import { ReactComponent as TellorGrey } from "../assets/Tellor.svg";
import LogoMaker from "./LogoMaker";
import { web3Context } from "../App";
import { truncateAddr } from "../utils/helpers";
import { Jazzicon } from "@ukstv/jazzicon-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// const LogoMaker = require('./LogoMaker').default;

function Nav({ currAddr }) {
  
  //Context
  const data = useContext(web3Context);
  
  // address={currAddr.length > 0 ? currAddr : data.currentAddress}
  return (
    <div className="NavBar">
      <div className="NavBar__Left">
        {/* <TellorGrey className="NavBar__Title" /> */}
        <LogoMaker/>
      </div>
      <div className="NavBar__Right">
        <Tippy content="To switch networks, use MetaMask extension.">
          <h1 className="NavBar__Network">{`Network: ${
            data.chainId === "0x1" ? "Mainnet" : "Rinkeby"
          }`}</h1>
        </Tippy>
        <Tippy content="To change your address, use MetaMask extension.">
          <div className="NavBar__Address">
            {`User: ${
              currAddr.length > 0
                ? truncateAddr(currAddr)
                : truncateAddr(data.address)
            }`}
            <div className="NavBar__UserIconContainer">
              <Jazzicon
                address={data.address}
                className="NavBar__UserIcon"
              />
            </div>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Nav;
