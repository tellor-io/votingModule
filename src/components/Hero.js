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

import {Table, Grid, Header, Button} from 'semantic-ui-react';

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
                <Grid stackable padded='horizontally'>
                    <Grid.Row columns='equal' divided >
                        <Grid.Column>
                            <div className="Hero__decription-container">
                                <h1> What are Tellor Treasuries?</h1>
                                <h2>
                                    Stake your TRB and vote on the future monetary policy of Tellor, while
                                    earning rewards in the process. This new type of open market community
                                    will decide the circulating supply of TRB and future rates of return
                                    for staking TRB.
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper bold">
                                    For more info read about it{" "}
                                    <a
                                        href="https://docs.tellor.io/tellor/whitepaper/tellor-oracle-overview/monetary-policy"
                                        alt="https://docs.tellor.io/tellor/whitepaper/tellor-oracle-overview/monetary-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bold special"
                                        >
                                        here
                                    </a>
                                    .
                                </h2>
                                <h2 className="Hero__LinkToWhitePaper bold">
                                    Watch the tech talk on it{" "}
                                    <a
                                        href="https://www.youtube.com/watch?v=25iawqdtmCs&t=682s"
                                        alt="https://www.youtube.com/watch?v=25iawqdtmCs&t=682s"
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
                                    This is the vote to kick off the first Treasury which determines the
                                    parameters such as: the max amount of TRB that can be locked up, the
                                    rate of return, and the duration of the treasury period.{" "}
                                </h2>
                                <div className='Hero__divider'></div>
                                <h2>
                                    <span className="bold underline">
                                        For the first Treasury we are proposing:
                                    </span>
                                </h2>
                                <div className="Hero__description_container_table">
                                    <Table definition >
                                        <Table.Body>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Max TRB </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> 100,000 TRB </Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Rate of return </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> 2.5% ( ~10% APR) </Table.Cell>
                                            </Table.Row>
                                            <Table.Row className="row">
                                                <Table.Cell className="Hero__row_header"> Duration </Table.Cell>
                                                <Table.Cell className="Hero__row_item"> 90 days </Table.Cell>
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
                                        <Table.Row>
                                            <Table.Cell>
                                                <label className='Hero__row_header'>
                                                    Open
                                                </label>
                                            </Table.Cell>
                                            <Table.Cell className="Hero__date_font">January 14th, 2022 @ 2pm EST</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <label className='Hero__row_header'>
                                                    Close
                                                </label>
                                            </Table.Cell>
                                            <Table.Cell className="Hero__date_font">January 21st, 2022 @ 2pm EST</Table.Cell>
                                        </Table.Row>
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