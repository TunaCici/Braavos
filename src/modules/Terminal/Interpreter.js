/* Static */
import virtfs from "../../static/virtual_filesystem.json";

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
      if (listAll || !node.startsWith(".")) {
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

  retMsg = retMsg.replace("type ", "");

  return retMsg;
}

function searchPath(command) {
  for (let node in virtfs.bin) {
    if (node === command && virtfs.bin[node].type === "executable") {
      return true;
    }
  }

  return false;
}

function interpreteCmd(shellPrompt) {
  let retMsg = "";

  let command = shellPrompt.split(" ")[0];
  let args = shellPrompt.split(" ").slice(1);
  
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
