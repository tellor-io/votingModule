import React, { useState, useContext } from "react";
import "../styles/Hero.css";
//Web3
import { ethers } from "ethers";
//Context
import { web3Context } from "../App";
//Utils
import TellorGovABI from "../utils/TellorGovABI.json";
//Components
import MetaMaskErrModal from "./MetaMaskErrModal";
import TxnLoader from "./TxnLoader";
import TxnModal from "./TxnModal";

import { Table, Grid } from 'semantic-ui-react';

function Hero({ currAddr, signer }) {
    //Component State
    const [loading, setLoading] = useState(false);
    const [justVoted, setJustVoted] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const [txnHash, setTxnHash] = useState(null);
    const [voteId, setVoteId] = useState(''); //current
    //const [voteIdRinkeby, setVoteIdRinkeby] = useState(''); //current
    //Context
    const data = useContext(web3Context);
    //Globals
    //const voteIdRinkeby = 9; //old way of hardcoding the dispute id
    //Refs
    const ref = React.createRef();
    const ErrModal = React.forwardRef((props, ref) => {
        return <MetaMaskErrModal ref={ref}>{props.children}</MetaMaskErrModal>;
    });
    //Handlers
    const handleChange = (event) => {
        const value = event.target.value;
        setVoteId({
            ...voteId,
            [event.target.name]: value,
        });
    }
    const handleVote = async (bool, invalidQuery = false) => {
        if (!data) return;

        let contract;
        let didAlreadyVote;

        try {
            if (data.chainId === 1) {
                contract = new ethers.Contract(
                    data.tellorGovMainnet,
                    TellorGovABI,
                    Object.keys(signer).length > 0 ? signer : data.signer
                );
            } else if (data.chainId === 11155111) {
                contract = new ethers.Contract(
                    data.tellorGovGoerli,
                    TellorGovABI,
                    Object.keys(signer).length > 0 ? signer : data.signer
                );
            } else {
                throw new Error("Unsupported network");
            }

            // Ensure voteId is a valid number
            if (!voteId.voteId || isNaN(Number(voteId.voteId))) {
                throw new Error("Invalid vote ID");
            }

            const voteIdBN = ethers.BigNumber.from(voteId.voteId);

            didAlreadyVote = await contract.didVote(
                voteIdBN,
                currAddr.length > 0 ? currAddr : data.currentAddress
            );

            if (!didAlreadyVote) {
                setLoading(true);
                const tx = await contract.vote(voteIdBN, bool, invalidQuery);
                const receipt = await tx.wait();
                setLoading(false);
                setTxnHash(receipt.transactionHash);
                setJustVoted(true);
            } else {
                setErrMessage(
                    "You have already voted on this proposal. Thank you for voting!"
                );
            }
        } catch (err) {
            console.error("Vote Error:", err);
            setLoading(false);
            setErrMessage(err.message || "An error occurred during the transaction");
        }
    };

    return (
        <div className="Hero">
            <div className="Hero__View">
                <Grid stackable padded='horizontally'>
                    <Grid.Row columns='equal' divided >
                        <Grid.Column>
                            <div className="Hero__decription-container">
                            <h1> Dispute Center</h1>
                                <h2>
                                    Your one-stop shop for managing disputes within the Tellor oracle. Use this page to easily vote on an active dispute within the Tellor network. <br></br><br></br> Simply enter the dispute id below and vote "in favor" or "in opposition" of the dispute being raised.
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper">
                                {" "}
                                    <br></br>For more info on disputes,&nbsp;
                                    <a
                                        href="https://docs.tellor.io/tellor/disputing-data/introduction#dispute-mechanism"
                                        alt="https://docs.tellor.io/tellor/disputing-data/introduction#dispute-mechanism"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        read our docs
                                    </a>
                                    .
                                </h2>        
                            </div>

                        </Grid.Column>
                        <Grid.Column >
                            <div className="Hero__description_container">
                                <h1>What am I voting on?</h1>
                                <h2>
                                Tellor values can all be disputed if they are suspected to be wrong. <p></p>Any holder of TRB can contribute their opinion as to whether the reporter who submitted the value should be slashed based on the information available regarding the dispute. <br></br><br></br> This is the crypto-economic security that enables Tellor to keep its data accurate!{" "}
                                </h2>
                                {/*<div className='Hero__divider'></div>
                                <h2>
                                    <span className="bold underline">
                                        Active Disputes:
                                    </span>
                                </h2>
                                <div className="Hero__description_container_table">
                                    <Table definition >
                                        <Table.Body>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Dispute ID </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> read from sc  </Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Disputed Value </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> Read from sc</Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                 <Table.Cell className="Hero__row_header"> Reason for Dispute </Table.Cell>
                                                <Table.Cell className="Hero__row_item">blah blah blah </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>*/}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>  
            </div>
            <hr className="Hero__line_breaker" />      
            <div className="Hero__lower_half_container">
                <Grid stackable>
                    <Grid.Row textAlign="center" columns='equal'>
                        {/* <Grid.Column width={3}></Grid.Column> */}
                        <Grid.Column >
                        
                            <div className="Hero__duration_container">
                                <h2 className="Hero__Duration">Duration</h2>
                                <div className="Hero__duration_container_table">
                                    <Table definition>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <label className='Hero__row_header'>
                                                        Open
                                                    </label>
                                                </Table.Cell>
                                                <Table.Cell className="Hero__date_font">Dispute Date</Table.Cell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <label className='Hero__row_header'>
                                                        Close
                                                    </label>
                                                </Table.Cell>
                                                <Table.Cell className="Hero__date_font">Dispute Date + 2 days</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>           
                                </div>
                            </div>
                        </Grid.Column>
                        {/* <Grid.Column width={3}></Grid.Column> */}
                        <Grid.Column >
                            <div className='Hero__buttons-container'>
                                <h2 className='Hero__your_vote'>Your Vote</h2>
                                <div>
                                    Enter Dispute Id:
                                    <input
                                        type="number"
                                        className="HeroParameterFeedNumberInputLarge"
                                        name="voteId"
                                        value={voteId.disputeId}
                                        onChange={handleChange}
                                    />
                                </div>
                                <br/>
                                <div>
                                    <button
                                        onClick={() => handleVote(true, false)}
                                        className="Hero__VoteInFavor"
                                        >
                                        Vote in Favor
                                    </button>
                                </div>
                                <br/>
                                <div>
                                    <button
                                        onClick={() => handleVote(false, false)}
                                        className="Hero__VoteInOpposition"
                                        >
                                        Vote in Opposition
                                    </button>
                                </div>
                                <br/>
                                <div>
                                    <button
                                        onClick={() => handleVote(false, true)}
                                        className="Hero__VoteInvalidQuery"
                                    >
                                        Vote Invalid Query
                                    </button>
                                </div>
                                <br/>
                            </div>
                        </Grid.Column> 
                    </Grid.Row>
                </Grid>
           
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


 {/* </div>    
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
                </div>*/}