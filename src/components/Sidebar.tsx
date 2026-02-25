import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, Settings, History, Heart, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Beranda', href: '/' },
    { icon: Mic, label: 'Studio', href: '/dashboard', active: true },
    { icon: History, label: 'Riwayat', href: '/history' },
    { icon: Heart, label: 'Favorit', href: '/favorites' },
    { icon: FileText, label: 'Dokumen', href: '/documents' },
  ];

  return (
    <aside className="w-64 border-r border-white/5 glass-panel flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Voxa<span className="text-primary">AI</span></span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.active || location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="font-semibold text-sm mb-1">Upgrade ke Pro</h4>
          <p className="text-xs text-muted-foreground mb-3">Dapatkan suara premium & fitur tak terbatas.</p>
          <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
            Upgrade Sekarang
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Pengaturan</span>
        </Link>
      </div>
    </aside>
  );
}
