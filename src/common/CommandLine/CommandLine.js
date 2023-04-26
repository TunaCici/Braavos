import React, { useState, useEffect } from "react";

import "./CommandLine.css";

function CommandLine(props) {
  return <p className="command-line">{props.text}</p>;
}

export default CommandLine;
