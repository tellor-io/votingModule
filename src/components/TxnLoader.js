import React from "react";
import "../styles/TxnLoader.css";

function TxnLoader({ loading }) {
  return (
    <div className="TxnLoader" style={{ display: loading ? "flex" : "none" }}>
      <h1>Processing... please wait.</h1>
      <svg
        className="TxnLoader__Icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 340"
      >
        <circle cx="170" cy="170" r="160" stroke="#2dfc9f" />
        <circle cx="170" cy="170" r="135" stroke="#ababab" />
        <circle cx="170" cy="170" r="110" stroke="#555555" />
        <circle cx="170" cy="170" r="85" stroke="#323434" />
      </svg>
    </div>
  );
}

export default TxnLoader;
