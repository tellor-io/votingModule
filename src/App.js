import React, {createContext} from "react";
//Router
import {Route, Routes } from "react-router-dom";
                   
import Vote from "./components/Vote";
import PleaseConnect from "./components/PleaseConnect";

const tellorGovMainnet = "0x02803dcFD7Cb32E97320CFe7449BFb45b6C931b8";
const tellorGovGoerli = "0x02803dcFD7Cb32E97320CFe7449BFb45b6C931b8";

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

