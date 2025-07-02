"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Music, Clock, Users, Plus, X } from "lucide-react"
import type { Song, Instrument } from "@/app/page"

const SAMPLE_SONGS: Song[] = [
  { id: "1", title: "Bohemian Rhapsody", artist: "Queen", tempo: 72, duration: "5:55", genre: "Rock" },
  { id: "2", title: "Hotel California", artist: "Eagles", tempo: 75, duration: "6:30", genre: "Rock" },
  { id: "3", title: "Stairway to Heaven", artist: "Led Zeppelin", tempo: 82, duration: "8:02", genre: "Rock" },
  { id: "4", title: "Sweet Child O' Mine", artist: "Guns N' Roses", tempo: 125, duration: "5:03", genre: "Rock" },
]

const AVAILABLE_INSTRUMENTS: Instrument[] = [
  { id: "bass", name: "Bajo", type: "bass", avatar: "🎸", volume: 75, muted: false, solo: false },
  { id: "drums", name: "Batería", type: "drums", avatar: "🥁", volume: 80, muted: false, solo: false },
  { id: "piano", name: "Piano", type: "piano", avatar: "🎹", volume: 70, muted: false, solo: false },
  { id: "guitar", name: "Guitarra", type: "guitar", avatar: "🎸", volume: 75, muted: false, solo: false },
  { id: "violin", name: "Violín", type: "violin", avatar: "🎻", volume: 65, muted: false, solo: false },
  { id: "saxophone", name: "Saxofón", type: "saxophone", avatar: "🎷", volume: 70, muted: false, solo: false },
]

export function LobbyScreen() {
  const router = useRouter()
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [ensemble, setEnsemble] = useState<Instrument[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSongs = SAMPLE_SONGS.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToEnsemble = (instrument: Instrument) => {
    if (ensemble.length < 8 && !ensemble.find((i) => i.id === instrument.id)) {
      setEnsemble([...ensemble, { ...instrument }])
    }
  }

  const removeFromEnsemble = (instrumentId: string) => {
    setEnsemble(ensemble.filter((i) => i.id !== instrumentId))
  }

  const handleStartStudio = () => {
    if (selectedSong && ensemble.length > 0) {
      // Construir la URL con los parámetros
      const ensembleData = JSON.stringify(ensemble)
      const params = new URLSearchParams({
        songId: selectedSong.id,
        songTitle: selectedSong.title,
        songArtist: selectedSong.artist,
        songTempo: selectedSong.tempo.toString(),
        ensemble: ensembleData
      })

      router.push(`/studio?${params.toString()}`)
    }
  }

  const canStartStudio = selectedSong && ensemble.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music className="h-8 w-8 text-fuchsia-500" />
              <h1 className="text-2xl font-bold text-white">Mehearsal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-slate-300 border-slate-600">
                Estudio Virtual
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Biblioteca de Canciones */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  Biblioteca Musical
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar canciones o artistas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedSong?.id === song.id
                      ? "border-fuchsia-500 bg-fuchsia-500/10"
                      : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                      }`}
                    onClick={() => setSelectedSong(song)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{song.title}</h3>
                        <p className="text-slate-400 text-sm">{song.artist}</p>
                      </div>
                      <div className="text-right text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {song.duration}
                        </div>
                        <div>{song.tempo} BPM</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Ensemble Builder */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Ensemble Builder
                </CardTitle>
                <p className="text-slate-400 text-sm">Selecciona hasta 8 instrumentos para tu banda virtual</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Instrumentos Seleccionados */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Tu Banda ({ensemble.length}/8)</h4>
                  <div className="space-y-2">
                    {ensemble.map((instrument) => (
                      <div
                        key={instrument.id}
                        className="flex items-center justify-between p-2 bg-slate-700 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{instrument.avatar}</span>
                          <span className="text-white text-sm">{instrument.name}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromEnsemble(instrument.id)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {ensemble.length === 0 && (
                      <p className="text-slate-500 text-sm italic">Agrega instrumentos desde abajo</p>
                    )}
                  </div>
                </div>

                {/* Instrumentos Disponibles */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Instrumentos Disponibles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_INSTRUMENTS.map((instrument) => {
                      const isSelected = ensemble.find((i) => i.id === instrument.id)
                      const canAdd = ensemble.length < 8 && !isSelected

                      return (
                        <Button
                          key={instrument.id}
                          variant="outline"
                          size="sm"
                          disabled={!canAdd}
                          onClick={() => addToEnsemble(instrument)}
                          className={`justify-start gap-2 ${isSelected
                            ? "border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-300"
                            : "border-slate-600 text-slate-300 hover:border-slate-500"
                            }`}
                        >
                          <span>{instrument.avatar}</span>
                          <span className="text-xs">{instrument.name}</span>
                          {canAdd && <Plus className="h-3 w-3 ml-auto" />}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Botón Entrar al Estudio */}
                <Button
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold"
                  disabled={!canStartStudio}
                  onClick={handleStartStudio}
                >
                  Entrar al Estudio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
