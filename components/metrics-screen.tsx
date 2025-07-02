"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, RotateCcw, Save, Music, Clock, Volume2, Target, Award } from "lucide-react"
import type { SessionMetrics } from "@/app/page"

interface MetricsScreenProps {
  metrics: SessionMetrics
  onRepeat: () => void
  onSave: () => void
}

export function MetricsScreen({ metrics, onRepeat, onSave }: MetricsScreenProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <TrendingUp className="h-4 w-4" />
    if (score >= 70) return <Minus className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excelente"
    if (score >= 80) return "Muy Bien"
    if (score >= 70) return "Bien"
    if (score >= 60) return "Regular"
    return "Necesita Práctica"
  }

  const suggestions = [
    "Practica con metrónomo para mejorar el timing",
    "Trabaja en la consistencia de dinámicas",
    "Enfócate en la afinación en las notas agudas",
    "Mantén un tempo más estable durante los cambios",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-fuchsia-500" />
              <h1 className="text-2xl font-bold text-white">Análisis de Sesión</h1>
            </div>
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              Sesión Completada
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Métricas Principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Puntuación General */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Puntuación General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold ${getScoreColor(metrics.overall)}`}>{metrics.overall}</div>
                  <div className="text-slate-400 text-lg">{getScoreLabel(metrics.overall)}</div>
                </div>
                <Progress value={metrics.overall} className="h-3" />
              </CardContent>
            </Card>

            {/* Métricas Detalladas */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Análisis Detallado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tempo */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">Tempo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(metrics.tempo)}`}>{metrics.tempo}%</span>
                      {getScoreIcon(metrics.tempo)}
                    </div>
                  </div>
                  <Progress value={metrics.tempo} className="h-2" />
                  <p className="text-sm text-slate-400">Consistencia en el mantenimiento del tempo</p>
                </div>

                {/* Afinación */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">Afinación</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(metrics.pitch)}`}>{metrics.pitch}%</span>
                      {getScoreIcon(metrics.pitch)}
                    </div>
                  </div>
                  <Progress value={metrics.pitch} className="h-2" />
                  <p className="text-sm text-slate-400">Precisión en la entonación de las notas</p>
                </div>

                {/* Dinámicas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">Dinámicas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(metrics.dynamics)}`}>{metrics.dynamics}%</span>
                      {getScoreIcon(metrics.dynamics)}
                    </div>
                  </div>
                  <Progress value={metrics.dynamics} className="h-2" />
                  <p className="text-sm text-slate-400">Control de volumen y expresión musical</p>
                </div>

                {/* Timing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">Timing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(metrics.timing)}`}>{metrics.timing}%</span>
                      {getScoreIcon(metrics.timing)}
                    </div>
                  </div>
                  <Progress value={metrics.timing} className="h-2" />
                  <p className="text-sm text-slate-400">Precisión rítmica y sincronización</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Sugerencias */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Sugerencias de Mejora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                    <p className="text-sm text-slate-300">{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Estadísticas de Sesión */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duración</span>
                  <span className="text-white font-medium">3:42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Instrumentos</span>
                  <span className="text-white font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tempo Promedio</span>
                  <span className="text-white font-medium">118 BPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Comandos de Voz</span>
                  <span className="text-white font-medium">12</span>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <div className="space-y-3">
              <Button
                onClick={onRepeat}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Repetir Sesión
              </Button>

              <Button
                onClick={onSave}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar y Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
