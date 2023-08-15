import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

/* Static assets */
import Braavos_Terminal_Icon from "../../static/terminal_icon.png";
import Hugo_Theme_Icon from "../../static/hugo-theme-cactus-logo.png";

import Signature from "../../static/tuna_cici_sign_bw.svg";
import SignatureGIF from "../../static/tuna_cici_sign_bw.gif";

/* Modules */

/* CSS */
import "./Launchpad.css";

function Launchpad(props) {
  const navigate = useNavigate();

  const launchApp = (e) => {
    const app = e.currentTarget.dataset.app;
    
    switch (app) {
      case "terminal":
        navigate("/terminal", { replace: true });
        break;
      case "blog":
        window.location.href = "/blog";
        break;
      default:
        break;
    }
  };

  const animateSignature = () => {
    const signature = document.getElementById("launchpadSignature");
    signature.src = SignatureGIF;

    setTimeout(() => {
      signature.classList.add("fade-in");
      signature.src = Signature;
    }, 4500);

  };

  /* Thanks to : https://codepen.io/yaclive/pen/EayLYO */
  useEffect(() => {
    const canvas = document.getElementById("launchpadCanvas");
    const ctx = canvas.getContext('2d');

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    letters = letters.split('');

    // Setting up the columns
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    // Setting up the drops
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = 'rgba(39, 39, 41, .1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    setInterval(draw, 60);
  }, []);

  return (
    <div id="launchpad" className="launchpad">
      <canvas id="launchpadCanvas" className="launchpad-canvas"></canvas>

      <h1 className="launchpad-h1" > choose_an_interface </h1>

      <div className="launchpad-grid">
        <li id="terminalApp" className="launchpad-li" onClick={launchApp} data-app="terminal">
          <div className="launchpad-app">
            <img className="launchpad-icon" src={Braavos_Terminal_Icon} alt="Braavos Terminal Icon" />
            <h3 className="launchpad-h3"> Terminal </h3>
          </div>
        </li>

        <li id="blogApp" className="launchpad-li" onClick={launchApp} data-app="blog">
          <div className="launchpad-app">
            <img className="launchpad-icon" src={Hugo_Theme_Icon} alt="Braavos Blog Icon" />
            <h3 className="launchpad-h3"> Blog </h3> 
          </div>
        </li>
      </div>

      <div className="launchpad-footer" onClick={animateSignature}>
        <img id="launchpadSignature" className="launchpad-signature fade-in" src={Signature} alt="Tuna Cici's Signature" />
      </div>
    </div>
  );
}

export default Launchpad;
