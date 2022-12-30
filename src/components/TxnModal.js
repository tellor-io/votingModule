import React from "react";
import "../styles/TxnModal.css";
import { ReactComponent as Close } from "../assets/CloseX.svg";
import { truncateAddr } from "../utils/helpers";

function TxnModal({ chainId, address, justVoted, setJustVoted, txnHash }) {
  const closeModal = () => {
    setJustVoted(false);
  };

  console.log("chainId", chainId);
  return (
    <div className="TxnModal" style={{ display: justVoted ? "flex" : "none" }}>
      <div className="TxnModal__Content">
        <div className="TxnModal__Exit">
          <Close className="TxnModal__ExitIcon" onClick={closeModal} />
        </div>
        <div className="TxnModal__Message">
          <h1>
            {address
              ? `Thank you for voting, ${truncateAddr(address)}!`
              : "Thank you for voting!"}
          </h1>
          <p>To view your transaction on etherscan, click below:</p>
          {txnHash ? (
            chainId === 1 ? (
              <a
                href={`https://etherscan.io/tx/${txnHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`https://etherscan.io/tx/${txnHash}`}</a>
            ) : (
              <a
                href={`https://goerli.etherscan.io/tx/${txnHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`https://goerli.etherscan.io/tx/${txnHash}`}</a>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TxnModal;
