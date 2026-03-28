import React from "react";

export default function Visualizer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          DSA Visualizer
        </h1>

        <div className="flex gap-6 text-gray-300">
          <span className="cursor-pointer hover:text-white">Editor</span>
          <span className="cursor-pointer hover:text-white">Dashboard</span>
          <span className="cursor-pointer hover:text-white">Docs</span>
        </div>

        <div className="flex gap-3">
          <button className="text-sm text-gray-300 hover:text-white">Login</button>
          <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            Sign Up
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-4 p-4">

        {/* SIDEBAR */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
          <h2 className="text-sm text-gray-400 mb-2">Stats</h2>
          <p className="text-lg">23 Visualized</p>
          <p className="text-green-400 text-sm">2h 15m saved</p>
        </div>

        {/* EDITOR */}
        <div className="col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
          <h2 className="text-sm text-gray-400 mb-2">Code Editor</h2>

          <div className="h-[350px] bg-black/40 rounded-lg flex items-center justify-center text-gray-500">
            Monaco Editor Here
          </div>

          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 rounded-lg bg-blue-500 hover:scale-105 transition">
              Run Visualization
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-700">Clear</button>
          </div>
        </div>

        {/* VISUALIZATION */}
        <div className="col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
          <h2 className="text-sm text-gray-400 mb-2">Visualization</h2>

          <div className="flex-1 flex items-center justify-center text-gray-400">
            No visualization running
          </div>
        </div>
      </div>

      {/* OUTPUT PANEL */}
      <div className="p-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-40">
          <h2 className="text-sm text-gray-400 mb-2">Output Console</h2>
          <p className="text-gray-500">Console output will appear here...</p>
        </div>
      </div>

    </div>
  );
}
