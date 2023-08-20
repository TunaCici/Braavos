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

/* Shapes */
function importAll(r) {
  let shapes = {};
    r.keys().forEach((item, index) => { shapes[item.replace('./', '')] = r(item); });
  return shapes;
}

const shapes = importAll(require.context('../../static/background', false, /\.svg$/));

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
    /* Initialize the canvas */
    const canvas = document.getElementById("launchpadCanvas");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function changeBackground() {
      /* Set max amount depeding on the screen size */
      const launchpadCanvas = document.getElementById("launchpadCanvas");
      if (!launchpadCanvas) {
        return;
      }

      let maxAmout = 0;
      if (window.innerWidth < 768) {
        maxAmout = 6;
      } else if (window.innerWidth < 1024) {
        maxAmout = 10;
      } else {
        maxAmout = 12;
      }

      const randomImage = [];
      const randomWidth = [];
      const random2DPos = [];

      for (let i = 0; i < maxAmout; i++) {
        const random = Math.floor(Math.random() * Object.keys(shapes).length);

        randomImage.push(shapes[Object.keys(shapes)[random]]);
        randomWidth.push(Math.floor(Math.random() * 64) + 64);
        random2DPos.push({
          x: Math.floor(Math.random() * (window.innerWidth - 128)),
          y: Math.floor(Math.random() * (window.innerHeight - 128)),
        });
      }

      const urls = randomImage.map((image) => `url(${image})`);
      const widths = randomWidth.map((width) => `${width}px`);
      const positions = random2DPos.map((pos) => `${pos.x}px ${pos.y}px`);

      launchpadCanvas.style.backgroundImage = urls.join(", ");
      launchpadCanvas.style.backgroundSize = widths.join(", ");
      launchpadCanvas.style.backgroundPosition = positions.join(", ");

      launchpadCanvas.style.opacity = 1;
      setTimeout(() => {
        if (launchpadCanvas) {launchpadCanvas.style.opacity = 0;}
      }, 2000);
    }

    /* Animate both terminalApp and blogApp */
    setTimeout(() => {
      const terminalApp = document.getElementById("terminalApp");
      if (terminalApp) {
        terminalApp.classList.add("shake-like-nicki");
      }

      setTimeout(() => {
        const blogApp = document.getElementById("blogApp");

        if (blogApp) {
          blogApp.classList.add("shake-like-nicki");
        }
      }, 1000);
    }, 1000);

    // Dynamic background images
    changeBackground();
    const bgLoop = setInterval(changeBackground, 4000);

    return () => {
      clearInterval(bgLoop);
    };
  }, []);

  return (
    <div id="launchpad" className="launchpad">
      <canvas id="launchpadCanvas" className="launchpad-canvas"></canvas>

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

        <hr className="launchpad-footer-hr" />

        <div className="launchpad-footer-text">
          Pasteleft &#9752; 2023 - Braavos Launchpad
        </div>
      </div>
    </div>
  );
}

export default Launchpad;
