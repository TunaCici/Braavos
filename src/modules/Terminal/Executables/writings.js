/* Static */
import virtfs from "../../../static/virtual_filesystem.json";
import writingsJSON from "../../../static/writings.json";

/* CSS */
import "../../../static/common.css";

/* TODO: Same thing applies here as it does for projects.js */
function writings(args) {
  let availableWritings = [];

  for (let i = 0; i < writingsJSON["writings"].length; i++) {
    let writing = writingsJSON["writings"][i];

    let name = writing["name"];
    let date = writing["date"];
    let url = writing["url"];

    let leadingSpaces = 48 - name.length;
    date = " ".repeat(leadingSpaces) + "- " + date;

    let writingHTML = (
      <div key={"writings-" + i} className="writings">
        <div key={"writings-no-" + i}>{i} </div>
        <a href={url} className="cool-blue" target="_blank">{name}</a>
        <div key={"writings-date-" + i} >{date}</div>
      </div>
    );

    availableWritings.push(writingHTML);
  }

  return (
    <div id="writings-output">
      {availableWritings}
    </div>
  )
}

export { writings };
