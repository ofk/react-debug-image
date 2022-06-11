import React from 'react';

import { Image } from '../../src';

const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 75;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = canvas.getContext('2d')!;
ctx.fillStyle = '#ccc';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#666';
ctx.font = `${canvas.height / 3}px sans-serif`;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(`${canvas.width}x${canvas.height}`, canvas.width / 2, canvas.height / 2);

export const App: React.FC = () => (
  <div>
    <h1>react-debug-image examples</h1>
    <div>
      <p>
        <Image source={canvas} />
      </p>
      <p>
        <Image source={ctx} />
      </p>
      <p>
        <Image source={canvas.toDataURL()} />
      </p>
      <p>
        <Image source={ctx.getImageData(0, 0, canvas.width, canvas.height)} />
      </p>
    </div>
  </div>
);
