import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useVote } from '../hooks/useVote';
import { loadSongs } from '../lib/songs';
import { initializeSongs } from '../lib/initSongs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Music2, Info } from 'lucide-react';
import { AudioPlayer } from '@/components/AudioPlayer';
import { FeaturedPlayer } from '@/components/FeaturedPlayer';
import { cn } from '@/lib/utils';

// Submit vote to Formspree (which forwards to email and stores data)
const submitVoteToGoogleSheets = async (data: any) => {
  const formspreeEndpoint = 'https://formspree.io/f/xnnqbgpo'; // Formspree endpoint
  
  // Format data for submission
  const formData = {
    name: data.name,
    email: data.email,
    message: data.message,
    songs: data.songs.join(', '),
    songCount: data.songs.length,
    language: data.language,
    timestamp: data.timestamp,
    _subject: `新投票：${data.name} 選擇了 ${data.songs.length} 首歌`,
  };

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit vote');
  }

  return response.json();
};

export default function Home() {
  const { t, language } = useTranslation();
  const [songs, setSongs] = useState(loadSongs());
  
  // Initialize songs from backup on first load
  useEffect(() => {
    initializeSongs().then(() => {
      setSongs(loadSongs());
    });
  }, []);
  const {
    selectedSongs,
    toggleSong,
    isSubmitModalOpen,
    openSubmitModal,
    closeSubmitModal,
    message,
    setMessage,
    voterName,
    setVoterName,
    voterEmail,
    setVoterEmail,
    resetVote,
    canSubmit
  } = useVote();

  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlay = (songId: number) => {
    if (playingSongId === songId) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(songId);
    }
  };

  const handleSubmit = async () => {
    if (!voterName || !voterEmail) return;
    
    setIsSubmitting(true);
    try {
      await submitVoteToGoogleSheets({
        name: voterName,
        email: voterEmail,
        message,
        songs: selectedSongs,
        language,
        timestamp: new Date().toISOString()
      });
      setShowSuccess(true);
      closeSubmitModal();
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-6"
        >
          <h2 className="text-3xl font-serif text-primary mb-4">{t.thankyou.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{t.thankyou.content1}</p>
          <p className="text-muted-foreground leading-relaxed">{t.thankyou.content2}</p>
          <div className="pt-8 border-t border-white/10 mt-8">
            <p className="text-sm text-primary/80 italic">{t.thankyou.footer}</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-8 border-primary/50 text-primary hover:bg-primary/10"
            onClick={() => {
              setShowSuccess(false);
              resetVote();
            }}
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Global Breathing Gold Glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" style={{ animation: 'breathe 6s ease-in-out infinite' }} />
        </div>

        <div className="container relative z-20 px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Portrait Photo (Mobile: Top) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative order-1 md:order-1"
            >
              <div className="relative w-full max-w-md mx-auto md:mx-0">
                <img 
                  src="/images/cover.jpg" 
                  alt="Willwi Portrait" 
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right: Text Content (Mobile: Bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative order-2 md:order-2 text-center md:text-left"
            >
              <h1 className="text-6xl md:text-8xl font-serif tracking-wider mb-6">
                <div className="font-light italic text-white/90">Beloved</div>
                <div className="font-bold tracking-widest text-white">摯愛</div>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide mb-8">
                {t.home.subtitle}
              </p>

              <div className="text-base md:text-lg text-gray-300 space-y-5 leading-relaxed">
                <p>{t.home.intro1}</p>
                <p>{t.home.intro2}</p>
                <p className="text-primary/80 italic">{t.home.intro3}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Player */}
      <section className="container mx-auto px-4 py-8">
        <FeaturedPlayer 
          title={songs[0]?.title || "精選歌曲"}
          audioUrl={songs[0]?.customAudioUrl}
        />
      </section>

      {/* Song List */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "group relative bg-card/50 border border-white/5 p-6 rounded-lg transition-all duration-500 hover:border-primary/30 hover:bg-card/80",
                selectedSongs.includes(song.id) && "border-primary/50 bg-primary/5"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground/50">
                    {String(song.id).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-lg tracking-wide group-hover:text-primary transition-colors">
                    {song.title}
                  </h3>
                </div>
                <button
                  onClick={() => toggleSong(song.id)}
                  className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                    selectedSongs.includes(song.id)
                      ? "bg-primary border-primary text-black"
                      : "border-white/20 text-transparent hover:border-primary/50"
                  )}
                >
                  <Check size={14} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  {/* Audio Player Area */}
                  <div className="min-h-[40px]">
                    {playingSongId === song.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <AudioPlayer 
                          src={`https://www.dropbox.com/s/${song.driveId}/preview.mp3?dl=0`} // Construct URL dynamically
                          isPlaying={true}
                          onPlayPause={() => handlePlay(song.id)}
                          onEnded={() => setPlayingSongId(null)}
                        />
                      </motion.div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-full border-white/10 text-xs hover:text-primary hover:border-primary/30 hover:bg-white/5 justify-start"
                        onClick={() => handlePlay(song.id)}
                      >
                        <Music2 size={14} className="mr-2 opacity-70" />
                        Play Preview
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Dialog>
                    <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-card border-white/10">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl text-primary mb-2">{song.title}</DialogTitle>
                        <DialogDescription className="whitespace-pre-line text-muted-foreground leading-relaxed">
                          {song.lyrics}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 pt-6 border-t border-white/5 text-xs text-muted-foreground/50 whitespace-pre-line font-mono">
                        {song.credits}
                      </div>
                    </DialogContent>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-xs text-muted-foreground hover:text-primary p-0 h-auto">
                          View Lyrics & Credits
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <p className="text-xs text-muted-foreground line-clamp-2 italic opacity-60">
                  {song.lyrics.slice(0, 50)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Action Button / Bottom Bar */}
      <AnimatePresence>
        {selectedSongs.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-lg border-t border-primary/20 p-4 shadow-2xl shadow-primary/10"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                  {selectedSongs.length} / 10
                </div>
                <span className="text-sm text-muted-foreground hidden md:inline-block">
                  {t.vote.selected}
                </span>
              </div>
              
              <Button 
                onClick={openSubmitModal}
                className="bg-primary text-black hover:bg-primary/90 font-serif tracking-wider px-8"
              >
                {t.vote.submit}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submission Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={(open) => !open && closeSubmitModal()}>
        <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary mb-2">{t.comment.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {t.comment.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">{t.comment.name}</Label>
              <Input
                id="name"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-primary/50"
                placeholder="Will Chen"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">{t.comment.email}</Label>
              <Input
                id="email"
                type="email"
                value={voterEmail}
                onChange={(e) => setVoterEmail(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-primary/50"
                placeholder="will@willwi.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                Tell Me Why
              </Label>
              <p className="text-xs text-muted-foreground/70 italic mb-2">
                {t.comment.prompt}
              </p>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 resize-none"
                placeholder={t.comment.placeholder}
              />
              <p className="text-[10px] text-muted-foreground/50 text-right">
                {t.comment.note}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={!voterName || !voterEmail || isSubmitting}
              className="w-full bg-primary text-black hover:bg-primary/90 font-serif tracking-widest"
            >
              {isSubmitting ? "Submitting..." : t.comment.submit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-24 py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Willwi Music. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://willwi.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Official Website</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="https://www.instagram.com/willwi888" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="https://www.youtube.com/@Willwi888" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
