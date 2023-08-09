import React, { useState, useEffect } from "react";

/* Static assets */
import rotating_cube from "../../static/rotating_cube.gif";
import { BOOT_STATES } from "../../static/enumerations.js";


/* CSS */
import "./BootScreen.css";

function preloadStaticFiles(files, onFileLoaded) {
  const promises = files.map(async file => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load file: ${file}`);
      }

      onFileLoaded(file);
      return await response.blob();
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  return Promise.all(promises);
}

function BootScreen(props) {
  const [loadedFiles, setLoadedFiles] = useState({});

  const staticFiles = [
    "../static/fonts/hack-regular.woff2",
    "../static/fonts/hack-regular.woff",
    "../static/fonts/hack-bold.woff2",
    "../static/fonts/hack-bold.woff",
    "../static/fonts/hack-italic.woff2",
    "../static/fonts/hack-italic.woff",
    "../static/fonts/hack-bolditalic.woff2",
    "../static/fonts/hack-bolditalic.woff",
    "../static/rotating_cube.gif",
    "../static/virtual_filesystem.json",
    "../static/common.css",
    "../static/writings.json",
    "../static/projects.json",
    "../static/terminal_icon.png",
    "../static/hugo-theme-cactus-logo.png",
    "../static/tuna_cici_sign_bw.gif",
    "../static/tuna_cici_sign_bw.svg",
    "../static/tuna_cici_sign_color.svg"
  ];

  function onFileLoaded(file) {
    setLoadedFiles(prevState => {
        return {
          ...prevState,
          [file]: true,
        };
      }
    );
  }

  useEffect(() => {
    let bootText = document.getElementById("bootText");
    let loadedCount = Object.keys(loadedFiles).length;

    if (loadedCount !== 0) {
      let latestLoadedFile = Object.keys(loadedFiles).pop();
      let baseName = latestLoadedFile.split("/").pop();

      bootText.innerHTML = `Loading assets [${loadedCount}/${staticFiles.length}] ${baseName}`;
      
    } else if (loadedCount === staticFiles.length) {
      let rotatingCube = document.getElementById("rotatingCube");

      bootText.innerHTML = "All done. Handing over to the Launchped...";

      rotatingCube.classList.remove("fade-in");
      rotatingCube.classList.add("fade-out");
      
      bootText.classList.remove("fade-in");
      bootText.classList.add("fade-out");
    }
  }, [loadedFiles]);

  useEffect(() => {
    preloadStaticFiles(staticFiles, onFileLoaded).then(() => {
      props.setBootState(BOOT_STATES.SUCCESS);
    }).catch(() => {
      props.setBootState(BOOT_STATES.ERROR);
    });
  }, []);

  return (
    <div id="bootScreen" className="boot-screen">
      <img id="rotatingCube" src={rotating_cube} className="rotating-cube fade-in" alt="Rotating cube" />
      <p id="bootText" className="boot-text fade-in"> Booting up... </p>
    </div>
  );
}

export default BootScreen;
