import { Draggable } from "./Draggable/Draggable";
import "./styles.css";

export default function App() {
  const elements = [
    {
      child: (
        <div className="App">
          <h3>Can be Dragged and a Draggable Handle</h3>
        </div>
      ),
      draggable: true
    },
    {
      child: (
        <div className="App">
          <h3>Can be Dragged, but not a draggable handle</h3>
        </div>
      ),
      draggable: false
    },
    {
      child: (
        <div className="App">
          <h3>Can be Dragged and a Draggable Handle</h3>
        </div>
      ),
      draggable: true
    }
  ];
  return (
    <div>
      <Draggable renderToParent components={elements} />
    </div>
  );
}
