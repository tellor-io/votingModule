import React, {createContext} from "react";
//Router
import {Route, Routes } from "react-router-dom";

                   
import Vote from "./components/Vote";
import PleaseConnect from "./components/PleaseConnect";

const web3Context = createContext({
  web3: null,
  chainId: 0x0,
  address: 0x0,
  error: false
})

function App() {

  return (
    <div className="App">
      <web3Context.Provider value={{web3: null, chainId: 0x0, address: 0x0, error: false}}>
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

