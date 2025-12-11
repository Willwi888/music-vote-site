import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying, onPlayPause, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convert Dropbox URL to direct stream URL
  const streamUrl = src.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');

  // Check if audio source is valid (not placeholder)
  const isValidAudio = src && !src.includes('placeholder') && src.startsWith('http');

  useEffect(() => {
    if (!isValidAudio) {
      setHasError(true);
      return;
    }

    if (isPlaying) {
      audioRef.current?.play().catch(error => {
        console.warn("Playback failed:", error.message);
        setHasError(true);
        onPlayPause(); // Revert state if play fails
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, onPlayPause, isValidAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show disabled state if no valid audio
  if (!isValidAudio || hasError) {
    return (
      <div className="w-full bg-card/30 border border-white/5 rounded-lg p-3 flex items-center gap-3 backdrop-blur-sm opacity-50">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full border border-primary/20 text-primary/50 cursor-not-allowed"
          disabled
        >
          <Play size={14} className="ml-0.5" />
        </Button>
        <div className="flex-1">
          <div className="text-[10px] text-muted-foreground/50">
            音頻預覽即將推出
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card/50 border border-white/5 rounded-lg p-3 flex items-center gap-3 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={streamUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          onPlayPause();
          if (onEnded) onEnded();
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={(e) => {
          console.warn("Audio load error:", e);
          setHasError(true);
          onPlayPause();
        }}
        controlsList="nodownload" // Native protection
        className="hidden" // Hide native player
      />

      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "h-8 w-8 rounded-full border border-primary/20 text-primary hover:bg-primary/10 hover:text-primary transition-all",
          isPlaying && "border-primary bg-primary/10"
        )}
        onClick={onPlayPause}
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isPlaying ? (
          <Pause size={14} />
        ) : (
          <Play size={14} className="ml-0.5" />
        )}
      </Button>

      <div className="flex-1 space-y-1">
        <Slider
          value={[progress]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};
