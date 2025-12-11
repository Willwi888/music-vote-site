import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { songs } from '../lib/songs';

// Mock data type
interface VoteRecord {
  timestamp: string;
  name: string;
  email: string;
  selectedSongs: number[];
  message: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'authenticated') {
      setLocation('/admin');
      return;
    }

    // Mock fetching data
    // In real implementation, this would fetch from Google Sheets API
    setTimeout(() => {
      setVotes([
        {
          timestamp: new Date().toISOString(),
          name: "Test User",
          email: "test@example.com",
          selectedSongs: [1, 2, 3],
          message: "Great songs! I love the emotion in track 1."
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setLocation('/admin');
  };

  // Calculate stats for all songs
  const songStats = songs.map(song => {
    const count = votes.reduce((total, vote) => {
      return total + (vote.selectedSongs.includes(song.id) ? 1 : 0);
    }, 0);
    return {
      id: song.id,
      title: song.title,
      count
    };
  });

  const sortedSongs = [...songStats].sort((a, b) => b.count - a.count);
  
  // Calculate total votes and statistics
  const totalVotes = votes.length;
  const totalVotesCast = votes.reduce((total, vote) => total + vote.selectedSongs.length, 0);
  const averageVotesPerSong = totalVotes > 0 ? (totalVotesCast / songs.length).toFixed(2) : '0';
  const maxVotes = Math.max(...songStats.map(s => s.count), 1);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif text-primary">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} style={{ color: '#D4AF37' }}>Logout</Button>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Total Votes</p>
                <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{totalVotes}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Total Selections</p>
                <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{totalVotesCast}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Avg per Song</p>
                <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{averageVotesPerSong}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* All Songs Vote Count */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-white/10">
              <CardHeader>
                <CardTitle style={{ color: '#D4AF37' }}>All Songs - Vote Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2 pr-4">
                    {songStats.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No songs available.</p>
                    ) : (
                      songStats.map((song, index) => (
                        <div key={song.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded transition-colors">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span style={{ color: '#D4AF37' }} className="font-mono w-6 text-right text-sm">{index + 1}</span>
                            <span className="text-sm truncate">{song.title}</span>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full transition-all duration-300" 
                                style={{ 
                                  width: `${maxVotes > 0 ? (song.count / maxVotes) * 100 : 0}%`,
                                  backgroundColor: '#D4AF37'
                                }}
                              />
                            </div>
                            <span style={{ color: '#D4AF37' }} className="font-mono w-8 text-right text-sm">{song.count}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages */}
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle style={{ color: '#D4AF37' }}>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-6 pr-4">
                  {votes.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No messages yet.</p>
                  ) : (
                    votes.map((vote, index) => (
                      <div key={index} className="space-y-2 border-b border-white/5 pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">{vote.name}</p>
                            <p className="text-xs text-muted-foreground">{vote.email}</p>
                          </div>
                          <span className="text-xs text-muted-foreground/50">
                            {new Date(vote.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 italic">"{vote.message}"</p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
