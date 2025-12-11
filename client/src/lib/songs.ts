export interface Song {
  id: number;
  title: string;
  driveId: string;
  lyrics: string;
  credits: string;
  customAudioUrl?: string;
  customImageUrl?: string;
}

// Load songs from localStorage or use default
export const loadSongs = (): Song[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('admin_songs_data');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : parsed.songs || [];
    } catch (e) {
      console.error('Failed to parse stored songs:', e);
    }
  }
  
  // Return default songs if no stored data
  return defaultSongs;
};

// Save songs to localStorage
export const saveSongs = (songs: Song[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('admin_songs_data', JSON.stringify(songs));
};

// Default songs data
const defaultSongs: Song[] = [
  {
    id: 1,
    title: "聽海",
    driveId: "1Li45a4NhWYbrsuNDEPUOLos_q_dXbFYb",
    lyrics: "寫信告訴我今天 海是什麼顏色\n夜夜陪著你的海 心情又如何\n灰色是不想說 藍色是憂鬱\n而漂泊的你 狂浪的心 停在哪裡\n寫信告訴我今夜 你想要夢什麼\n夢裡外的我是否 都讓你無從選擇\n我揪著一顆心 整夜都閉不了眼睛\n為何你明明動了情 卻又不靠近\n聽 海哭的聲音\n嘆惜著誰又被傷了心 卻還不清醒\n一定不是我 至少我很冷靜\n可是淚水 就連淚水也都不相信\n聽 海哭的聲音\n這片海未免也太多情 悲泣到天明\n寫封信給我 就當最後約定\n說你在離開我的時候 是怎樣的心情\n寫信告訴我今夜 你想要夢什麼\n夢裡外的我是否 都讓你無從選擇\n我揪著一顆心 整夜都閉不了眼睛\n為何你明明動了情 卻又不靠近\n聽 海哭的聲音\n嘆惜著誰又被傷了心 卻還不清醒\n一定不是我 至少我很冷靜\n可是淚水 就連淚水也都不相信\n聽 海哭的聲音\n這片海未免也太多情 悲泣到天明\n寫封信給我 就當最後約定\n說你在離開我的時候\n是怎樣的心情\n",
    credits: "© 2025 Willwi Music\n℗ 2025 Willwi Music\nArranger : Willwi\nMain Artist : Willwi 陳威兒\nProducer : Will Chen\nRecording Engineer | Will Chen\nMixing Engineer | Will Chen\nMastering Engineer | Will Chen\nRecording Studio | Willwi Studio, Taipei\nLabel | Willwi Music\n",
    customAudioUrl: "https://youtu.be/CFcv0ZSKm50",
    customImageUrl: ""
  },
  {
    id: 2,
    title: "如果雲知道",
    driveId: "1vjTJvdzuSnsbSTo3lwo42hEJhkdRs90n",
    lyrics: "如果雲知道 逃不開糾纏的牢\n每當心痛過一秒 每回哭醒過一秒\n只剩下心在乞討 你不會知道\n\n愛一旦結冰 一切都好平靜\n淚水它一旦流盡 只剩決心\n放逐自己在黑夜的邊境\n任由黎明一步一步向我逼近\n想你的心 化成灰燼\n真的有點累了 沒什麼力氣\n有太多太多回憶 哽住呼吸\n愛你的心我無處投遞 \n如果可以飛簷走壁找到你\n愛的委屈 不必澄清 只要你將我抱緊\n如果雲知道 想你的夜慢慢熬\n每個思念過一秒 每次呼喊過一秒 \n只覺得生命不停燃燒\n如果雲知道 逃不開糾纏的牢\n每當心痛過一秒 每回哭醒過一秒\n只剩下心在乞討 你不會知道\n\n真的有點累了 沒什麼力氣\n有太多太多回憶 哽住呼吸\n愛你的心我無處投遞 \n如果可以飛簷走壁找到你\n愛的委屈 不必澄清 只要你將我抱緊\n如果雲知道 想你的夜慢慢熬\n每個思念過一秒 每次呼喊過一秒 \n只覺得生命不停燃燒\n如果雲知道 逃不開糾纏的牢\n每當心痛過一秒 每回哭醒過一秒\n只剩下心在乞討 你不會知道\n\n每當心痛過一秒 每回哭醒過一秒\n只剩下心在乞討 你不會知道\n",
    credits: "© 2025 Willwi Music\n℗ 2025 Willwi Music\nArranger : Willwi\nMain Artist : Willwi 陳威兒\nProducer : Will Chen\nRecording Engineer | Will Chen\nMixing Engineer | Will Chen\nMastering Engineer | Will Chen\nRecording Studio | Willwi Studio, Taipei\nLabel | Willwi Music\n",
    customAudioUrl: "https://youtu.be/P9PJuXRgLNY",
    customImageUrl: ""
  }
];

// Export songs - will be loaded dynamically
export const songs = loadSongs().length > 0 ? loadSongs() : defaultSongs;
