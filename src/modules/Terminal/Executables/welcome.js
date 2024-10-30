/* CSS */
import "../../../static/common.css";

function welcome(args) {
  /* max 80 chars pls */
  const message = "⭐️ New writing: seL4 Microkernel: Architecture - Oct 30, 2024 ⭐️";

  const title = "+-------| News |" + "-".repeat(63) + "+";
  const middle = " " + message;;
  const footer = "+" + "-".repeat(78) + "+";

  return (
    <div className="welcome">
      <div> { /* Empty on purpose */} </div>

      <div className="cool-red welcome-title">{title}</div>
      <marquee behavior="alternate" scrolldelay="350" direction="right" className="welcome-message">{middle}</marquee>
      <div className="cool-red welcome-footer">{footer}</div>
    </div>
  );
}

export { welcome };
