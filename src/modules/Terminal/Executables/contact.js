/* Static */
import virtfs from "../../../static/virtual_filesystem.json";
import contactJSON from "../../../static/contact.json";

/* CSS */
import "../../../static/common.css";

/* TODO: Same thing applies here as it does for projects.js */
function contact(args) {
  let availablePlaces = [];

  for (let i = 0; i < contactJSON["contact"].length; i++) {
    let contact = contactJSON["contact"][i];
    let color = "cool-blue";

    let place = contact["place"];
    let username = contact["username"];
    let url = contact["url"];

    let leadingSpaces = 24 - place.length;
    username = " ".repeat(leadingSpaces) + "- " + username;

    switch (place) {
      case "X (formerly Twitter)":
        color = "cool-twitter";
        break;
      case "Discord":
        color = "cool-discord";
        break;
      case "GitHub":
        color = "cool-github";
        break;
      case "Mastodon":
        color = "cool-mastadon";
        break;
      case "Mail":
        color = "cool-mail";
        break;
      default:
        color = "cool-blue";
        break;
    }

    let contactHTML = (
      <div key={"contact-" + i} className="writings">
        <div key={"contact-no-" + i}>{i} </div>
        <a href={url} className={color} target="_blank">{place}</a>
        <div key={"contact-username-" + i} >{username}</div>
      </div>
    );

    availablePlaces.push(contactHTML);
  }

  return (
    <div id="places-output">
      {availablePlaces}
    </div>
  )
}

export { contact };
