# 網站設計規範：Willwi《摯愛》音樂投票網站 (Final)

基於用戶明確指示，本設計將結合 **willwi.com 的專業配色** (黑/白/灰) 與 **Cartier 的高級質感** (金屬光澤/極簡)，並嚴格執行 **防下載** 與 **手機端流暢度** 優化。

## 1. 核心設計哲學 (Design Philosophy)

*   **Style**: **Modern Luxury Noir (現代奢華暗黑)**
    *   以 `cover.jpg` 的黑西裝與灰背景為基調，營造專業、深沉的氛圍。
    *   融入 Cartier 的精緻線條與金屬質感，提升視覺層次。
    *   **絕對禁止**：可愛元素、卡通插圖、高飽和度糖果色。
*   **Mobile First**: 手機端體驗優先。
    *   大拇指友好的操作區域。
    *   絲滑的轉場動畫 (使用 Framer Motion)。
    *   避免細小的點擊目標。

## 2. 配色方案 (Color Palette)

*   **Primary (Base)**:
    *   `#050505` (Rich Black): 背景主色，比純黑更有質感。
    *   `#1A1A1A` (Dark Gray): 卡片/區塊背景。
*   **Secondary (Contrast)**:
    *   `#FFFFFF` (Pure White): 主要文字，確保在深色背景上的可讀性。
    *   `#B0B0B0` (Silver Gray): 次要文字、說明文案。
*   **Accent (Luxury)**:
    *   `#D4AF37` (Metallic Gold): 關鍵按鈕、選中狀態、進度條。
    *   `#E5E4E2` (Platinum): 分隔線、邊框微光。

## 3. 字體系統 (Typography)

*   **Font Family**:
    *   **EN**: *Playfair Display* (標題，優雅襯線) + *Lato* (內文，易讀無襯線)。
    *   **TC/JP**: *Noto Serif TC/JP* (思源宋體)，帶有書卷氣與高級感。
*   **Sizing**: 手機端字體需適當放大，行高 (Line-height) 設為 1.6 以上，增加閱讀舒適度。

## 4. 安全與防護 (Content Protection)

*   **Global Protection**:
    *   禁止右鍵選單 (No Context Menu)。
    *   禁止文字選取 (user-select: none)。
    *   禁止圖片拖曳 (user-drag: none)。
*   **Audio Protection**:
    *   隱藏原生播放器下載按鈕。
    *   使用 Blob URL 或串流方式播放 (在靜態網站限制下盡量隱藏真實連結)。
    *   **注意**: 雖然無法 100% 防止技術手段下載，但會阻擋絕大多數普通用戶。

## 5. 互動與動畫 (Interaction & Animation)

*   **Scroll**: 視差滾動 (Parallax) 與 元素淡入 (Fade-in on scroll)。
*   **Feedback**: 點擊按鈕時的波紋效果 (Ripple) 或 縮放回饋 (Scale tap)。
*   **Transitions**: 頁面切換使用平滑的淡入淡出 (Cross-fade)，避免白屏閃爍。

## 6. 介面佈局 (Layout)

*   **Hero Section**: 全螢幕展示 `cover.jpg` (或其風格化版本)，搭配優雅的標題動畫。
*   **Song List**: 列表式佈局，每首歌為一個獨立卡片，點擊展開歌詞與播放器。
*   **Vote Cart**: 懸浮式或底部固定的「投票籃」，隨時查看已選歌曲 (類似購物車)。


## 7. 官方連結 (Official Links)

這些連結將用於網站頁尾 (Footer) 或聯絡區塊：

*   **Website**: https://willwi.com/
*   **Email**: will@willwi.com

**Music Platforms**:
*   YouTube: https://www.youtube.com/@Willwi888
*   Spotify: https://open.spotify.com/artist/3ascZ8Rb2KDw4QyCy29Om4
*   Apple Music: https://music.apple.com/us/artist/willwi/1798471457
*   Amazon Music: https://music.amazon.com/artists/B0DYFC8CTG/willwi
*   TIDAL: https://tidal.com/artist/70636776
*   YouTube Music: https://music.youtube.com/channel/UCAF8vdEOJ5sBdRuZXL61ASw

**Social Media**:
*   Instagram: https://www.instagram.com/willwi888
*   Facebook: https://www.facebook.com/Willwi888
*   X (Twitter): https://x.com/@willwi888
*   TikTok: https://www.tiktok.com/@willwi888
