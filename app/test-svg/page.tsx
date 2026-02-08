"use client";

import { useEffect, useRef } from "react";

const paths = [
  "M36.22,24.64s.24,61.77,5.42,64.78c4.62,2.69,17.02-42.99,19.62-52.82.12-.47.79-.45.89.02,2.18,9.91,12.49,56.03,15.36,56.53,0,0,2.17,4.21,4.7-12.16s4.45-64.17,4.45-64.17",
  "M108.1,60.72s-6.51,17.1-11.64,8.51c-1.51-2.53-2.45-5.61-2.9-8.64-1.1-7.27.53-14.22,3.47-12.47,4.17,2.49-.16,8.37-1.36,10.01s-1.48,1.92-1.48,1.92",
  "M110.58,16.81s.69,4.12-.14,7.39",
  "M114.53,60.97s7.9-17.12,1.43-17.24c-5.78-.11-4.86,6.4,2.17,10.24,2.26,1.23,3.83,3.42,4.46,5.91.68,2.69,1.21,6.38.75,10.7-.96,9.03,9.62-3.13,9.62-3.13,0,0,10.47-15.53,4.76-17.46s-4.74,7.38-4.14,10.98,2.05,10.16,7.95,10.67,8.66-9.82,8.66-9.82",
  "M176.8,57.18s-3.77-10.39-7.42-.46c-3.65,9.93-.27,16.02,3.71,11.97s5.28-11.54,6.36-18.23,2.54,60.01-7.22,58.08-2.9-25.45,12.63-36.69,13.38-20.97,10.83-21.87-5.03,1.12-4.74,7.56,3.9,22.22,12.93,11.86c0,0,3.55-2.76,4.33-21.64s3.37-22.19,3.37-22.19",
  "M194.91,39.19s24.63-8.78,36.55-9.14",
  "M207.71,55.18s-.52,35.2,8.18,26.47,8.46-51.96,12.16-56.05",
  "M211.59,39.66s25.61-8.13,37.81-9.61",
  "M223.8,52.32s-2.09,36.37,6.7,29.51,12.32-26.65,12.32-26.65c0,0-4.98,18.66.96,21.06",
  "M252.72,53.08s-.36,21.14,1.33,20.83,7.46-12.95,7.46-12.95c0,0,3.65,13.84,7.59,12.95,2.79-.63,5.55-2.18,7.14-4.74.66-1.06,1.12-2.29,1.29-3.7.6-4.82.02-14.35,6.2-10.31s.43,20.54-7.24,15.31",
  "M288.85,51.64s3.61,62.24-6.02,59.05,1.75-29.8,9.39-35.7,9.6-10.84,9.6-10.84",
];

const DRAW_DURATION = 2.5;
const DELAY_PER_PATH = 0.15;

export default function TestSvgPage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const pathEls = svgRef.current.querySelectorAll("path");

    pathEls.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = `drawPath ${DRAW_DURATION}s ease-in-out ${i * DELAY_PER_PATH}s forwards`;
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-[80vw] max-w-[600px]">
          <svg
            ref={svgRef}
            viewBox="0 0 321.71 127.63"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>
      </div>
    </>
  );
}
