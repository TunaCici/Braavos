/* Static */
import virtfs from "../../../static/virtual_filesystem.json";

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

export { ls };
