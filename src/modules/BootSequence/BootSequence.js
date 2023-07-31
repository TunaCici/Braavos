import React, { useState, useEffect } from "react";

/* Static assets */
import boot_sequence from "../../static/boot_sequence.json";
import { BOOT_STATES } from "../../static/enumerations.js";

/* Modules */
import CommandLine from "../../common/CommandLine/CommandLine.js";

/* CSS */
import "./BootSequence.css";

function BootSequence(props) {
  const [commandLines, setCommandLines] = useState([]);
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

    props.setBootState(BOOT_STATES.BOOTING);

    for (let i = 0; i < boot_sequence.length; i++) {
      let log = "[" + (delay / 1000).toFixed(6) + "] " + boot_sequence[i].text;

      /* Add to the display queue */
      setTimeout(() => {
        appendCommandLine(<CommandLine text={log} key={i}></CommandLine>);
      }, delay);

      delay += boot_sequence[i].delay;
    }
    
    setTimeout(() => {
      props.setBootState(BOOT_STATES.SUCCESS);
    }, delay);

  }, []);

  /* Scroll to bottom of the screen */
  useEffect(() => {
    if (document.body.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [commandLines]);

  return (
    <div id="bootScene" className="boot-scene">
      {commandLines}
      {commandLines.length === boot_sequence.length && <span></span>}
    </div>
  );
}

export default BootSequence;
