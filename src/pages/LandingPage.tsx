import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, Play, Settings2, Sparkles, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Voxa<span className="text-primary">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Fitur</a>
          <a href="#voices" className="hover:text-foreground transition-colors">Suara</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Harga</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="hidden sm:inline-flex">Masuk</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="neon">Coba Gratis</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Generasi Baru Text-to-Speech Neural</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Suara Ultra Realistis <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Setara Manusia Asli
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Ubah teks menjadi suara natural dengan emosi, intonasi dinamis, dan kualitas studio. Sempurna untuk video, podcast, dan audiobook.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="neon" size="lg" className="w-full sm:w-auto text-lg px-8 h-14">
                Mulai Generate Suara
                <Play className="w-5 h-5 ml-2 fill-current" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-14 glass-panel">
              Dengarkan Demo
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-32 text-left"
          id="features"
        >
          <div className="glass-panel p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
              <Mic className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">50+ Pilihan Suara</h3>
            <p className="text-muted-foreground">Dari narator profesional, suara anime, hingga podcast. Tersedia dalam berbagai bahasa dan aksen.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 relative z-10">
              <Settings2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 relative z-10">Kontrol Emosi Penuh</h3>
            <p className="text-muted-foreground relative z-10">Atur pitch, speed, stability, dan tambahkan emosi (senang, sedih, marah) pada setiap kalimat.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Generate Super Cepat</h3>
            <p className="text-muted-foreground">Didukung oleh infrastruktur neural modern, hasilkan audio berkualitas tinggi dalam hitungan detik.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
