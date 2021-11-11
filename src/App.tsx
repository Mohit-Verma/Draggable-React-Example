import { useState } from "react";
import { Draggable } from "./Draggable/Draggable";
import "./styles.css";

export default function App() {
  const [pinned, setPinned] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(220);
  const [height, setHeight] = useState<number>(368);
  const [dimension, setDimension] = useState<{
    width: number;
    height: number;
  }>({ width, height });

  const togglePin = () => {
    setPinned((current) => !current);
  };
  const updateWidth = ({ target }) => {
    setWidth(target.value);
  };
  const updateHeight = ({ target }) => {
    setHeight(target.value);
  };
  const updateDimension = () => {
    setDimension({ width, height });
  };

  const elements = [
    {
      child: (
        <div className="App">
          <button onClick={togglePin}>{pinned ? "Unpin" : "Pin"}</button>
          <h3>Can be Dragged and a Draggable Handle</h3>
        </div>
      ),
      isHandle: true
    },
    {
      child: (
        <div className="App">
          <h3>Can be Dragged, but not a draggable handle</h3>
          <label>To update the window size when in free form</label>
          <input
            placeholder="width"
            defaultValue={dimension.width}
            onChange={updateWidth}
          />
          <input
            placeholder="height"
            defaultValue={dimension.height}
            onChange={updateHeight}
          />{" "}
          <br />
          <button onClick={updateDimension}>Resize</button>
        </div>
      ),
      isHandle: false
    },
    {
      child: (
        <div className="App">
          <h3>Can be Dragged and a Draggable Handle</h3>
        </div>
      ),
      isHandle: true
    }
  ];
  return (
    <div className="dxc-parent">
      <Draggable
        renderToParent={pinned}
        dimension={dimension}
        components={elements}
      />
    </div>
  );
}
