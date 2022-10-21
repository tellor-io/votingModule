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
    //Context
    const data = useContext(web3Context);
    //Globals
    const voteIdMainnet = 7; //current
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

        if (data.chainId === 1) {
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
        } else if (data.chainId === 4) {
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
                    console.log("MetaMask Txn Err:: ", err.message);
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
                <Grid stackable padded='horizontally'>
                    <Grid.Row columns='equal' divided >
                        <Grid.Column>
                            <div className="Hero__decription-container">
                            <h1> What is Tellor 360?</h1>
                                <h2>
                                    Tellor 360 is the next version of the Tellor protocol.  
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper bold">
                                Read the blog post {" "}
                                    <a
                                        href="https://tellor.io/blog/tellor360-the-next-level/"
                                        alt="https://tellor.io/blog/tellor360-the-next-level/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        here
                                    </a>
                                    .
                                </h2>
                                
                                <h2 className="Hero__LinkToWhitePaper bold">
                                    Review the codebase {" "}
                                    <a
                                        href="https://github.com/tellor-io"
                                        alt="https://github.com/tellor-io"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        here
                                    </a>
                                    .
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper bold">
                                    Watch a walkthrough of the code {" "}
                                    <a
                                        href="https://youtu.be/qVZetE9IWt8"
                                        alt="https://youtu.be/qVZetE9IWt8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        here
                                    </a>
                                    .
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper bold">
                                    Watch the initial brainstorm session {" "}
                                    <a
                                        href="https://youtu.be/ISBrcVTMQ7g"
                                        alt="https://youtu.be/ISBrcVTMQ7g"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        here
                                    </a>
                                    .
                                </h2>
                            </div>

                        </Grid.Column>
                        <Grid.Column >
                            <div className="Hero__description_container">
                                <h1>What am I voting on exactly?</h1>
                                <h2>
                                This is the vote to upgrade the Tellor protocol to its newest version, Tellor 360. which unifies Tellor's mechanisms across all evm chains. This will also be the last vote as we will be removing governance.{" "}
                                </h2>
                                <div className='Hero__divider'></div>
                                <h2>
                                    <span className="bold underline">
                                        Some Key Differences to Note:
                                    </span>
                                </h2>
                                <div className="Hero__description_container_table">
                                    <Table definition >
                                        <Table.Body>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Stake amount for Reporter's </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> $1500 USD or 100 TRB <br></br>(whichever is more) </Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Protocol Upgradeability? </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> Removed to reduce attack vector on entire protocol</Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Token Issuance </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> Fixed @ 8816.4 TRB per 30 days <br></br>(50% to team / 50% to time-based rewards on oracle contract ) </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
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
                                                <Table.Cell className="Hero__date_font">October 25th, 2022</Table.Cell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <label className='Hero__row_header'>
                                                        Close
                                                    </label>
                                                </Table.Cell>
                                                <Table.Cell className="Hero__date_font">November 1, 2022</Table.Cell>
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
                                    <button
                                        onClick={() => handleVote(true)}
                                        className="Hero__VoteInFavor"
                                        >
                                        Vote in Favor
                                    </button>
                                </div>
                                <br/>
                                <div>
                                    <button
                                        onClick={() => handleVote(false)}
                                        className="Hero__VoteInOpposition"
                                        >
                                        Vote in Opposition
                                    </button>
                                </div>
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