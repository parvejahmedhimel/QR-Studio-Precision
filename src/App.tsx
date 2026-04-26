import { QRCodeGenerator } from "@/src/components/blocks/qr-code"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center">
      {/* Subtle technical background grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
        style={{ 
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Soft radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-6xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Vector Engine v1.0
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter sm:text-6xl lg:text-7xl">
            QR Studio <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Precision.</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-lg text-slate-500 font-medium leading-relaxed">
            Generate industrial-grade QR codes with pixel-perfect control. 
            Optimized for print, web, and high-stochastic environments.
          </p>
        </header>

        <section className="bg-white/40 backdrop-blur-md p-1.5 sm:p-2 rounded-3xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          <div className="bg-white rounded-2xl p-4 sm:p-8 md:p-10 shadow-inner">
            <QRCodeGenerator />
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
          <p className="text-[10px] sm:text-xs font-medium tracking-tight text-center md:text-left">
            © 2024 QR Studio Precision • Built for Creative Professionals
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">API Access</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
