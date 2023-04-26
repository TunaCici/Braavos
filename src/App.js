import { useState, useEffect } from "react";
import "./App.css";

/* Static assets */
import rotating_cube from "./static/rotating_cube.gif";
import { BOOT_STATES } from "./static/enumerations.js";

/* Modules */
import BootSequence from "./modules/BootSequence/BootSequence";
import CommandLine from "./common/CommandLine/CommandLine";

function App() {
  /* Initial state values */
  const [BOOT_STATE, setState] = useState(BOOT_STATES.INITIAL);

  const setBootState = (newState) => {
    setState(newState);

    switch (newState) {
      case BOOT_STATES.INITIAL:
        break;
      case BOOT_STATES.LOADING:
        break;
      case BOOT_STATES.SUCCESS:
        break;
      case BOOT_STATES.ERROR:
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <BootSequence setBootState={setBootState}></BootSequence>
      </header>
    </div>
  );
}

export default App;
