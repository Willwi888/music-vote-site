export interface Song {
  id: number;
  title: string;
  driveId: string;
  lyrics: string;
  credits: string;
  customAudioUrl?: string;
  customImageUrl?: string;
}

// Generating 40 placeholder songs based on the existing structure
export const songs: Song[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: i === 0 ? "聽海" : i === 1 ? "如果雲知道" : `Song Title ${i + 1}`,
  driveId: "1j6Y6X6X6X6X6X6X6X6X6X6X6X6X6X6X", // Placeholder Drive ID
  lyrics: i === 0 
    ? "寫信告訴我今天 海是什麼顏色\n夜夜陪著你的海 心情又如何..." 
    : i === 1 
    ? "愛一旦結冰 一切都好平靜\n淚水它一旦流盡 只剩決心..." 
    : `This is the placeholder lyrics for Song ${i + 1}.\nIt represents the emotion and story of this track.`,
  credits: "© 2025 Willwi Music\n℗ 2025 Willwi Music\nArranger : Willwi\nMain Artist : Willwi 陳威兒\nProducer : Will Chen",
  customAudioUrl: "",
  customImageUrl: ""
}));
