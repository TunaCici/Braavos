/* Static */
import virtfs from "../../../static/virtual_filesystem.json";
import projectsJSON from "../../../static/projects.json";

/* I'll use static/projects.json to store my projects. */
/* This goes against my vision for Braavos... For that, I'm sad;( */
/* TODO: After 'pwd' is implemented, look under /root/projects. */
function projects(args) {
  let retMsg = "";

  let availableProjects = [];

  /* go over the array of projects projectsJSON["projects"] */
  for (let i = 0; i < projectsJSON["projects"].length; i++) {
    let project = projectsJSON["projects"][i];

    let name = project["name"];
    let description = project["description"];
    let url = project["url"];
    let authors = project["authors"];

    /* Keep name exactly 16 characters with space */
    if (name.length > 16) {
      name = name.substring(0, 12) + "... ";
    } else {
      name = name + " ".repeat(16 - name.length);
    }

    /* Keep description under 64 characters */
    if (description.length > 64) {
      description = description.substring(0, 60) + "...";
    }
    
    availableProjects.push(name + "\t- " + description);
  }

  retMsg = availableProjects.join("\n");

  return retMsg;
}

export { projects };
