import React, { useEffect, useState } from 'react';
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

  // Calculate stats
  const songStats = votes.reduce((acc, vote) => {
    vote.selectedSongs.forEach(songId => {
      acc[songId] = (acc[songId] || 0) + 1;
    });
    return acc;
  }, {} as Record<number, number>);

  const sortedSongs = Object.entries(songStats)
    .map(([id, count]) => ({
      id: parseInt(id),
      count,
      title: songs.find(s => s.id === parseInt(id))?.title || 'Unknown'
    }))
    .sort((a, b) => b.count - a.count);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif text-primary">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Songs */}
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-primary">Top Voted Songs</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {sortedSongs.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No votes yet.</p>
                  ) : (
                    sortedSongs.map((song, index) => (
                      <div key={song.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                        <div className="flex items-center gap-4">
                          <span className="text-primary font-mono w-6">{index + 1}</span>
                          <span>{song.title}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">{song.count} votes</span>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-primary">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {votes.map((vote, index) => (
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
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
