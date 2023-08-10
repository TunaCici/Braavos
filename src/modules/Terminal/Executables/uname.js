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
        retMsg += "0.5.0-beta" + " ";
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

export { uname };
