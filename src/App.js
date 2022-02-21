import React from "react";
//Router
import {Route, Routes } from "react-router-dom";

                   
import Vote from "./components/Vote";
import PleaseConnect from "./components/PleaseConnect";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PleaseConnect/>}/>
        <Route path='/vote' element={<Vote/>}/>
      </Routes>
    </div>
  );
}

export default App;
