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
let currentPoint = vertices[0];
let lastVertice = 0;

const getRandomVertice = (lastVerticeIndex: number) => {
  let selectedVertice = Math.floor(Math.random() * 5) + 1;
  while (selectedVertice === lastVerticeIndex) {
    selectedVertice = Math.floor(Math.random() * 5) + 1;
  }
  return selectedVertice;
};

const getHalfPoint = (selectedVertice: Vertice, currentPoint: Vertice) => {
  return {
    top: (selectedVertice.top + currentPoint.top) / 2,
    left: (selectedVertice.left + currentPoint.left) / 2,
  };
};

const dots: Vertice[] = [];

export default function App() {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // dots.push(newDot);
      console.log('This will be called every 2 seconds');
    }, 2000);

    const verticeIdx = getRandomVertice(lastVertice);
    const newDot = getHalfPoint(vertices[verticeIdx], currentPoint);
    lastVertice = verticeIdx;
    currentPoint = newDot;

    // setCount((c) => (c += 1));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="pentagon">
        {vertices.map((v, idx) => (
          <div key={idx} className="vertice" style={{ ...v }}></div>
        ))}
        {dots.map((d) => (
          <div className="dot" style={{ ...d }} />
        ))}
      </div>
    </div>
  );
}
