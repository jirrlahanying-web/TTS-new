import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Settings2, SlidersHorizontal, Volume2, Mic2, Star, Check, ChevronDown, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { VOICES, CATEGORIES } from '@/constants/voices';
import { cn } from '@/lib/utils';

interface VoiceSettingsProps {
  selectedVoiceId: string;
  setSelectedVoiceId: (id: string) => void;
  pitch: number[];
  setPitch: (val: number[]) => void;
  speed: number[];
  setSpeed: (val: number[]) => void;
  stability: number[];
  setStability: (val: number[]) => void;
  emotion: string;
  setEmotion: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  textLength: number;
}

export function VoiceSettings({
  selectedVoiceId,
  setSelectedVoiceId,
  pitch, setPitch,
  speed, setSpeed,
  stability, setStability,
  emotion, setEmotion,
  onGenerate,
  isGenerating,
  textLength
}: VoiceSettingsProps) {
  const [activeTab, setActiveTab] = useState<'voices' | 'settings'>('voices');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredVoices = VOICES.filter(v => selectedCategory === 'Semua' || v.category === selectedCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-secondary/30">
        <button
          onClick={() => setActiveTab('voices')}
          className={cn(
            "flex-1 py-4 text-sm font-medium transition-colors border-b-2",
            activeTab === 'voices' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic2 className="w-4 h-4 inline-block mr-2" />
          Suara
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            "flex-1 py-4 text-sm font-medium transition-colors border-b-2",
            activeTab === 'settings' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Settings2 className="w-4 h-4 inline-block mr-2" />
          Pengaturan
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'voices' ? (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Kategori</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-secondary/50 border-white/10">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-white/10">
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Pilihan Suara</label>
              {filteredVoices.map(voice => (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoiceId(voice.id)}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all duration-200 group",
                    selectedVoiceId === voice.id
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "bg-secondary/30 border-white/5 hover:bg-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        {voice.name}
                        {selectedVoiceId === voice.id && <Check className="w-4 h-4 text-primary" />}
                      </h4>
                      <p className="text-xs text-muted-foreground">{voice.category} • {voice.tag}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-2 line-clamp-2">
                    {voice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Emotion Control */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 block flex items-center justify-between">
                <span>Emosi Suara</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['calm', 'happy', 'sad', 'angry', 'excited'].map((emo) => (
                  <button
                    key={emo}
                    onClick={() => setEmotion(emo)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm font-medium border transition-colors capitalize",
                      emotion === emo
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-secondary/50 border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Pitch</label>
                  <span className="text-xs text-muted-foreground">{pitch[0]}%</span>
                </div>
                <Slider value={pitch} onValueChange={setPitch} max={100} step={1} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Kecepatan</label>
                  <span className="text-xs text-muted-foreground">{speed[0]}%</span>
                </div>
                <Slider value={speed} onValueChange={setSpeed} max={100} step={1} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Stabilitas</label>
                  <span className="text-xs text-muted-foreground">{stability[0]}%</span>
                </div>
                <Slider value={stability} onValueChange={setStability} max={100} step={1} />
                <p className="text-xs text-muted-foreground mt-2">Nilai tinggi membuat suara lebih konsisten, nilai rendah lebih ekspresif.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="p-6 border-t border-white/5 bg-secondary/30">
        <Button
          variant="neon"
          size="lg"
          className="w-full h-14 text-lg font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          onClick={onGenerate}
          disabled={isGenerating || textLength === 0}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              Generate Suara
            </div>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          Membutuhkan {Math.ceil(textLength / 10)} kredit
        </p>
      </div>
    </div>
  );
}
