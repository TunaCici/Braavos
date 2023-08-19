import React, { useState, useEffect } from "react";

/* Modules */

/* Static */

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
    
  const onUserInput = (event) => {
    /* Resize. _min width is 1ch_ */
    if (1 <= event.target.value.length) {
      event.target.style.width = event.target.value.length + "ch";
    }
  };

  const onUserKeyDown = (event) => {
    const shellPrompt = event.target.value;

    switch (event.key) {
      case "Enter":
        props.addToBuffer(
          <Prompt
            key={"buffer-prompt-" + props.bufferSize()}
            getCwd={props.getCwd}
            isActive={false}
            shellPrompt={shellPrompt}
          />
        );
  
        if (shellPrompt) {
          props.addToHistory(shellPrompt);
        }
  
        event.target.value = "";
        break;
      case "ArrowUp":
        props.decIter();
        break;
      case "ArrowDown":
        props.incIter();
        break
      case "c":
      case "C":
      case "z":
      case "Z":
        if (event.ctrlKey) {
          event.target.value = "";
    
          props.addToBuffer(
            <Prompt
              key={"buffer-prompt-" + props.bufferSize()}
              getCwd={props.getCwd}
              isActive={false}
              shellPrompt={shellPrompt + "^" + event.key}
            />
          );
        }
        break;
      default:
        break;
    };
  }
  return (
    <div id="prompt" className="prompt">
      <span className="user-info-container">
        <span className="user-name">{ getBrowser() }@</span> 
        <span className="host-name">{ getBaseURL() }</span>
        <span>:</span>
        <span className="working-dir">{ props.getCwd() }</span>
      </span>

      <span className="user-input-container">
        <span> # </span>

        {props.isActive ? (
          <input
          id="userInput"
          type="text"
          className="user-input breathing-space"
          autoFocus={true}
          onChange={onUserInput}
          onKeyDown={onUserKeyDown}
          spellCheck={false}
          autoComplete="off"
          disabled={false}
        />
        ) : (
          <span className="user-input">{props.shellPrompt}</span>
        )}
      </span>
    </div>
  );
}

export default Prompt;