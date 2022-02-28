import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import {App} from "./App";
import "./index.css";


const determinePageToOpen = async () => {

    ReactDOM.render(
    <BrowserRouter>
      <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <App/>
    </BrowserRouter>
    , document.getElementById("root"));

} 

determinePageToOpen();


