/* Static */
import virtfs from "../../static/virtual_filesystem.json";

/* Helper functions */
function getBaseURL() {
  let baseURL = "localhost";

  try {
    const parsedURL = new URL(window.location.href);
    baseURL = parsedURL.hostname;
  } catch (error) {
    console.error("Invalid URL:", error.message);
  }

  return baseURL;
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  let browser = "Unkown browser";

  if (userAgent.indexOf("Chrome") > -1) {
    browser = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browser = "Safari";
  } else if (userAgent.indexOf("Firefox") > -1) {
    browser = "Firefox";
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1) {
    browser = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    browser = "Microsoft Edge"
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browser = "Opera";
  }

  return browser;
};

function sh() {
  return "";
}

function echo(args) {
  return args.join(" ");
}

function ls(args) {
  let retMsg = "";

  let seperator = " ";
  let listDir = "."
  let listAll = false;

  /* Parse arguments */
  if (args.length > 0) {
    if (!args[0].startsWith("-")) {
      listDir = args[0];
    }

    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith("-")) {
        if (args[i].includes("a")) {
          listAll = true;
        }

        if (args[i].includes("l")) {
          seperator = "\n";
        }
      }
    }
  }

  if (listDir === ".") {
    for (let node in virtfs) {  
      if (listAll || !node.startsWith("." )) {
        retMsg += node + seperator;
      }
    }
  } else {
    for (let node in virtfs[listDir]) {
      if (listAll || !node.startsWith(".")) {
        retMsg += node + seperator;
      }
    }
  }

  return retMsg;
}

function clear(args) {
  return "clear";
}

function history(args) {
  return "history";
}

function uname(args) {
  let retMsg = "";
  const validFlags = "-amnoprsv";

  /* Check if args are valid */
  for (let i = 0; i < args.length; i++) {
    if (!validFlags.includes(args[i])) {
      return "uname: invalid option -- '" + args[i] + "'\nusage: uname [-amnoprsv]";
    }
  }

  if (args.length === 0) {
    args = ["-o"];
  } else if (args[0] === "-a") {
    args = ["-mnoprsv"];
  }

  /* Get the web engine currently used using userAgent *

  /* Parse all possible flags -amnoprsv for args[0] */
  for (let i = 0; i < args[0].length; i++) {
    switch (args[0][i]) {
      case "m":
        retMsg += "ARM64" + " ";
        break;
      case "n":
        retMsg += getBaseURL() + " ";
        break;
      case "o":
        retMsg += "Braavos" + " ";
        break;
      case "p":
        retMsg += "arm" + " ";
        break;
      case "r":
        retMsg += "0.1.0-alpha" + " ";
        break;
      case "s":
        retMsg += getBrowser() + " ";
        break;
      case "v":
        retMsg += "react-18.0.2 (macOS 13.3.1-ventura) Wed Apr 26 4:52:48 PM UTC 2023" + " ";
        break;
      default:
        break;
    }
  }

  return retMsg;
}

function searchPath(command) {
  for (let node in virtfs.bin) {
    if (node === command && virtfs.bin[node][".type"] === "executable") {
      return true;
    }
  }

  return false;
}

function interpreteCmd(shellPrompt) {
  let retMsg = "";

  let command = shellPrompt.split(" ")[0];
  let args = shellPrompt.split(" ").slice(1);
  
  console.debug("command:", command, "args:", args);

  let isExecutable = searchPath(command);

  if (isExecutable) {
    try {
      retMsg = eval(command + "(" + JSON.stringify(args) + ")");
    }
    catch (error) {
      retMsg = "sh: " + command + ": not yet implemented";
    }
  } else {
    retMsg = "sh: command not found: " + command;
  }

  return retMsg;
}

export { interpreteCmd };
