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

  if (args.length === 0) {
    for (let node in virtfs) {
      retMsg += node + " ";
    }
  } else {
    for (let node in virtfs[args[0]]) {
      retMsg += node + " ";
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
