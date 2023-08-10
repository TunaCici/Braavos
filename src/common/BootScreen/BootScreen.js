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

  const staticFiles = [];

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
    /* Retrieve all files under /static regardless of the file type */
    function importAll(r) {
      r.keys().forEach(key => staticFiles.push(r(key)));
    }
    
    importAll(require.context("../../static/", true, /.*/));

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
