/* Static */
import virtfs from "../../../static/virtual_filesystem.json";
import writingsJSON from "../../../static/writings.json";

/* CSS */
import "../../../static/common.css";

/* TODO: Same thing applies here as it does for projects.js */
function writings(args) {
  let availableWritings = [];

  for (let i = 0; i < writingsJSON["writings"].length; i++) {
    const leadingSpaces = 42;

    let writing = writingsJSON["writings"][i];

    let name = writing["name"];
    let date = writing["date"];
    let tags = writing["tags"];
    let url = writing["url"];

    let fillCount = leadingSpaces - name.length;
    date = ".".repeat(fillCount) + "↦ " + date;

    let writingHeader = (
      <div key={"writings-" + i} className="writings">
        <div key={"writings-no-" + i}>{i} </div>
        <a href={url} className="cool-blue" target="_blank">{name}</a>
        <div key={"writings-date-" + i} >{date}</div>
      </div>
    );

    let eyeCandyKeywords = " ".repeat(leadingSpaces + 2) + "↳ ";
    let tagSpans = [];

    tagSpans.push(<span key={"writings-tags-space-x"}>{eyeCandyKeywords}</span>);

    for (let j = 0; j < tags.length; j++) {
      let tag = tags[j];

      tagSpans.push(<span key={"writings-tags-" + i + "-" + j} className="cool-green thin-text">#{tag} </span>);
    }

    let writingsDetails = (
      <div key={"writings-details-" + i} className="writings-details">
        {tagSpans}
      </div>
    );

    availableWritings.push(writingHeader);
    availableWritings.push(writingsDetails);
  }

  const writingsFooter = (
    <p key={"writings-footer"} className="writings-p">More available on my
      <span> </span>
      <a className="cool-green" href="https://tunacici.com/blog/">Blog</a> collection-thingy 🩸
    </p>
  );

  availableWritings.push(<br key={"writings-br"} />);
  availableWritings.push(writingsFooter);

  return (
    <div id="writings-output">
      {availableWritings}
    </div>
  )
}

export { writings };
