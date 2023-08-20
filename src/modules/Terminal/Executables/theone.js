/* Thanks to : https://codepen.io/yaclive/pen/EayLYO */
function theone(args) {
  let canvas = document.getElementById("terminalCanvas");

  if (!canvas) {
    /* Add canvas as the first child of the terminal */
    const terminal = document.getElementById("terminal");

    let canvas = document.createElement("canvas");
    canvas.id = "terminalCanvas";
    canvas.className = "terminal-canvas";
    terminal.insertBefore(canvas, terminal.firstChild);

    /* Get the canvas context */
    const ctx = canvas.getContext('2d');

    /* Setting the width and height of the canvas */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /* Setting up the letters */
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    letters = letters.split('');

    /* Setting up the columns */
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    /* Setting up the drops */
    let drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    /* Setting up the draw function */
    function draw() {
      if (!canvas || !ctx) {
        return;
      }

      ctx.fillStyle = 'rgba(19, 19, 19, .33)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }

    setInterval(draw, 60);
  }
}

export { theone };
