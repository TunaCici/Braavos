function pwd(args) {
  if (args.length !== 1) {
    return "too many arguments";
  }

  return args[0].replace("$cwd:", "");
}

export { pwd };
