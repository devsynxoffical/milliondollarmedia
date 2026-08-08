"use client";

import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

export default function ShaderStack() {
  return (
    <Shader className="h-full w-full">
      <FilmGrain strength={0.05}>
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        >
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ed1c24"
            leftColor="#ed1c24"
            rightColor="#ed1c24"
            upColor="#ed1c24"
            momentum={13}
            radius={3.5}
          >
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          </ChromaFlow>
        </FlutedGlass>
      </FilmGrain>
    </Shader>
  );
}
