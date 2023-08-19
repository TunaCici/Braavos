function echo(args) {
  /* Last argument is always the environment variable; remove it */
  args.pop();

  return args.join(" ");
}

export { echo };
