import * as React from 'react';
import './style.css';

const DEFAULT_SIZE = 500;
type Vertice = { left: number; top: number };

const vertices = [
  { left: DEFAULT_SIZE / 2 - 5, top: -10 },
  { left: -10, top: DEFAULT_SIZE * 0.4 },
  { left: DEFAULT_SIZE, top: DEFAULT_SIZE * 0.4 },
  { left: DEFAULT_SIZE * 0.2, top: DEFAULT_SIZE },
  { left: DEFAULT_SIZE * 0.8, top: DEFAULT_SIZE },
];
let currentPoint = vertices[4];
let lastVertice = 0;

const getRandomVertice = (lastVerticeIndex: number) => {
  let selectedVertice = Math.floor(Math.random() * 4) + 1;
  while (selectedVertice === lastVerticeIndex) {
    selectedVertice = Math.floor(Math.random() * 4) + 1;
  }
  return selectedVertice;
};

const getHalfPoint = (selectedVertice: Vertice, currentPoint: Vertice) => {
  return {
    top: (currentPoint.top + selectedVertice.top) / 2,
    left: (currentPoint.left + selectedVertice.left) / 2,
  };
};

const dots: Vertice[] = [];

export default function App() {
  const [timer, setTimer] = React.useState(1);

  const verticeIdx = getRandomVertice(lastVertice);
  const newDot = getHalfPoint(vertices[verticeIdx], currentPoint);
  dots.push(newDot);
  lastVertice = verticeIdx;
  currentPoint = { ...newDot };
  React.useEffect(() => {
    const timerId = setInterval(() => {
      return setTimer(timer + 1);
    }, 300);
    return () => clearInterval(timerId);
  });

  return (
    <div className="container">
      <div className="pentagon">
        {/* {vertices.map((v, idx) => (
          <div key={idx} className="vertice" style={{ ...v }}></div>
        ))} */}
        {dots.map((d, idx) => (
          <span className="dot" key={idx} style={{ ...d }} />
        ))}
      </div>
    </div>
  );
}
