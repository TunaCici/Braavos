import React, { useState, useEffect } from "react";

/* Static assets */
import rotating_cube from "../../static/rotating_cube.gif";
import { BOOT_STATES } from "../../static/enumerations.js";

/* CSS */
import "./BootScreen.css";

function BootScreen(props) {

  /* TODO: Preload static / heavy assets here AND THEN setBootState(...) */
  useEffect(() => {
    setTimeout(() => {
      let bootText = document.getElementById("bootText");
      let rotatingCube = document.getElementsByClassName("rotating-cube")[0];

      rotatingCube.classList.remove("fade-in");
      rotatingCube.classList.add("fade-out");
      
      bootText.classList.remove("fade-in");
      bootText.classList.add("fade-out");
      bootText.innerHTML = "All done";
    }, 2000);

    setTimeout(() => {
      props.setBootState(BOOT_STATES.SUCCESS);
    }, 3000);
  }, []);

  return (
    <div id="bootScreen" className="boot-screen">
      <img src={rotating_cube} className="rotating-cube fade-in" alt="Rotating cube" />

      <p id="bootText" className="boot-text fade-in"> Booting up... </p>
    </div>
  );
}

export default BootScreen;
