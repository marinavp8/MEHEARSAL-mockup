"use client"

import type { Instrument } from "@/app/page"

interface AvatarStageProps {
  ensemble: Instrument[]
  isPlaying: boolean
  tempo: number
}

export function AvatarStage({ ensemble, isPlaying, tempo }: AvatarStageProps) {
  return (
    <div className="h-full flex items-center justify-center bg-slate-800/50">
      <div className="text-center text-slate-300">
        <div className="text-4xl mb-4">🎭</div>
        <h3 className="text-lg font-medium mb-2">Avatar Stage</h3>
        <p className="text-sm mb-4">
          {isPlaying ? `Reproduciendo a ${tempo} BPM` : "Pausado"}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {ensemble.map((instrument) => (
            <div
              key={instrument.id}
              className={`px-3 py-2 rounded-lg border ${isPlaying
                  ? "border-fuchsia-500 bg-fuchsia-500/20"
                  : "border-slate-600 bg-slate-700/30"
                }`}
            >
              <div className="text-2xl mb-1">{instrument.avatar}</div>
              <div className="text-xs">{instrument.name}</div>
            </div>
          ))}
        </div>
        {isPlaying && (
          <div className="mt-4">
            <div className="flex justify-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${(i * 60) / tempo}s`,
                    animationDuration: `${60 / tempo}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
