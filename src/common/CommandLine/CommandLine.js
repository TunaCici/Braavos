import React, { useState, useEffect } from "react";

import "./CommandLine.css";

function CommandLine(props) {
  return (
    <div className="command-line">
      {props.text}
    </div>
  )
}

export default CommandLine;
