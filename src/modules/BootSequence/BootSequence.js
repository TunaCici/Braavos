import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

/* Static assets */
import boot_sequence from "../../static/boot_sequence.json";
import { BOOT_STATES } from "../../static/enumerations.js";

/* Modules */
import CommandLine from "../../common/CommandLine/CommandLine.js";
import BootScreen from "../../common/BootScreen/BootScreen.js";

/* CSS */
import "./BootSequence.css";

function BootSequence(props) {
  const navigate = useNavigate();

  const [commandLines, setCommandLines] = useState([]);
  const [stage, setStage] = useState(0);

  const AsyncLock = require("async-lock");
  const lock = new AsyncLock();

  /* Append a command line (but use locks in order prevent racing) */
  function appendCommandLine(obj) {
    lock.acquire(
      "boot-sequence-lock",
      function (done) {
        /* START Critical section */

        setCommandLines((commandLines) => [...commandLines, obj]);

        /* END critical section */
        done();
      },
      function (err, ret) {}
    );
  }

  /* Initialization */
  useEffect(() => {
    let delay = 0;

    props.setBootState(BOOT_STATES.STAGE_1);

    for (let i = 0; i < boot_sequence.length; i++) {
      let log = "[" + (delay / 1000).toFixed(6) + "] " + boot_sequence[i].text;

      /* Add to the display queue */
      setTimeout(() => {
        appendCommandLine(<CommandLine text={log} key={i}></CommandLine>);
      }, delay);

      delay += boot_sequence[i].delay;
    }
    
    /* TODO: Skipt the BootScreen for now. It is pain-in-the-ahh.. */
    setTimeout(() => {
      /* props.setBootState(BOOT_STATES.STAGE_2); */
      navigate("/launchpad", { replace: true });
    }, delay);

  }, []);

  /* Scroll to bottom of the screen if too many elements */
  useEffect(() => {
    const bootScene = document.getElementById("bootScene");
    const bootSceneHeight = bootScene.clientHeight;
    const bootSceneScrollHeight = bootScene.scrollHeight;
    
    if (bootSceneScrollHeight > bootSceneHeight) {
      bootScene.scrollTop = bootSceneScrollHeight - bootSceneHeight;
    }
  }, [commandLines]);

  return (
    <div id="bootScene" className="boot-scene">
      { props.getBootState() === BOOT_STATES.STAGE_1 && commandLines }
      { props.getBootState() === BOOT_STATES.STAGE_2 && <BootScreen setBootState={props.setBootState} /> }
    </div>
  );
}

export default BootSequence;
