/* CSS */

import "../../../static/common.css";

const darwin = [
"                        .:---           ",
"                      :=====-           ",
"                    .=======            ",
"                   .======-             ",
"                   -====-.              ",
"         .::::..   :-:.   .:::::.       ",
"     .-==========--::::-==========-:.   ",
"   :=================================-  ",
"  -=================================:.  ",
" -================================-     ",
":================================-      ",
"=++++++++++++++++++++++++++++++++:      ",
"+++++++++++++++++++++++++++++++++:      ",
"+++++++++++++++++++++++++++++++++-      ",
"=*********************************:     ",
".**********************************=    ",
" =***********************************=: ",
"  +************************************-",
"   +**********************************- ",
"    +********************************-  ",
"     -==============================.   ",
"      .---------------------------:     ",
"        .--------:.....::-------:    "
];

const linux = [                                                                       
"               .                                            ",
" -+++++-      +@@-                                          ",
"   @@@         --                                       ..  ",
"   @@@       :=*#  .-+*+-+*#*:  .=+#:  -+**  +***+ .+*+-..  ",
"   @@@       .+@@.  :@@#:.:#@@  .-@@-  .#@@   .%@#..#+      ",
"   @@@        =@@.   @@*   -@@.  :@@-   #@@     +@@@:       ",
"  @@@    :=. =@@.   @@*   -@@.  :@@=   #@@     =%%@#        ",
"   @@@    *@: =@@.   @@*   -@@:  .@@%-::%@@   :%*  *@@:     ",
" -++++++++++.=++++-.++++= :++++-  :+**=:=+++.++++  =++++    ",
"                                      ......::::::::::..    ",
"               ....:::::-----=========++++++++++++++==-:    ",
"   ..:::--------========================---:::...           ",
" .---------------======---:::....                           ",
" :--------------::..                                        ",
" :-------::.                                                ",
"  ---:.                                                     ",
"   . "
]

const win32 = [
"                              .....:::::",
"                  ...::::--------------:",
"  ....:::::-----  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"................  ..................... ",
"................  ......................",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"----------------  :--------------------:",
"  .....::::-----  :--------------------:",
"                  ...:::::-------------:",
"                               .....:::."
];

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

const whoamiLine = 3;
const dashLine = 4;
const osLine = 5;
const hostLine = 6;
const kernelLine = 7;
const dateLine = 8;
const timeLine = 9
const shellLine = 10;
const themeLine = 11;
const fontLine = 12;
const projectLine = 13;

const whoami = "Hello, " + getBrowser();
const myDash = "-".repeat(36);
const myOS = "Operating System: " + "Braavos";
const myHost = "Host: " + getBaseURL();
const myKernel = "Kernel Version: " + "0.5.0-beta";
const myDate = "Date: " + new Date().toDateString();
const myTime = "Time: " + new Date().toLocaleTimeString();
const myShell = "Shell: " + "sh 0.3.x";
const myTheme = "Theme: " + "dark";
const myFont = "Font: Hack Bold";
const projectURL = "Project: " + "github.com/TunaCici/Braavos";
const myHelp = "Type 'help' to get started.";
const myEnjoy = "Enjoy life!";

function printDarwin() {
  let lines = [];
  let color = "";

  for (let i = 0; i < darwin.length; i++) {
    let lineText = darwin[i];

    if (i < 8) {
      color = "cool-green";
    } else if (i < 12) {
      color = "cool-yellow";
    } else if (i < 14) {
      color = "cool-orange";
    } else if (i < 17) {
      color = "cool-red";
    } else if (i < 20) {
      color = "cool-purple";
    } else {
      color = "cool-blue";
    }

    let leadingSpaces = 4;

    switch (i) {
      case whoamiLine:
        lineText += " ".repeat(leadingSpaces) + whoami;
        break;
      case dashLine:
        lineText += " ".repeat(leadingSpaces) + myDash;
        break;
      case osLine:
        lineText += " ".repeat(leadingSpaces) + myOS;
        break;
      case hostLine:
        lineText += " ".repeat(leadingSpaces) + myHost;
        break;
      case kernelLine:
        lineText += " ".repeat(leadingSpaces) + myKernel;
        break;
      case dateLine:
        lineText += " ".repeat(leadingSpaces) + myDate;
        break;
      case timeLine:
        lineText += " ".repeat(leadingSpaces) + myTime;
        break;
      case shellLine:
        lineText += " ".repeat(leadingSpaces) + myShell;
        break;
      case themeLine:
        lineText += " ".repeat(leadingSpaces) + myTheme;
        break;
      case fontLine:
        lineText += " ".repeat(leadingSpaces) + myFont;
        break;
      case projectLine:
        lineText += " ".repeat(leadingSpaces) + projectURL;
        break;
      default:
        break;
    }

    /* Last two lines "gives-gift" & "give-life" */
    if (i === darwin.length - 3) {
      lineText += " ".repeat(leadingSpaces) + myHelp;
    } else if (i === darwin.length - 2) {
      lineText += " ".repeat(leadingSpaces) + myEnjoy;
    }

    lines.push(
      <div key={i} className={color}>
        {lineText}
      </div>
    );
  }

  return (
    <div>
      {lines}
    </div>
  )
};

function printLinux() {
  let lines = [];
  let color = "";

  for (let i = 0; i < linux.length; i++) {
    let lineText = linux[i];

    let leadingSpaces = 0;

    if (9 <= i) {
      color = "cool-yellow";
    }

    switch (i) {
      case whoamiLine:
        lineText += " ".repeat(leadingSpaces) + whoami;
        break;
      case dashLine:
        lineText += " ".repeat(leadingSpaces) + myDash;
        break;
      case osLine:
        lineText += " ".repeat(leadingSpaces) + myOS;
        break;
      case hostLine:
        lineText += " ".repeat(leadingSpaces) + myHost;
        break;
      case kernelLine:
        lineText += " ".repeat(leadingSpaces) + myKernel;
        break;
      case dateLine:
        lineText += " ".repeat(leadingSpaces) + myDate;
        break;
      case timeLine:
        lineText += " ".repeat(leadingSpaces) + myTime;
        break;
      case shellLine:
        lineText += " ".repeat(leadingSpaces) + myShell;
        break;
      case themeLine:
        lineText += " ".repeat(leadingSpaces) + myTheme;
        break;
      case fontLine:
        lineText += " ".repeat(leadingSpaces) + myFont;
        break;
      case projectLine:
        lineText += " ".repeat(leadingSpaces) + projectURL;
        break;
      default:
        break;
    }

    /* Last two lines "gives-gift" & "give-life" */
    if (i === linux.length - 3) {
      lineText += " ".repeat(leadingSpaces) + myHelp;
    } else if (i === linux.length - 2) {
      lineText += " ".repeat(leadingSpaces) + myEnjoy;
    }

    lines.push(
      <div key={i} className={color}>
        {lineText}
      </div>
    );
  }

  return (
    <div>
      {lines}
    </div>
  );
};

function printWindows() {
  let lines = [];

  for (let i = 0; i < win32.length; i++) {
    let lineText = win32[i];

    let leadingSpaces = 4;

    switch (i) {
      case whoamiLine:
        lineText += " ".repeat(leadingSpaces) + whoami;
        break;
      case dashLine:
        lineText += " ".repeat(leadingSpaces) + myDash;
        break;
      case osLine:
        lineText += " ".repeat(leadingSpaces) + myOS;
        break;
      case hostLine:
        lineText += " ".repeat(leadingSpaces) + myHost;
        break;
      case kernelLine:
        lineText += " ".repeat(leadingSpaces) + myKernel;
        break;
      case dateLine:
        lineText += " ".repeat(leadingSpaces) + myDate;
        break;
      case timeLine:
        lineText += " ".repeat(leadingSpaces) + myTime;
        break;
      case shellLine:
        lineText += " ".repeat(leadingSpaces) + myShell;
        break;
      case themeLine:
        lineText += " ".repeat(leadingSpaces) + myTheme;
        break;
      case fontLine:
        lineText += " ".repeat(leadingSpaces) + myFont;
        break;
      case projectLine:
        lineText += " ".repeat(leadingSpaces) + projectURL;
        break;
      default:
        break;
    }

      /* Last two lines "gives-gift" & "give-life" */
    if (i === win32.length - 3) {
      lineText += " ".repeat(leadingSpaces) + myHelp;
    } else if (i === win32.length - 2) {
      lineText += " ".repeat(leadingSpaces) + myEnjoy;
    }

    lines.push(
      <div key={i} className="cool-blue">
        {lineText}
      </div>
    );
  }

  return (
    <div>
      {lines}
    </div>
  );
};


function neofetch(args) {
  let retHTML = "";
  let os = navigator.userAgent

  if (os.indexOf("Mac OS X") !== -1) {
    os = "darwin";
  } else if (os.indexOf("Linux") !== -1) {
    os = "linux";
  } else if (os.indexOf("Windows") !== -1) {
    os = "win32";
  } else {
    os = "linux";
  }

  if (0 < args.length) {
    switch (args[0]) {
      case "darwin":
        os = "darwin";
        break;
      case "linux":
        os = "linux";
        break;
      case "win32":
        os = "win32";
        break;
      default:
        os = "linux"
        break;
    }
  }

  switch (os) {
    case "darwin":
      retHTML = printDarwin();
      break;
    case "linux":
      retHTML = printLinux();
      break;
    case "win32":
      retHTML = printWindows();
      break;
    default:
      break;
  }

  return retHTML;
}

export { neofetch }
