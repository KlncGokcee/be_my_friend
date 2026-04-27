import React from 'react';
import { Link } from 'react-router-dom';

function Profilim() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-300">CoF Campus</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/panel"
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/70 transition-colors text-slate-100"
            >
              ← Panele Don
            </Link>
            <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-200 grid place-items-center font-semibold">
              SK
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-blue-900/40 border border-blue-800/70 grid place-items-center text-blue-200 font-bold text-xl">
                SK
              </div>
              <div>
                <h2 className="text-3xl font-bold leading-tight">Selim Kirim</h2>
                <p className="text-slate-400 text-sm">@selim123 - Bilgisayar Muhendisligi 3. sinif</p>
                <p className="text-slate-500 italic mt-1">"Kod yaz, kahve ic, etkinlik olustur."</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-3 text-center min-w-[90px]">
                <p className="text-4xl font-bold text-blue-400 leading-none">6</p>
                <p className="text-xs tracking-wide text-slate-400 mt-1">ETKINLIK</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-3 text-center min-w-[90px]">
                <p className="text-4xl font-bold text-green-400 leading-none">2</p>
                <p className="text-xs tracking-wide text-slate-400 mt-1">AKTIF</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-3 text-center min-w-[90px]">
                <p className="text-4xl font-bold text-rose-400 leading-none">105</p>
                <p className="text-xs tracking-wide text-slate-400 mt-1">KATILIMCI</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 mt-5 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-300 tracking-wide font-semibold">ETKINLIKLERIM</h3>
            <div className="flex gap-2">
              <button className="px-5 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-white">Tumu</button>
              <button className="px-5 py-2 rounded-xl border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800/60 transition-colors">Aktif</button>
              <button className="px-5 py-2 rounded-xl border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800/60 transition-colors">Bitti</button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 mt-5 p-5 min-h-[220px]">
          <h3 className="text-slate-300 tracking-wide font-semibold">KATILDIGIM ETKINLIKLER</h3>
          <div className="h-[150px] grid place-items-center">
            <p className="text-slate-500">Katildigin etkinlikler burada gorunecek.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profilim;
