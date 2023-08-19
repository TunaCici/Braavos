/* Static */
import virtfs from "../../static/virtual_filesystem.json";

/* Executables import default */
import { echo } from "./Executables/echo.js";
import { ls } from "./Executables/ls.js";
import { cd } from "./Executables/cd.js";
import { pwd } from "./Executables/pwd.js";
import { sh } from "./Executables/sh.js";
import { exit } from "./Executables/exit.js";
import { reboot } from "./Executables/reboot";
import { clear } from "./Executables/clear.js";
import { history } from "./Executables/history.js";
import { uname } from "./Executables/uname.js";
import { date } from "./Executables/date.js";
import { help } from "./Executables/help.js";
import { man } from "./Executables/man.js";
import { blog } from "./Executables/blog";
import { about } from "./Executables/about";
import { welcome } from "./Executables/welcome";
import { projects } from "./Executables/projects";
import { writings } from "./Executables/writings";
import { contact } from "./Executables/contact";
import { neofetch } from "./Executables/neofetch";

/* Register executables */
var context = {};

context["echo"] = echo;
context["ls"] = ls;
context["cd"] = cd;
context["pwd"] = pwd;
context["sh"] = sh;
context["exit"] = exit;
context["reboot"] = reboot;
context["clear"] = clear;
context["history"] = history;
context["uname"] = uname;
context["date"] = date;
context["help"] = help;
context["man"] = man;
context["blog"] = blog;
context["about"] = about;
context["welcome"] = welcome;
context["projects"] = projects;
context["writings"] = writings;
context["contact"] = contact;
context["neofetch"] = neofetch;

/* Thanks to: https://www.inflectra.com/Support/KnowledgeBase/KB242.aspx */
function execFn(fnName, ctx /*, args */) 
{
  let args = Array.prototype.slice.call(arguments, 2);

  return ctx[fnName].apply(ctx, args);
}

function searchPath(command) {
  for (let node in virtfs.bin) {
    if (node === command && virtfs.bin[node][".type"] === "executable") {
      return true;
    }
  }

  return false;
}

function interpreteCmd(shellPrompt, cwd) {
  let retMsg = "";

  let command = shellPrompt.split(" ")[0];
  let args = shellPrompt.split(" ").slice(1);

  /* Environment variables (kinda) */
  /* Format $varName1:Value1;$varName2:Value2;... */
  args.push(
    "$cwd:" + cwd,
  );
  
  console.debug("command:", command, "args:", args);

  let isExecutable = searchPath(command);

  if (isExecutable) {
    try {
      retMsg = execFn(command, context, args);
    }
    catch (error) {
      retMsg = "sh: " + command + ": not yet implemented " + error;
    }
  } else {
    retMsg = "sh: command not found: " + command;
  }

  return retMsg;
}

export { interpreteCmd };
