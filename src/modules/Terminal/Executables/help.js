/* Static assets */
import virtfs from "../../../static/virtual_filesystem.json";

function help(args) {
  const leadingSpaces = 12;

  let retMsg = "";

  let availableCommands = [];

  for (let node in virtfs.bin) {
    if (virtfs.bin[node][".type"] === "executable") {
      let command = node;
      if (command === "contact") {command = "contact ";} /* TODO: Ugly code alert! */
      let man = virtfs.bin[node][".man"];

      let fillCount = leadingSpaces - command.length;
      let fmt = command + " ".repeat(fillCount) + "- " + man;

      availableCommands.push(fmt);
    }
  }

  retMsg = availableCommands.join("\n");

  return retMsg;
}

export { help };
