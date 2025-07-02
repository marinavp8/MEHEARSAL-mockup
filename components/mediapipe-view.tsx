"use client";

import React from "react";

interface MediaPipeViewProps {
    isActive: boolean;
    onPoseDetected: (pose: any) => void;
}

export function MediaPipeView({ isActive, onPoseDetected }: MediaPipeViewProps) {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg h-full flex items-center justify-center text-slate-400">
            <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-sm">MediaPipe Pose Detection</p>
                <p className="text-xs mt-1">{isActive ? "Activo" : "Inactivo"}</p>
            </div>
        </div>
    );
}
