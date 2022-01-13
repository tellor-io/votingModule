import React, { useState, useContext } from "react";
import "../styles/Hero.css";
//Web3
import { ethers } from "ethers";
//Context
import { AppContext } from "../index";
//Utils
import TellorGovABI from "../utils/TellorGovABI.json";
//Components
import MetaMaskErrModal from "./MetaMaskErrModal";
import TxnLoader from "./TxnLoader";
import TxnModal from "./TxnModal";

function Hero({ currAddr, signer }) {
  //Component State
  const [loading, setLoading] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [txnHash, setTxnHash] = useState(null);
  //Context
  const data = useContext(AppContext);
  //Globals
  const voteIdMainnet = 3; //current
  const voteIdRinkeby = 9; //current
  //Refs
  const ref = React.createRef();
  const ErrModal = React.forwardRef((props, ref) => {
    return <MetaMaskErrModal ref={ref}>{props.children}</MetaMaskErrModal>;
  });
  //Handlers
  const handleVote = async (bool) => {
    if (!data) return;

    let contract;
    let didAlreadyVote;

    if (data.chainId === "0x1") {
      contract = new ethers.Contract(
        data.tellorGovMainnet,
        TellorGovABI,
        Object.keys(signer) > 0 ? signer : data.signer
      );

      didAlreadyVote = await contract.didVote(
        voteIdMainnet,
        currAddr.length > 0 ? currAddr : data.currentAddress
      );

      if (!didAlreadyVote) {
        setLoading(true);
        try {
          contract
            .vote(voteIdMainnet, bool, false)
            .then((res) => {
              setLoading(false);
              setTxnHash(res.hash);
              setJustVoted(true);
            })
            .catch((err) => {
              console.log("MetaMask Txn Err: ", err);
              setLoading(false);
              setErrMessage(err.message);
            });
        } catch (err) {
          // console.log("ERR::: ", err.message);
          setErrMessage(err.message);
        }
      } else {
        setErrMessage(
          "Execution reverted: You already voted at this address on this network. Thank you for voting!"
        );
      }
    } else if (data.chainId === "0x4") {
      contract = new ethers.Contract(
        data.tellorGovRinkeby,
        TellorGovABI,
        Object.keys(signer) > 0 ? signer : data.signer
      );

      didAlreadyVote = await contract.didVote(
        voteIdRinkeby,
        currAddr.length > 0 ? currAddr : data.currentAddress
      );

      if (!didAlreadyVote) {
        setLoading(true);
        try {
          contract
            .vote(voteIdRinkeby, bool, false)
            .then((res) => {
              setLoading(false);
              setTxnHash(res.hash);
              setJustVoted(true);
            })
            .catch((err) => {
              //console.log("MetaMask Txn Err: ", err);
              setLoading(false);
              setErrMessage(err.message);
            });
        } catch (err) {
          // console.log("MetaMask Txn Err:: ", err.message);
          setErrMessage(err.message);
        }
      } else {
        setErrMessage(
          "Execution reverted: You already voted at this address on this network. Thank you for voting!"
        );
      }
    }
  };

  return (
    <div className="Hero">
      <div className="Hero__View">
        <h1>Tellor Treasuries!</h1>
        <h2>
          Tellor is now voting for a treasuries upgrade. Cast your vote below!
        </h2>
        <h3 className="Hero__LinkToWhitePaper">
          <a href="https://www.tellor.io/static/media/tellorX-whitepaper.f6527d55.pdf">
            Link to the Tellor Whitepaper
          </a>
        </h3>
        <div className="Hero__CTAContainer">
          <div className="Hero__CTAColumn">
            <h2>Click here to vote in favor of this proposal</h2>
            <button
              onClick={() => handleVote(true)}
              className="Hero__VoteInFavor"
            >
              Vote in Favor
            </button>
          </div>
          <div className="Hero__CTAColumn">
            <h2>Click here to vote in opposition of this proposal</h2>
            <button
              onClick={() => handleVote(false)}
              className="Hero__VoteInOpposition"
            >
              Vote in Opposition
            </button>
          </div>
        </div>
      </div>
      <ErrModal innerRef={ref}>{[errMessage, setErrMessage]}</ErrModal>
      <TxnLoader loading={loading} />
      <TxnModal
        chainId={data.chainId}
        address={currAddr.length > 0 ? currAddr : data.currentAddress}
        justVoted={justVoted}
        setJustVoted={setJustVoted}
        txnHash={txnHash}
      />
    </div>
  );
}

export default Hero;
