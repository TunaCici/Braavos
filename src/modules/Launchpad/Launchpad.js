import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* Static assets */
import Braavos_Terminal_Icon from "../../static/terminal_icon.png";
import Hugo_Theme_Icon from "../../static/hugo-theme-cactus-logo.png";

import Signature from "../../static/tuna_cici_signature.svg";

/* Modules */

/* CSS */
import "./Launchpad.css";

function Launchpad(props) {

  const launchApp = (e) => {
    const app = e.currentTarget.dataset.app;
    
    switch (app) {
      case "terminal":
        window.location.href = "/terminal";
        break;
      case "blog":
        /* TODO: Implement blog */
        window.location.href = "/blog";
        break;
      default:
        break;
    }
  };

  return (
    <div id="launchpad" className="launchpad"> 
      <h1 className="launchpad-h1" > choose an interface </h1>

      <div className="launchpad-grid">
        <li className="launchpad-li" onClick={launchApp} data-app="terminal">
          <div className="launchpad-app">
            <img className="launchpad-icon" src={Braavos_Terminal_Icon} alt="Braavos Terminal Icon" />
            <h3 className="launchpad-h3"> Terminal </h3>
          </div>
        </li>

        <li className="launchpad-li" onClick={launchApp} data-app="blog">
          <div className="launchpad-app">
            <img className="launchpad-icon" src={Hugo_Theme_Icon} alt="Braavos Blog Icon" />
            <h3 className="launchpad-h3"> Blog </h3> 
          </div>
        </li>
      </div>

      <div className="launchpad-footer">
        <img className="launchpad-signature" src={Signature} alt="Tuna Cici's Signature" />
      </div>
    </div>
  );
}

export default Launchpad;
