"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { MetricsScreen } from "@/components/metrics-screen"
import type { SessionMetrics, Song, Instrument } from "@/app/page"

function MetricsPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [metrics, setMetrics] = useState<SessionMetrics | null>(null)
    const [song, setSong] = useState<Song | null>(null)
    const [ensemble, setEnsemble] = useState<Instrument[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Obtener métricas y datos del estudio de la URL
        const metricsData = searchParams.get("metrics")
        const songId = searchParams.get("songId")
        const songTitle = searchParams.get("songTitle")
        const songArtist = searchParams.get("songArtist")
        const songTempo = searchParams.get("songTempo")
        const ensembleData = searchParams.get("ensemble")

        if (metricsData) {
            try {
                const parsedMetrics = JSON.parse(metricsData)
                setMetrics(parsedMetrics)
            } catch (error) {
                console.error("Error parsing metrics data:", error)
                router.push("/")
                return
            }
        }

        // Si hay datos del estudio, guardarlos para poder repetir la sesión
        if (songId && songTitle && songArtist && songTempo && ensembleData) {
            setSong({
                id: songId,
                title: songTitle,
                artist: songArtist,
                tempo: parseInt(songTempo),
                duration: "5:00",
                genre: "Rock"
            })

            try {
                const parsedEnsemble = JSON.parse(ensembleData)
                setEnsemble(parsedEnsemble)
            } catch (error) {
                console.error("Error parsing ensemble data:", error)
            }
        }

        if (!metricsData) {
            // Si no hay datos válidos, redirigir al lobby
            router.push("/")
        } else {
            setIsLoading(false)
        }
    }, [searchParams])

    const handleRepeat = () => {
        // Si tenemos los datos del estudio, volver al estudio con los mismos datos
        if (song && ensemble.length > 0) {
            const ensembleData = JSON.stringify(ensemble)
            const params = new URLSearchParams({
                songId: song.id,
                songTitle: song.title,
                songArtist: song.artist,
                songTempo: song.tempo.toString(),
                ensemble: ensembleData
            })

            router.push(`/studio?${params.toString()}`)
        } else {
            // Si no tenemos los datos, volver al lobby
            router.push("/")
        }
    }

    const handleSave = () => {
        router.push("/")
    }

    if (isLoading || !metrics) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        )
    }

    return (
        <MetricsScreen
            metrics={metrics}
            onRepeat={handleRepeat}
            onSave={handleSave}
        />
    )
}

export default function MetricsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        }>
            <MetricsPageContent />
        </Suspense>
    )
} 