/* Static assets */
import virtfs from "../../../static/virtual_filesystem.json";

function help(args) {
  let retMsg = "";

  let availableCommands = [];

  for (let node in virtfs.bin) {
    if (virtfs.bin[node][".type"] === "executable") {
      let command = node;
      if (command === "contact") {command = "contact ";} /* TODO: Ugly code alert! */
      let man = virtfs.bin[node][".man"];

      availableCommands.push(command + "\t- " + man);
    }
  }

  retMsg = availableCommands.join("\n");

  return retMsg;
}

export { help };
