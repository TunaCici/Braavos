import React, { useState, useEffect } from "react";

/* Modules */
import Prompt from "../../common/Prompt/Prompt";
import CommandLine from "../../common/CommandLine/CommandLine";

/* CSS */
import "./Terminal.css";

function Terminal(props) {
  const [history, setHistory] = useState([]);

  function appendToHistory(obj) {
    setHistory((history) => [...history, obj]);
  }

  function historySize() {
    return history.length;
  }

  /* Scroll to bottom of the screen */
  useEffect(() => {
    if (document.body.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [history]);

  return (
    <div id="terminal" className="terminal"> 
      {history}
      <Prompt
        key={"history-prompt-0"}
        appendToHistory={appendToHistory}
        historySize={historySize}
        isActive={true}
      />
    </div>
  );
}

export default Terminal;