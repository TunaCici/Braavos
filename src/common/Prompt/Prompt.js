import React, { useState, useEffect } from "react";

/* Modules */
import CommandLine from "../CommandLine/CommandLine";

/* CSS */
import "./Prompt.css";

function Prompt(props) {

  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    let browser = "un-be-knownst";

    if (userAgent.indexOf("Chrome") > -1) {
      browser = "shiny-chrome-boi";
    } else if (userAgent.indexOf("Safari") > -1) {
      browser = "safari-superstar";
    } else if (userAgent.indexOf("Firefox") > -1) {
      browser = "fire-breathing-fox";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1) {
      browser = "ancient-net-explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      browser = "ms-cutting-edge";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      browser = "operatic-masterpiece";
    }

    return browser;
  };

  const getBaseURL = () => {
    let baseURL = "127.0.0.1";

    try {
      const parsedURL = new URL(window.location.href);
      baseURL = parsedURL.hostname;
    } catch (error) {
      console.error("Invalid URL:", error.message);
    }

    return baseURL;
  }
    
  const getPwd = () => {
    return "~";
  };

  const onUserInput = (event) => {
    /* Resize */
    event.target.style.width = event.target.value.length + "ch";
  };

  const onUserKeyDown = (event) => {
    const shellPrompt = event.target.value;

    if (event.key === "Enter") {
      props.appendToHistory(
        <Prompt
          key={"history-prompt-" + props.historySize()}
          isActive={false}
          shellPrompt={shellPrompt}
        />
      );

      /* INTERPRETER */
      const response = props.interpreter(shellPrompt);
      /* END INTERPRETER */

      props.appendToHistory(
        <CommandLine
          key={"history-cmd-" + props.historySize()}
          text={response}
        />
      );

      event.target.value = "";
    } else if (event.ctrlKey && (
        event.key === "c" || event.key === "C" ||
        event.key === "z" || event.key === "Z")) {
      props.appendToHistory(
        <Prompt
          key={"history-prompt-" + props.historySize()}
          isActive={false}
          shellPrompt={shellPrompt + "^" + event.key}
        />
      );

      event.target.value = "";
    }
  };

  return (
    <div id="prompt" className="prompt">
      <span className="user-info-container">
        <span className="user-name">{ getBrowser() }@</span> 
        <span className="host-name">{ getBaseURL() }</span>
        <span>:</span>
        <span className="working-dir">{ getPwd() }</span>
      </span>

      <span className="user-input-container">
        <span> # </span>

        {props.isActive ? (
          <input
          id="userInput"
          type="text" className="user-input"
          autoFocus={true}
          onBlur={({ target }) => target.focus()}
          onChange={onUserInput}
          onKeyDown={onUserKeyDown}
          spellCheck={false}
          autoComplete="off"
          disabled={false}
        />
        ) : (
          <span className="user-input">{props.shellPrompt}</span>
        )}

        {props.isActive && <span className="blinker"></span>}
      </span>
    </div>
  );
}

export default Prompt;