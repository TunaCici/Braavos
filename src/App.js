import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* Static assets */
import rotating_cube from "./static/rotating_cube.gif";
import { BOOT_STATES } from "./static/enumerations.js";

/* Modules */
import BootSequence from "./modules/BootSequence/BootSequence";
import Launchpad from "./modules/Launchpad/Launchpad";
import Terminal from "./modules/Terminal/Terminal";

/* CSS */
import "./App.css";

function App() {
  /* Initial state values */
  const [BOOT_STATE, setState] = useState(BOOT_STATES.INITIAL);

  const setBootState = (newState) => {
    setState(newState);
  };

  useEffect(() => {
    console.debug("BOOT_STATE: ", BOOT_STATE);

    switch (BOOT_STATE) {
      case BOOT_STATES.INITIAL:
        break;
      case BOOT_STATES.BOOTING:
        break;
      case BOOT_STATES.SUCCESS:
        window.location.href = "/launchpad";
        break;
      case BOOT_STATES.ERROR:
        break;
      default:
        break;
    }
  }, [BOOT_STATE]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BootSequence setBootState={setBootState} />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/terminal" element={<Terminal />} />

          {/* 404 to '/' */}
          <Route path="*" element={<BootSequence setBootState={setBootState} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
