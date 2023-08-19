/* Static */
import virtfs from "../../../static/virtual_filesystem.json";

/* CSS */
import "../../../static/common.css";

function ls(args) {
  const defaultDate = "1970-01-01T00:00:00+00:00";
  const defaultOwner = "root";
  const defaultPermission = "rwxr-xr-x";

  let targetPath = "";
  let switches = "";

  if (3 < args.length) {
    return "too many arguments";
  }

  /* Last argument is always the environment variable; get and remove it */
  targetPath = args[args.length - 1].replace("$cwd:", "");
  args.pop();

  /* Determine which args are switchs and which is the targetPath */
  args.forEach((item) => {
    if (item.startsWith("-")) {
      switches = item;
    } else {
      targetPath = item;
    }
  });

  if (targetPath.includes(".")) {
    return "invalid directory (relative path is not yet supported)";
  }

  let targetNode = virtfs;

  /* Go to the targetNode by traversing the virtfs */
  targetPath.split("/").filter((item) => item !== "").forEach((item) => {
    if (targetNode[item] && targetNode[item][".type"] === "directory") {
      targetNode = targetNode[item];
    }
  });

  let content = [];
  
  Object.keys(targetNode).forEach((item) => {
    let type = targetNode[item][".type"];

    /* Skip hidden files if -a is not set */
    if (!switches.includes("a") && item.startsWith(".")) {
      return;
    }

    if (switches.includes("l")) {
      let permissions= [];
      let size = targetNode[item].length || 0;
      let owner = defaultOwner;
      let date = targetNode[item][".created"] || defaultDate;

      /* Nicely formatted date: DD MM YYY hh:mm */
      date = new Date(date);
      date = date.toUTCString().slice(4, -7);

      if (type ===  "directory") {
        permissions.push(<span key={"ls-ftype-" + item} className="cool-yellow">d</span>);
      } else {
        permissions.push(<span key={"ls-ftype-" + item} className="cool-green">.</span>);
      }
      
      for (let i = 0; i < defaultPermission.length; i++) {
        switch (defaultPermission[i]) {
          case "r":
            permissions.push(<span key={"ls-perm-" + i} className="cool-red">r</span>);
            break;
          case "w":
            permissions.push(<span key={"ls-perm-" + i} className="cool-green">w</span>);
            break;
          case "x":
            permissions.push(<span key={"ls-perm-" + i} className="cool-blue">x</span>);
            break;
          default:
            permissions.push(<span key={"ls-perm-" + i} className="cool-blue">{defaultPermission[i]}</span>);
            break;
        }
      }

      content.push(
        <div key={"ls-" + item} className="ls-l">
          {permissions}
          <span className="cool-green"> {size} </span>
          {"\t"}
          <span className="cool-yellow">{owner}</span>
          <span className="cool-blue">{date} </span>

          { type === "directory" ? <span className="cool-mastadon">{item} </span> : <span className="cool-green">{item} </span> }
        </div>
      );
    } else {
      if (type === "directory") {
        content.push(<span key={"ls-" + item} className="cool-mastadon">{item} </span>);
      } else {
        content.push(<span key={"ls-" + item} className="cool-green">{item} </span>);
      }
    }

  });

  return (
    <div className="ls">
      {content}
    </div>
  );
}

export { ls };
