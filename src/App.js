import {useState, useEffect } from 'react';

import './App.css';
import rotating_cube from './static/rotating_cube.gif';

function App() {
  const [text, setText] = useState("");
  const fullText = "under construction...";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(intervalId);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <img src={rotating_cube} width="256px"></img>
      <h2>&gt; {text}</h2>
    </div>
  );
}

export default App;
