"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Music, Mic, User, Play, Pause, Square, Volume2, VolumeX, Settings, ArrowLeft, Circle } from "lucide-react"
import { AvatarStage } from "@/components/avatar-stage"
import { MediaPipeView } from "@/components/mediapipe-view"
import type { Song, Instrument, SessionMetrics } from "@/app/page"

interface StudioScreenProps {
  song: Song
  ensemble: Instrument[]
  onExit: () => void
  onShowMetrics: (metrics: SessionMetrics) => void
}

export function StudioScreen({ song, ensemble, onExit, onShowMetrics }: StudioScreenProps) {
  const [instruments, setInstruments] = useState<Instrument[]>(ensemble)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [micStatus, setMicStatus] = useState<"active" | "inactive" | "listening">("inactive")
  const [currentTempo, setCurrentTempo] = useState(song.tempo)
  const [playbackTime, setPlaybackTime] = useState(0)

  // Simular comandos de voz sugeridos
  const suggestedCommands = isPlaying
    ? ["Stop", "Slower", "Faster", "Mute Bass"]
    : ["Play", "Start Recording", "Set Tempo"]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleVolumeChange = (instrumentId: string, volume: number) => {
    setInstruments((prev) => prev.map((inst) => (inst.id === instrumentId ? { ...inst, volume } : inst)))
  }

  const handleMuteToggle = (instrumentId: string) => {
    setInstruments((prev) => prev.map((inst) => (inst.id === instrumentId ? { ...inst, muted: !inst.muted } : inst)))
  }

  const handleSoloToggle = (instrumentId: string) => {
    setInstruments((prev) => prev.map((inst) => (inst.id === instrumentId ? { ...inst, solo: !inst.solo } : inst)))
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setMicStatus("listening")
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    setMicStatus("inactive")
    setPlaybackTime(0)

    // Simular métricas de sesión
    const metrics: SessionMetrics = {
      tempo: Math.floor(Math.random() * 20) + 80,
      pitch: Math.floor(Math.random() * 20) + 75,
      dynamics: Math.floor(Math.random() * 15) + 80,
      timing: Math.floor(Math.random() * 25) + 70,
      overall: Math.floor(Math.random() * 15) + 80,
    }

    onShowMetrics(metrics)
  }

  const handleRecord = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setMicStatus("active")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="h-18 border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onExit} className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Salir
              </Button>
              <div className="flex items-center space-x-3">
                <Music className="h-6 w-6 text-fuchsia-500" />
                <div>
                  <h1 className="text-lg font-semibold text-white">{song.title}</h1>
                  <p className="text-sm text-slate-400">{song.artist}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-white">
                <span className="text-sm text-slate-400">Tempo: </span>
                <span className="font-mono">{currentTempo} ♩</span>
              </div>
              <div className="text-white">
                <span className="text-sm text-slate-400">Tiempo: </span>
                <span className="font-mono">{formatTime(playbackTime)}</span>
              </div>
              <Badge
                variant={micStatus === "active" ? "default" : "secondary"}
                className={`${micStatus === "active" ? "bg-red-600" : micStatus === "listening" ? "bg-yellow-600" : "bg-slate-600"
                  }`}
              >
                <Mic className="h-3 w-3 mr-1" />
                {micStatus === "active" ? "REC" : micStatus === "listening" ? "LISTEN" : "OFF"}
              </Badge>
              <Button variant="ghost" size="sm" className="text-slate-400">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar Izquierda */}
        <aside className="w-80 border-r border-slate-700 bg-slate-900/30 p-6">
          <div className="space-y-6">
            {/* Biblioteca */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-3">Biblioteca</h3>
                <div className="space-y-2 text-sm">
                  <button className="w-full text-left text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/50">
                    🔍 Search
                  </button>
                  <button className="w-full text-left text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/50">
                    ⭐ Favoritos
                  </button>
                  <button className="w-full text-left text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/50">
                    🕒 Recientes
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Ensemble Builder */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-3">Ensemble Builder</h3>
                <div className="flex flex-wrap gap-2">
                  {instruments.map((instrument) => (
                    <Badge key={instrument.id} variant="outline" className="border-slate-600 text-slate-300">
                      {instrument.avatar} {instrument.name}
                    </Badge>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 border-slate-600 text-slate-400 hover:text-white bg-transparent"
                  >
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Área Principal */}
        <main className="flex-1 flex flex-col">
          {/* Canvas dividido en 4 secciones */}
          <div className="flex-1 grid grid-rows-2 p-4 gap-4">
            {/* Cuadrados superiores - Dinámicos según instrumentos */}
            <div className={`grid gap-4 ${instruments.length === 0 ? 'grid-cols-3' :
                instruments.length === 1 ? 'grid-cols-1' :
                  instruments.length === 2 ? 'grid-cols-2' :
                    instruments.length === 3 ? 'grid-cols-3' :
                      'grid-cols-4'
              }`}>
              {instruments.length === 0 ? (
                // Estado vacío - mostrar 3 cuadrados placeholder
                <>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎭</div>
                        <p className="text-sm">Sin instrumentos</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📹</div>
                        <p className="text-sm">Cámara</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎵</div>
                        <p className="text-sm">Audio</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Mostrar un rectángulo por instrumento
                instruments.map((instrument) => (
                  <div key={instrument.id} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 p-4">
                      <div className={`text-6xl mb-3 ${isPlaying ? 'animate-pulse' : ''}`}>
                        {instrument.avatar}
                      </div>
                      <h3 className="text-lg font-medium mb-2">{instrument.name}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge
                          variant={instrument.muted ? "destructive" : "outline"}
                          className="text-xs"
                        >
                          {instrument.muted ? "Mute" : "Activo"}
                        </Badge>
                        {instrument.solo && (
                          <Badge variant="default" className="text-xs bg-yellow-600">
                            Solo
                          </Badge>
                        )}
                      </div>
                      {isPlaying && (
                        <div className="flex justify-center space-x-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"
                              style={{
                                animationDelay: `${(i * 60) / currentTempo}s`,
                                animationDuration: `${60 / currentTempo}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                      <div className="mt-2 text-xs text-slate-400">
                        Vol: {instrument.volume}%
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* 1 rectángulo en la parte inferior - MediaPipe */}
            <div>
              <MediaPipeView isActive={isRecording || isPlaying} onPoseDetected={(pose) => {
                console.log("Pose detected:", pose)
              }} />
            </div>
          </div>

          {/* Command Bar */}
          <div className="h-20 border-t border-slate-700 bg-slate-900/50 backdrop-blur">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={micStatus === "active" ? "default" : "secondary"}
                    className={`${micStatus === "active"
                      ? "bg-red-600"
                      : micStatus === "listening"
                        ? "bg-yellow-600"
                        : "bg-slate-600"
                      }`}
                  >
                    <Mic className="h-3 w-3 mr-1" />
                    Estado Mic
                  </Badge>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-400">Comandos:</span>
                    {suggestedCommands.map((cmd, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        "{cmd}"
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    size="sm"
                    onClick={handlePlayPause}
                    className={isPlaying ? "" : "bg-fuchsia-600 hover:bg-fuchsia-700"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <Button variant="secondary" size="sm" onClick={handleStop} disabled={!isPlaying}>
                    <Square className="h-4 w-4" />
                  </Button>

                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleRecord}
                    className={isRecording ? "bg-red-600 hover:bg-red-700" : "border-slate-600"}
                  >
                    <Circle className={`h-4 w-4 ${isRecording ? "fill-current" : ""}`} />
                    Rec
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Controles Derecha */}
        <aside className="w-72 border-l border-slate-700 bg-slate-900/30 p-6">
          <div className="space-y-6">
            {/* Mezcla */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-4">Mezcla</h3>
                <div className="space-y-4">
                  {instruments.map((instrument) => (
                    <div key={instrument.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">{instrument.name}</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant={instrument.muted ? "destructive" : "outline"}
                            onClick={() => handleMuteToggle(instrument.id)}
                            className="h-6 w-6 p-0 text-xs border-slate-600"
                          >
                            M
                          </Button>
                          <Button
                            size="sm"
                            variant={instrument.solo ? "default" : "outline"}
                            onClick={() => handleSoloToggle(instrument.id)}
                            className="h-6 w-6 p-0 text-xs border-slate-600"
                          >
                            S
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <VolumeX className="h-3 w-3 text-slate-400" />
                        <Slider
                          value={[instrument.volume]}
                          onValueChange={(value) => handleVolumeChange(instrument.id, value[0])}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <Volume2 className="h-3 w-3 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gestor Latencia */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-3">Latencia & Click</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Latencia</span>
                    <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                      12ms
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Metrónomo</span>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
