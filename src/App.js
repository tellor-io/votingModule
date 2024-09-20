import React, {createContext} from "react";
//Router
import {Route, Routes } from "react-router-dom";
                   
import Vote from "./components/Vote";
import PleaseConnect from "./components/PleaseConnect";

const tellorGovMainnet = "0xB30b1B98d8276b80bC4f5aF9f9170ef3220EC27D";
const tellorGovGoerli = "0xA192f62726ea27979146dfF94f886a8E4Eb6D7A5";

const web3Context = createContext({
  web3: null,
  provider: null,
  chainId: 0x0,
  address: 0x0,
  signer: null,
  error: false,
  errorCode: '',
  tellorGovMainnet: tellorGovMainnet,
  tellorGovGoerli: tellorGovGoerli,
})

function App() {

  return (
    <div className="App">
      <web3Context.Provider value={{
                                    web3: null, 
                                    provider: null,
                                    chainId: 0x0, 
                                    address: 0x0,
                                    signer: null,
                                    error: false,
                                    errorCode: '',
                                    tellorGovMainnet: tellorGovMainnet,
                                    tellorGovGoerli: tellorGovGoerli
                                  }}>
        <Routes>
          <Route path='/' element={<PleaseConnect/>}/>
          <Route path='/vote' element={<Vote/>}/>
        </Routes>
      </web3Context.Provider>
    </div>
  );
}

export {
  App,
  web3Context
}

