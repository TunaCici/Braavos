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
    let project = projectsJSON["projects"][i];

    let name = project["name"];
    let description = project["description"];
    let url = project["url"];
    let authors = project["authors"];

    if (description.length > 64) {
      description = description.slice(0, 61) + "...";
    }

    let leadingSpaces = 14 - name.length;
    description = " ".repeat(leadingSpaces) + "- " + description;

    let projectHTML = (
      <div id={"project-" + i} className="projects">
        <div id={"project-no-" + i}>{i} </div>
        <a href={url} className="cool-blue" target="_blank">{name}</a>
        <div id={"project-desc-" + i}>{description}</div>
      </div>
    );

    availableProjects.push(projectHTML);
  }

  return (
    <div id="prpjects-output">
      {availableProjects}
    </div>
  )
}

export { projects };
