import { useState } from 'react';
import { Maximize2, Type, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
}

export function TextEditor({ text, setText }: TextEditorProps) {
  const maxLength = 20000;
  
  const handleClear = () => setText('');

  return (
    <div className="flex flex-col h-full bg-secondary/20 rounded-2xl border border-white/5 overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-secondary/30">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
            <Type className="w-4 h-4 mr-2" />
            Format
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground" onClick={handleClear}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Bersihkan
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik atau paste teks Anda di sini untuk diubah menjadi suara..."
          className="w-full h-full p-6 bg-transparent resize-none outline-none text-lg leading-relaxed placeholder:text-muted-foreground/50 custom-scrollbar"
          maxLength={maxLength}
        />
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-white/5 bg-secondary/30 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex gap-4">
          <span>{text.length} Karakter</span>
          <span>{text.split(/\s+/).filter(w => w.length > 0).length} Kata</span>
        </div>
        <div>
          {text.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}
