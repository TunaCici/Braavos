/* Static */
import virtfs from "../../../static/virtual_filesystem.json";
import projectsJSON from "../../../static/projects.json";

/* CSS */
import "../../../static/common.css";

/* I'll use static/projects.json to store my projects. */
/* This goes against my vision for Braavos... For that, I'm sad;( */
/* TODO: After 'pwd' is implemented, look under /root/projects. */
function projects(args) {
  let availableProjects = [];

  for (let i = 0; i < projectsJSON["projects"].length; i++) {
    const leadingSpaces = 16;

    let project = projectsJSON["projects"][i];

    let name = project["name"];
    let description = project["description"];
    let url = project["url"];
    let keywords = project["keywords"];
    let authors = project["authors"];

    if (description.length > 64) {
      description = description.slice(0, 61) + " ..";
    }

    let fillCount = leadingSpaces - name.length;
    description = ".".repeat(fillCount) + "↦ " + description;

    let projectHeader = (
      <div key={"projects-" + i} className="projects">
        <div key={"projects-no-" + i}>{i} </div>
        <a key={"projects-a-" + i} href={url} className="cool-blue" target="_blank">{name}</a>
        <div key={"projects-desc-" + i} className="projects-description">{description}</div>
      </div>
    );

    let eyeCandyKeywords = " ".repeat(leadingSpaces + 2) + "↳ ";
    let keywordSpans = [];

    keywordSpans.push(<span key={"projects-keywords-space-x"}>{eyeCandyKeywords}</span>);

    for (let j = 0; j < keywords.length; j++) {
      let keyword = keywords[j];
      let color = "";

      switch (keyword) {
        case "ISO C": color = "cool-blue"; break;
        case "C++20": color = "cool-dark-blue"; break;
        case "Java": color = "cool-orange"; break;
        case "Python": color = "cool-light-blue"; break;
        case "JavaScript": color = "cool-yellow"; break;
        case "HTML": color = "cool-red"; break;
        case "CSS": color = "cool-green"; break;
        default: break;
      }

      keywordSpans.push(<span key={"projects-keywords-" + i + "-" + j} className={color + " thin-text"}>{keyword}</span>);
      if (j !== keywords.length - 1) {
        keywordSpans.push(<span key={"projects-keywords-comma-" + i + "-" + j}>, </span>);
      }
    }

    let projectDetails = (
      <div key={"projects-details-" + i} className="projects-details">
        <div key={"projects-details-keywords-" + i}>{keywordSpans}</div>
      </div>
    );

    availableProjects.push(projectHeader);
    availableProjects.push(projectDetails);
    availableProjects.push(<br key={"projects-br-" + i} />);
  }

  availableProjects.pop();

  const projectsFooter = (
    <p key={"projects-footer"} className="projects-p">More available on my
      <span> </span>
      <a className="cool-green" href="https://github.com/TunaCici">GitHub</a> collection-thingy 🩸
    </p>
  );

  availableProjects.push(<br key={"projects-br"} />);
  availableProjects.push(projectsFooter);

  return (
    <div id="projects-output">
      {availableProjects}
    </div>
  )
}

export { projects };
