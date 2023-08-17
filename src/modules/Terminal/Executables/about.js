/* CSS */
import "../../../static/common.css";

function about(args) {
  let htmlElements = [];

  htmlElements.push(
    <a className="cool-blue" href="/blog/images/me.jpeg">me.jpeg</a>
  );

  htmlElements.push(
    <p className="about-p">
      Hi I&#39;m Tuna, your underground software dealer from <a className="cool-magenta" href="https://cyberpunk.fandom.com/wiki/Night_City">Night City</a>.
      If you would like to see some of my work, either visit one of the above [contact] links or my <a className="cool-green" href="https://github.com/TunaCici">GitHub</a> thingy.
    </p>
  );

  htmlElements.push(
    <p>
      <br></br>
    
      I <strong>love</strong>:
    </p>
  );

  htmlElements.push(
    <ul>
      <li>Desiging software [architectures] &amp; vibing with the code (C++ my beloved)</li>
      <li>Low-level [embedded] programming (&quot;iso C will never destroyed&quot;)</li>
      <li>Tinkering with hardware (my good-old raspberry pi &amp; poor-old &#39;gaming&#39; pc)</li>
      <li>Illustrations &amp; Content-creation (i&#39;m no good at it, but nvm that)</li>
      <li>Ricing the hell out of my Archy [Linux] machine (no i won&#39;t say it)</li>
    </ul>
  );

  htmlElements.push(
    <p>
      <em>and when I say &quot;love&quot;, I mean &quot;addicted&quot;</em>
    </p>
  );

  htmlElements.push(
    <p>

      <br></br>

      I am <strong>inspired</strong> by these people (not limited to):
    </p>
  );

  htmlElements.push(
    <ul>
      <li><a className="cool-blue" href="https://people.inf.ethz.ch/omutlu">Onur Mutlu</a> (a god of [modern] computer architecture imo)</li>
      <li><a className="cool-blue" href="https://www.apple.com/stevejobs">Steve Jobs</a> (not much to say here)</li>
      <li><a className="cool-blue" href="https://twitter.com/b0rk">Julia Evans</a> (awesome software illustrations &amp; writing)</li>
      <li><a className="cool-blue" href="https://twitter.com/tsoding">Тsфdiиg</a> (such a cool &amp; fun person - watch his <a className="cool-blue" href="https://www.youtube.com/c/tsoding/videos">videos</a>)</li>
      <li><a className="cool-blue" href="https://twitter.com/LinaAsahi">Asahi Lina</a> (M1 GPU driver for Linux on Macs - i&#39;m a &#39;fan&#39;)</li>
      <li><a className="cool-blue" href="https://www.youtube.com/@CallMeKevin">Call Me Kevin</a> (the definition of chaotic good)</li>
      <li><a className="cool-blue" href="https://gameofthrones.fandom.com/wiki/Daenerys_Targaryen">Daenerys Targaryen</a> (fire &amp; blood)</li>
      <li><a className="cool-blue" href="https://www.fredagain.com">Fred Again</a> (i adore his work &amp; helped me through some tough times)</li>
    </ul>
  );

  htmlElements.push(
    <p>
      <br></br>
      
      Software I really like (#notsponsored):
    </p>
  );

  htmlElements.push(
    <ul>
      <li><a className="cool-blue" href="https://www.qemu.org">QEMU</a> (open source machine emulator and virtualizer)</li>
      <li><a className="cool-blue" href="https://getutm.app">UTM</a> (virtual machine manager for Apple Devices)</li>
      <li><a className="cool-blue" href="https://sw.kovidgoyal.net/kitty">Kitty</a> (an amazing cross-platform terminal emulator)</li>
      <li><a className="cool-blue" href="https://the.exa.website">exa</a> (modern &amp; colorful replacement for <code>ls</code>)</li>
    </ul>
  );

  htmlElements.push(
    <p>
      <br></br>
      
      Hardware I adore (#notsponsored, duh):
    </p>
  );

  htmlElements.push(
    <ul>
      <li>Almost anything <a className="cool-blue" href="https://www.apple.com/apple-vision-pro/">Apple</a> makes</li>
      <li><a className="cool-blue" href="https://twitter.com/MohitBhoite">Mohit Bhoite&#39;s</a>, <em>what he calls</em>, sculptures. They are <strong>extremely</strong> aesthetic</li>
    </ul>
  );

  htmlElements.push(
    <p className="cool-light-blue about-no-margin">
      <br></br>

      Don't forget to Enjoy Life™ ❤
    </p>
  );

  return (
    <div className="about-output">
      {htmlElements}
    </div>
  )
}

export { about };
