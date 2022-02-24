import React, {createContext} from "react";
//Router
import {Route, Routes } from "react-router-dom";
                   
import Vote from "./components/Vote";
import PleaseConnect from "./components/PleaseConnect";

const tellorGovMainnet = "0x51d4088d4EeE00Ae4c55f46E0673e9997121DB00";
const tellorGovRinkeby = "0xA64Bb0078eB80c97484f3f09Adb47b9B73CBcA00";

const web3Context = createContext({
  web3: null,
  provider: null,
  chainId: 0x0,
  address: 0x0,
  signer: null,
  error: false,
  errorCode: '',
  tellorGovMainnet: tellorGovMainnet,
  tellorGovRinkeby: tellorGovRinkeby,
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
                                    tellorGovRinkeby: tellorGovRinkeby
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

