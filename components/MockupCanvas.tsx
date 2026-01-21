"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface MockupCanvasProps {
  artworkImage: string;
  mockupType: string;
  exportRef?: React.RefObject<HTMLDivElement>;
}

// Predefined mockup configurations with perspective points
const mockupConfigs: Record<string, {
  image: string;
  defaultPoints: Point[];
  backgroundColor: string;
}> = {
  frame1: {
    image: "/mockups/frame1.jpg", // Classic wooden/gold frame
    defaultPoints: [
      { x: 30, y: 25 },  // top-left
      { x: 70, y: 25 },  // top-right
      { x: 72, y: 75 },  // bottom-right
      { x: 28, y: 75 },  // bottom-left
    ],
    backgroundColor: "#f5f5f5",
  },
  frame2: {
    image: "/mockups/frame2.jpg", // Modern black frame
    defaultPoints: [
      { x: 25, y: 30 },
      { x: 75, y: 28 },
      { x: 76, y: 72 },
      { x: 24, y: 74 },
    ],
    backgroundColor: "#1a1a1a",
  },
  wall: {
    image: "/mockups/gallery-wall.jpg", // Gallery wall
    defaultPoints: [
      { x: 32, y: 28 },
      { x: 68, y: 30 },
      { x: 66, y: 72 },
      { x: 34, y: 70 },
    ],
    backgroundColor: "#e8e8e8",
  },
};

export default function MockupCanvas({ artworkImage, mockupType, exportRef }: MockupCanvasProps) {
  const config = mockupConfigs[mockupType] || mockupConfigs.frame1;
  const [points, setPoints] = useState<Point[]>(config.defaultPoints);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPoints(config.defaultPoints);
  }, [mockupType, config.defaultPoints]);

  const handleMouseDown = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingIndex === null || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPoints((prev) => {
      const newPoints = [...prev];
      newPoints[draggingIndex] = {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      };
      return newPoints;
    });
  }, [draggingIndex]);

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  // Calculate CSS transform matrix for perspective transformation (memoized)
  const transformMatrix = useMemo(() => {
    // Get canvas dimensions
    const width = 800;
    const height = 800;

    // Convert percentage points to pixels
    const pixelPoints = points.map(p => ({
      x: (p.x / 100) * width,
      y: (p.y / 100) * height,
    }));

    // Calculate perspective transform using CSS 3D transforms
    const dx1 = pixelPoints[1].x - pixelPoints[2].x;
    const dx2 = pixelPoints[3].x - pixelPoints[2].x;
    const dy1 = pixelPoints[1].y - pixelPoints[2].y;
    const dy2 = pixelPoints[3].y - pixelPoints[2].y;

    const sx = pixelPoints[0].x - pixelPoints[1].x + pixelPoints[2].x - pixelPoints[3].x;
    const sy = pixelPoints[0].y - pixelPoints[1].y + pixelPoints[2].y - pixelPoints[3].y;

    const g = (sx * dy2 - sy * dx2) / (dx1 * dy2 - dy1 * dx2);
    const h = (dx1 * sy - dy1 * sx) / (dx1 * dy2 - dy1 * dx2);

    const a = pixelPoints[1].x - pixelPoints[0].x + g * pixelPoints[1].x;
    const b = pixelPoints[3].x - pixelPoints[0].x + h * pixelPoints[3].x;
    const c = pixelPoints[0].x;
    const d = pixelPoints[1].y - pixelPoints[0].y + g * pixelPoints[1].y;
    const e = pixelPoints[3].y - pixelPoints[0].y + h * pixelPoints[3].y;
    const f = pixelPoints[0].y;

    return `matrix3d(
      ${a / width}, ${d / width}, 0, ${g / width},
      ${b / height}, ${e / height}, 0, ${h / height},
      0, 0, 1, 0,
      ${c}, ${f}, 0, 1
    )`;
  }, [points]);

  return (
    <div className="h-full flex items-center justify-center p-8 glass rounded-3xl">
      <div
        ref={(el) => {
          (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (exportRef) {
            (exportRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className="relative w-full max-w-3xl aspect-square"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ backgroundColor: config.backgroundColor }}
      >
        {/* Background mockup image or pattern */}
        {config.image ? (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.image}
              alt="Mockup background"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.05) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.05) 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }} />
          </div>
        )}

        {/* Artwork with perspective transform */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artworkImage}
            alt="User uploaded artwork with 3D perspective transformation"
            className="absolute w-full h-full object-cover shadow-2xl"
            style={{
              transform: transformMatrix,
              transformOrigin: '0 0',
            }}
          />
        </div>

        {/* Corner control points */}
        {points.map((point, index) => (
          <motion.div
            key={index}
            className="absolute w-6 h-6 -ml-3 -mt-3 cursor-move z-10"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
            onMouseDown={() => handleMouseDown(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-900 shadow-lg" />
            {/* Inner dot */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
            {/* Pulse animation */}
            {draggingIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          <polyline
            points={`
              ${points[0].x}%,${points[0].y}%
              ${points[1].x}%,${points[1].y}%
              ${points[2].x}%,${points[2].y}%
              ${points[3].x}%,${points[3].y}%
              ${points[0].x}%,${points[0].y}%
            `}
            fill="none"
            stroke="rgba(147, 51, 234, 0.5)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Instructions */}
        <div className="absolute top-4 left-4 px-4 py-2 glass rounded-lg text-sm">
          <p className="font-medium">Drag corners to adjust perspective</p>
        </div>
      </div>
    </div>
  );
}
