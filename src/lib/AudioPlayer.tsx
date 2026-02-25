import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Share2, Volume2, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      // Auto play when new audio is generated
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
      setIsPlaying(true);
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (!isNaN(total)) {
        setProgress([(current / total) * 100]);
        setDuration(total);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress([0]);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voxa-ai-audio-${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-secondary/40 border border-white/10 rounded-2xl p-6 glass-panel relative overflow-hidden">
      {/* Decorative Waveform Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwYXRoIGQ9Ik0wLDUwIFExMDAsMCAyMDAsNTAgVDQwMCw1MCBUNjAwLDUwIFQ4MDAsNTAgVDEwMDAsNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E4NTVmNyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] bg-repeat-x bg-center animate-[wave_10s_linear_infinite]" />
      </div>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          
          <div>
            <h3 className="font-semibold text-lg">Hasil Generate Audio</h3>
            <p className="text-sm text-muted-foreground">Kualitas Studio • WAV Format</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-pink-500">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm" className="ml-2 gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="text-xs font-medium text-muted-foreground w-10 text-right">
          {formatTime(audioRef.current?.currentTime || 0)}
        </span>
        
        <Slider 
          value={progress} 
          onValueChange={handleSeek} 
          max={100} 
          step={0.1} 
          className="flex-1"
        />
        
        <span className="text-xs font-medium text-muted-foreground w-10">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
