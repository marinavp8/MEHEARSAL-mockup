"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { StudioScreen } from "@/components/studio-screen"
import type { Song, Instrument, SessionMetrics } from "@/app/page"

function StudioPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [song, setSong] = useState<Song | null>(null)
    const [ensemble, setEnsemble] = useState<Instrument[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        console.log("StudioPage useEffect triggered")

        try {
            // Obtener datos de la URL
            const songId = searchParams.get("songId")
            const songTitle = searchParams.get("songTitle")
            const songArtist = searchParams.get("songArtist")
            const songTempo = searchParams.get("songTempo")
            const ensembleData = searchParams.get("ensemble")

            console.log("URL params:", { songId, songTitle, songArtist, songTempo, ensembleData })

            if (!songId || !songTitle || !songArtist || !songTempo || !ensembleData) {
                setError("Missing required parameters")
                return
            }

            // Crear el objeto song
            const songObj: Song = {
                id: songId,
                title: songTitle,
                artist: songArtist,
                tempo: parseInt(songTempo),
                duration: "5:00",
                genre: "Rock"
            }

            // Parsear el ensemble
            const parsedEnsemble = JSON.parse(ensembleData)

            console.log("Parsed data:", { songObj, parsedEnsemble })

            setSong(songObj)
            setEnsemble(parsedEnsemble)
            setIsLoading(false)
            setError(null)

        } catch (err) {
            console.error("Error in useEffect:", err)
            setError(err instanceof Error ? err.message : "Unknown error")
        }
    }, [searchParams])

    const handleExit = () => {
        router.push("/")
    }

    const handleShowMetrics = (metrics: SessionMetrics) => {
        const metricsData = JSON.stringify(metrics)
        const ensembleData = JSON.stringify(ensemble)

        const params = new URLSearchParams({
            metrics: metricsData,
            songId: song!.id,
            songTitle: song!.title,
            songArtist: song!.artist,
            songTempo: song!.tempo.toString(),
            ensemble: ensembleData
        })

        router.push(`/metrics?${params.toString()}`)
    }

    console.log("Render state:", { isLoading, error, song: !!song, ensembleLength: ensemble.length })

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-red-400">
                    Error: {error}
                    <button
                        onClick={() => router.push("/")}
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Volver al Lobby
                    </button>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        )
    }

    if (!song || ensemble.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">
                    No hay datos válidos
                    <button
                        onClick={() => router.push("/")}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Volver al Lobby
                    </button>
                </div>
            </div>
        )
    }

    return (
        <StudioScreen
            song={song}
            ensemble={ensemble}
            onExit={handleExit}
            onShowMetrics={handleShowMetrics}
        />
    )
}

export default function StudioPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        }>
            <StudioPageContent />
        </Suspense>
    )
} 