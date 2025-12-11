import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, language, setLanguage } = useTranslation();
  const [location] = useLocation();

  const isHome = location === '/';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-bold tracking-widest hover:text-primary transition-colors duration-300">
            WILLWI
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs tracking-wider">
              <button
                onClick={() => setLanguage('zh')}
                className={cn(
                  "px-2 py-1 transition-colors duration-300 hover:text-primary",
                  language === 'zh' ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                繁
              </button>
              <span className="text-muted-foreground/30">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-2 py-1 transition-colors duration-300 hover:text-primary",
                  language === 'en' ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                EN
              </button>
              <span className="text-muted-foreground/30">|</span>
              <button
                onClick={() => setLanguage('ja')}
                className={cn(
                  "px-2 py-1 transition-colors duration-300 hover:text-primary",
                  language === 'ja' ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="font-serif text-2xl mb-2 tracking-widest text-primary">BELOVED</h3>
            <p className="text-muted-foreground text-sm tracking-wide">{t.about.footer}</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <a href="https://willwi.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Official Website</a>
            <a href="https://www.instagram.com/willwi888" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@Willwi888" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
          </div>

          <div className="text-xs text-muted-foreground/50 tracking-wider">
            <p>&copy; 2025 Willwi Music. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
