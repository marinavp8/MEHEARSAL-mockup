"use client"

import { LobbyScreen } from "@/components/lobby-screen"

export interface Song {
  id: string
  title: string
  artist: string
  tempo: number
  duration: string
  genre: string
}

export interface Instrument {
  id: string
  name: string
  type: string
  avatar: string
  volume: number
  muted: boolean
  solo: boolean
}

export interface SessionMetrics {
  tempo: number
  pitch: number
  dynamics: number
  timing: number
  overall: number
}

export default function MehearsalApp() {
  return (
    <div className="min-h-screen bg-slate-900">
      <LobbyScreen />
    </div>
  )
}
