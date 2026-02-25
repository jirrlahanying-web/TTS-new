import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '@/components/Sidebar';
import { TextEditor } from '@/components/TextEditor';
import { VoiceSettings } from '@/components/VoiceSettings';
import { AudioPlayer } from '@/components/AudioPlayer';
import { generateSpeech } from '@/services/ttsService';
import { VOICES } from '@/constants/voices';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(VOICES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Settings state
  const [pitch, setPitch] = useState([50]);
  const [speed, setSpeed] = useState([50]);
  const [stability, setStability] = useState([75]);
  const [emotion, setEmotion] = useState('calm');

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    setAudioUrl(null);
    
    try {
      const voice = VOICES.find(v => v.id === selectedVoiceId);
      if (!voice) throw new Error("Voice not found");

      // In a real app, we would pass emotion, pitch, speed to the API
      // Gemini TTS currently only takes voiceName and text
      const prompt = `Say ${emotion === 'happy' ? 'cheerfully' : emotion === 'sad' ? 'sadly' : emotion === 'angry' ? 'angrily' : emotion === 'excited' ? 'excitedly' : 'calmly'}: ${text}`;
      
      const base64Audio = await generateSpeech({
        text: prompt,
        voiceName: voice.apiName as any
      });
      
      const audioSrc = `data:audio/pcm;rate=24000;base64,${base64Audio}`;
      setAudioUrl(audioSrc);
    } catch (error) {
      console.error("Failed to generate speech", error);
      alert("Gagal menghasilkan suara. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between glass z-10">
          <h1 className="text-lg font-semibold">Studio Editor</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">15,000</span> karakter tersisa
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium border border-white/10">
              U
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Section */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
            <TextEditor text={text} setText={setText} />
            
            {/* Audio Player appears when generated */}
            {audioUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <AudioPlayer audioUrl={audioUrl} />
              </motion.div>
            )}
          </div>

          {/* Settings Panel */}
          <div className="w-80 border-l border-white/5 glass-panel flex flex-col overflow-y-auto custom-scrollbar">
            <VoiceSettings 
              selectedVoiceId={selectedVoiceId}
              setSelectedVoiceId={setSelectedVoiceId}
              pitch={pitch} setPitch={setPitch}
              speed={speed} setSpeed={setSpeed}
              stability={stability} setStability={setStability}
              emotion={emotion} setEmotion={setEmotion}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              textLength={text.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
