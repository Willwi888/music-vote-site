import { Song } from './songs';

// Initialize songs from the backup file on first load
export const initializeSongs = async () => {
  if (typeof window === 'undefined') return;
  
  // Check if songs are already initialized
  const existing = localStorage.getItem('admin_songs_data');
  if (existing) {
    return; // Already initialized
  }
  
  try {
    // Fetch the songs data from public folder
    const response = await fetch('/songs-data.json');
    if (!response.ok) {
      console.warn('Could not load songs data');
      return;
    }
    
    const data = await response.json();
    const songs = data.songs || data;
    
    if (Array.isArray(songs) && songs.length > 0) {
      localStorage.setItem('admin_songs_data', JSON.stringify(songs));
      console.log(`Initialized ${songs.length} songs from backup`);
    }
  } catch (error) {
    console.error('Failed to initialize songs:', error);
  }
};
