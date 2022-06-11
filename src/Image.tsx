import { loadImage } from 'img-promise';
import React, { useEffect, useMemo, useRef } from 'react';

export type ImageSource =
  | string
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | ImageBitmap
  | ImageData
  | CanvasRenderingContext2D;

export const drawImageSource = async (
  canvas: HTMLCanvasElement,
  source: ImageSource
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!;
  /* eslint-disable no-param-reassign */
  if (typeof source === 'string' || source instanceof HTMLImageElement) {
    const img = await loadImage(source);
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return;
  }
  if (
    source instanceof HTMLCanvasElement ||
    source instanceof HTMLVideoElement ||
    source instanceof ImageBitmap
  ) {
    canvas.width = source.width;
    canvas.height = source.height;
    ctx.drawImage(source, 0, 0);
    return;
  }
  if (source instanceof ImageData) {
    canvas.width = source.width;
    canvas.height = source.height;
    ctx.putImageData(source, 0, 0);
    return;
  }
  if (source instanceof CanvasRenderingContext2D) {
    await drawImageSource(canvas, source.canvas);
    return;
  }
  /* eslint-enable no-param-reassign */
  throw new Error('Not support source');
};

export interface ImageProps
  extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  source: ImageSource;
}

export const Image: React.FC<ImageProps> = ({ source, width, height, style, ...props }) => {
  //   const url = useImageUrl(source);
  //   return url ? <img src={url} alt="" {...props} /> : null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = useMemo(() => {
    const s: React.CSSProperties = {};
    const w = Number(width);
    const h = Number(height);
    if (w) s.width = `${w}px`;
    if (h) s.height = `${h}px`;
    return s;
  }, [width, height]);
  useEffect(() => {
    if (canvasRef.current) {
      drawImageSource(canvasRef.current, source);
    }
  }, [source]);
  return <canvas ref={canvasRef} style={{ ...canvasSize, ...style }} {...props} />;
};
