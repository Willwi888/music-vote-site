import { useState, useEffect } from 'react';
import { Song } from '../lib/songs';

export interface VoteState {
  selectedSongs: number[];
  isSubmitModalOpen: boolean;
  message: string;
  voterName: string;
  voterEmail: string;
}

export const useVote = (maxVotes: number = 10) => {
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [voterName, setVoterName] = useState('');
  const [voterEmail, setVoterEmail] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vote_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedSongs(parsed.selectedSongs || []);
      } catch (e) {
        console.error('Failed to parse saved vote state');
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('vote_state', JSON.stringify({ selectedSongs }));
  }, [selectedSongs]);

  const toggleSong = (songId: number) => {
    setSelectedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      }
      if (prev.length >= maxVotes) {
        return prev;
      }
      return [...prev, songId];
    });
  };

  const openSubmitModal = () => {
    if (selectedSongs.length === 0) return;
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const resetVote = () => {
    setSelectedSongs([]);
    setMessage('');
    setVoterName('');
    setVoterEmail('');
    setIsSubmitModalOpen(false);
    localStorage.removeItem('vote_state');
  };

  return {
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
    canSubmit: selectedSongs.length > 0
  };
};
