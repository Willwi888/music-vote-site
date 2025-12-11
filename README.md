# Willwi《摯愛》音樂投票網站 (Music Vote Site)

這是一個為 Willwi《摯愛》專輯設計的高級音樂投票網站。採用 React + Tailwind CSS 開發，強調高級質感與防下載保護。

## ✨ 功能特色

*   **高級感設計 (Modern Luxury Noir)**：致敬 Cartier 風格，深色背景搭配金色點綴。
*   **多語言支援**：繁體中文、English、日本語。
*   **彈性投票**：聽眾可選擇 1-10 首歌曲，並留下感言。
*   **防下載保護**：隱藏音訊下載按鈕，禁止右鍵與圖片拖曳。
*   **自定義播放器**：整合 Dropbox 音訊串流，提供優雅的播放體驗。
*   **管理員後臺**：簡單的密碼保護後台，可查看投票統計。

## 🚀 快速開始

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

## 🛠️ 設定指南

### 1. Google Sheets API 設定 (用於儲存投票資料)

本專案使用 Google Sheets 作為資料庫。請依照 `google-sheets-structure.md` 中的說明：

1.  建立一個新的 Google Sheet。
2.  設定欄位：`timestamp`, `name`, `email`, `language`, `selected_songs`, `message`。
3.  部署 Apps Script (Web App)，權限設為 **Anyone**。
4.  將生成的 Web App URL 填入 `client/src/pages/Home.tsx` 中的 `submitVoteToGoogleSheets` 函式 (目前為 Mock，需替換為真實 fetch 呼叫)。

### 2. 歌曲資料設定

編輯 `client/src/lib/songs.ts`：

*   填入真實的歌曲標題、歌詞與製作名單。
*   填入 Dropbox 的 `driveId` (檔案連結中的 ID 部分)。

### 3. 管理員密碼

預設管理員密碼為 `willwi2025`。可在 `client/src/pages/AdminLogin.tsx` 中修改。

## 📦 部署

本專案為靜態網站，可部署至任何靜態託管服務 (Vercel, Netlify, GitHub Pages)。

### Vercel 部署

1.  將專案推送到 GitHub。
2.  在 Vercel 中匯入專案。
3.  Build Command: `pnpm build`
4.  Output Directory: `dist`

## 🔒 安全說明

*   **防下載**：雖然已透過 CSS 與自定義播放器隱藏下載路徑，但無法 100% 防止專業技術手段。
*   **管理員後臺**：目前的密碼驗證為前端實作，僅防君子不防小人。建議在正式上線前改為後端驗證或使用 Vercel Authentication。

---

© 2025 Willwi Music. All Rights Reserved.
