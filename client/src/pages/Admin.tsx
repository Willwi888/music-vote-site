import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Music2, Edit, Trash2, Plus, Download, Upload, Save, LogOut, Eye } from 'lucide-react';
import { Song, loadSongs, saveSongs as saveSongsToStorage } from '../lib/songs';

const ADMIN_PASSWORD = '8520';
const AUTH_KEY = 'admin_authenticated';

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
      refreshSongs();
    }
  }, []);

  const refreshSongs = () => {
    const loaded = loadSongs();
    setSongs(loaded);
  };

  const saveSongs = (newSongs: Song[]) => {
    saveSongsToStorage(newSongs);
    setSongs(newSongs);
    toast.success('歌曲資料已儲存');
    // Reload the page to refresh songs in the main app
    setTimeout(() => window.location.reload(), 500);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      refreshSongs();
      toast.success('登入成功');
    } else {
      toast.error('密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setPassword('');
    toast.success('已登出');
  };

  const handleEdit = (song: Song) => {
    setEditingSong({ ...song });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingSong) return;
    
    const existingIndex = songs.findIndex(s => s.id === editingSong.id);
    let newSongs: Song[];
    
    if (existingIndex >= 0) {
      // Update existing song
      newSongs = songs.map(s => s.id === editingSong.id ? editingSong : s);
    } else {
      // Add new song
      newSongs = [...songs, editingSong];
    }
    
    saveSongs(newSongs);
    setIsEditDialogOpen(false);
    setEditingSong(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('確定要刪除這首歌曲嗎？')) {
      const newSongs = songs.filter(s => s.id !== id);
      saveSongs(newSongs);
    }
  };

  const handleAddNew = () => {
    const newId = songs.length > 0 ? Math.max(...songs.map(s => s.id)) + 1 : 1;
    const newSong: Song = {
      id: newId,
      title: '新歌曲',
      driveId: '',
      lyrics: '',
      credits: '© 2025 Willwi Music\n℗ 2025 Willwi Music\nArranger : Willwi\nMain Artist : Willwi 陳威兒\nProducer : Will Chen',
      customAudioUrl: '',
      customImageUrl: ''
    };
    setEditingSong(newSong);
    setIsEditDialogOpen(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ songs }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beloved_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success('歌曲資料已匯出');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        const songsData = imported.songs || imported;
        
        if (Array.isArray(songsData)) {
          saveSongs(songsData);
          toast.success(`已匯入 ${songsData.length} 首歌曲`);
        } else {
          toast.error('檔案格式錯誤');
        }
      } catch (error) {
        toast.error('匯入失敗：' + (error as Error).message);
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">後台管理</CardTitle>
            <CardDescription>請輸入管理員密碼</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="請輸入密碼"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              登入
            </Button>
            <Button variant="outline" onClick={() => setLocation('/')} className="w-full">
              返回首頁
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-white/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold">後台管理系統</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setLocation('/')}>
              <Eye className="w-4 h-4 mr-2" />
              預覽網站
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="songs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="songs">歌曲管理</TabsTrigger>
            <TabsTrigger value="backup">備份管理</TabsTrigger>
          </TabsList>

          <TabsContent value="songs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">歌曲列表（共 {songs.length} 首）</h2>
              <Button onClick={handleAddNew}>
                <Plus className="w-4 h-4 mr-2" />
                新增歌曲
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="grid gap-4">
                {songs.map((song) => (
                  <Card key={song.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Music2 className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">{song.title}</h3>
                            <span className="text-sm text-muted-foreground">#{song.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {song.lyrics.substring(0, 100)}...
                          </p>
                          {song.customAudioUrl && (
                            <p className="text-xs text-primary mt-1">🎵 {song.customAudioUrl}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(song)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(song.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>備份與還原</CardTitle>
                <CardDescription>匯出或匯入歌曲資料（JSON 格式）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={handleExport} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    匯出 JSON
                  </Button>
                  <Button variant="outline" onClick={() => document.getElementById('import-file')?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    匯入 JSON
                  </Button>
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImport}
                  />
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 提示：匯出的 JSON 檔案可以備份到雲端，需要時再匯入即可恢復所有歌曲資料。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSong && songs.find(s => s.id === editingSong.id) ? '編輯歌曲' : '新增歌曲'}</DialogTitle>
            <DialogDescription>修改歌曲資訊</DialogDescription>
          </DialogHeader>
          {editingSong && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>歌曲標題</Label>
                <Input
                  value={editingSong.title}
                  onChange={(e) => setEditingSong({
                    ...editingSong,
                    title: e.target.value
                  })}
                  placeholder="例如：聽海"
                />
              </div>
              
              <div className="space-y-2">
                <Label>歌詞</Label>
                <Textarea
                  value={editingSong.lyrics}
                  onChange={(e) => setEditingSong({
                    ...editingSong,
                    lyrics: e.target.value
                  })}
                  rows={8}
                  placeholder="輸入完整歌詞..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>致謝 / Credits</Label>
                <Textarea
                  value={editingSong.credits}
                  onChange={(e) => setEditingSong({
                    ...editingSong,
                    credits: e.target.value
                  })}
                  rows={5}
                  placeholder="© 2025 Willwi Music..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>音頻連結（YouTube 或其他）</Label>
                <Input
                  value={editingSong.customAudioUrl || ''}
                  onChange={(e) => setEditingSong({
                    ...editingSong,
                    customAudioUrl: e.target.value
                  })}
                  placeholder="https://youtu.be/..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Drive ID（選填）</Label>
                <Input
                  value={editingSong.driveId}
                  onChange={(e) => setEditingSong({
                    ...editingSong,
                    driveId: e.target.value
                  })}
                  placeholder="Google Drive 檔案 ID"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="w-4 h-4 mr-2" />
              儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
