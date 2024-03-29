/* Static assets */
import virtfs from "../../../static/virtual_filesystem.json";

function man(args) {
  let retMsg = "";

  /* Last argument is always the environment variable; remove it */
  args.pop();

  if (args.length === 0) {
    return "usage: man [command/file]";
  }
  
  let target = args[0];

  if (virtfs.bin[target] === undefined) {
    return "No manual entry for " + target;
  }

  retMsg = virtfs.bin[target][".man"];

  return retMsg;
}

export { man };
