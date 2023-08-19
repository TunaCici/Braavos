/* Static assets */
import virtfs from "../../../static/virtual_filesystem.json";

function cd(args) {  
  if (2 < args.length) {
    return "too many arguments";
  }

  if (1 === args.length) {
    return "cd: /root";
  }

  if (args[0].includes(".")) {
    return "invalid directory (relative path is not yet supported)";
  }

  if (args[0] === "/") {
    return "cd: /";
  }

  let path = args[0].split("/").filter((item) => item !== "");
  let i = 0;
  let node = virtfs;

  console.debug("path:", path);

  while (i < path.length) {
    console.debug("path[" + i + "]:", path[i]);
    
    if (node[path[i]] && node[path[i]][".type"] === "directory") {
      console.debug("moving in to:", path[i]);
      node = node[path[i]];
      i++;
    } else {
      break;
    }
  }

  if (i !== path.length) {
    return "cd: no such file or directory " + args[0];
  }

  /* Remove '/' if it's the last character */
  if (args[0].endsWith("/")) {
    args[0] = args[0].slice(0, -1);
  }

  return "cd: " + args[0];
}

export { cd };
