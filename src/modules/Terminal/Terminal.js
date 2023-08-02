import React, { useState, useEffect } from "react";
import { interpreteCmd } from "./Interpreter";

/* Modules */
import Prompt from "../../common/Prompt/Prompt";
import CommandLine from "../../common/CommandLine/CommandLine";

/* CSS */
import "./Terminal.css";

function Terminal(props) {
  /* TODO: buffer & history should be stored in a state */
  const [buffer, setBuffer] = useState([]);
  const [history, setHistory] = useState([]);

  function addToBuffer(obj) { setBuffer((buffer) => [...buffer, obj]); }
  function addToHistory(obj) { setHistory((history) => [...history, obj]); }

  function clearBuffer() { setBuffer([]); }
  function clearHistory() { setHistory([]); }

  function bufferSize() { return buffer.length; }
  function historySize() { return history.length; }

  function removeHistoryItem(index) {
    let newHistory = history.slice();
    newHistory.splice(index, 1);
    setHistory(newHistory);
  }

  function interpreter(event, shellPrompt) {
    let response = "";

    /* TODO: Browse history */
    /* TODO: Set the 'response' variable to the history item (e.g. echo "hi") */
    switch (event.key) {
      case "ArrowUp":
        break
      case "ArrowDown":
        break;
      default:
        break;
    }

    if (shellPrompt) {
      response = interpreteCmd(shellPrompt);
    }

    return response;
  };

  /* Scroll to bottom of the screen */
  useEffect(() => {
    if (document.body.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [buffer]);

  return (
    <div id="terminal" className="terminal"> 
      {buffer}
      <Prompt
        key={"main-prompt"}
        addToBuffer={addToBuffer}
        addToHistory={addToHistory}
        bufferSize={bufferSize}
        historySize={historySize}
        interpreter={interpreter}
        isActive={true}
      />
    </div>
  );
}

export default Terminal;
