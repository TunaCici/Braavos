import React, { useState, useEffect } from "react";
import { interpreteCmd } from "./Interpreter";

/* Modules */
import Prompt from "../../common/Prompt/Prompt";
import CommandLine from "../../common/CommandLine/CommandLine";

/* CSS */
import "./Terminal.css";

function Terminal(props) {
  /* TODO: buffer & history should be stored in a state */
  const [buffer, setBuffer] = useState([]); /* Command outputs */
  const [history, setHistory] = useState([]); /* Command history */
  const [iter, setIter] = useState(0); /* Iterator for history */

  function addToBuffer(obj) { setBuffer((buffer) => [...buffer, obj]); }
  function addToHistory(obj) { setHistory((history) => [...history, obj]); }

  function incIter() {
    if (iter < history.length - 1) { setIter(iter + 1); }
  }
  function decIter() {
    if (iter === 0 ) { setIter(Math.max(0, history.length - 1)); }
    else if (0 < iter ) { setIter(iter - 1); }
  }

  function getBuffer(index) { return buffer[index]; }
  function getHistory(index) { return history[index]; }

  function clearBuffer() { setBuffer([]); }
  function clearHistory() { setHistory([]); }

  function bufferSize() { return buffer.length; }
  function historySize() { return history.length; }

  function removeHistoryItem(index) {
    let newHistory = history.slice();
    newHistory.splice(index, 1);
    setHistory(newHistory);
  }

  /* Parse the latest command from the 'queue' */
  useEffect(() => {
    let shellPrompt = history[history.length - 1];
    let response = "";

    if (shellPrompt) {
      response = interpreteCmd(shellPrompt);

      /* TODO: Completely fucked up design here.. When is global state mgmt? */
      if (response === "clear") {
        clearBuffer();
        return;
      } else if (response === "history") {
        response = ""

        for (let i = 0; i < history.length; i++) {
          response += i + " " + history[i] + "\n";
        }
      }

      addToBuffer(
        <CommandLine
          key={"buffer-cmdline-" + buffer.length}
          text={response}
        />
      );
    }
  }, [history]);

  /* Scroll to bottom of the screen */
  useEffect(() => {
    if (document.body.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [buffer]);

  /* Handle history browsing (a.k.a. Arrow keys) */
  useEffect(() => {
    /* TODO: This is WAAY to dirty...*/
    let userInput = document.getElementById("userInput");
    let newValue = "";
    let newWidth = "1ch";

    if (history[iter]) {
      newValue= history[iter];
      newWidth = history[iter].length + "ch";
    }

    userInput.value = newValue;
    userInput.style.width = newWidth;

  }, [iter]);

  const onTerminalClick = (e) => {
    let userInput = document.getElementById("userInput");
    userInput.focus();
  };

  return (
    <div id="terminal" className="terminal" onClick={ onTerminalClick }> 
      {buffer}
      <Prompt
        id="main-prompt"
        key={"main-prompt"}
        addToBuffer={addToBuffer}
        addToHistory={addToHistory}
        bufferSize={bufferSize}
        historySize={historySize}
        incIter={incIter}
        decIter={decIter}
        isActive={true}
      />
    </div>
  );
}

export default Terminal;
