# 部署到 Vercel 指南

本專案已針對 Vercel 進行優化，請依照以下步驟將網站上線。

## 方法一：使用 GitHub (推薦)

這是最簡單且能持續更新的方法。

1.  **將程式碼推送到 GitHub**
    *   在 GitHub 上建立一個新的 Repository (例如 `music-vote-site`)。
    *   將本專案的程式碼推送到該 Repository。

2.  **在 Vercel 匯入專案**
    *   登入 [Vercel Dashboard](https://vercel.com/willwi)。
    *   點擊 **"Add New..."** -> **"Project"**。
    *   選擇 "Import Git Repository" 並連結您的 GitHub 帳號。
    *   找到 `music-vote-site` 並點擊 **"Import"**。

3.  **設定 Build & Output Settings**
    *   **Framework Preset**: Vercel 通常會自動偵測為 `Vite`。如果沒有，請手動選擇 `Vite`。
    *   **Root Directory**: `./` (預設即可)。
    *   **Build Command**: `pnpm build` (或 `npm run build`)。
    *   **Output Directory**: `dist`。

4.  **點擊 Deploy**
    *   等待部署完成 (約 1 分鐘)。
    *   完成後，您將獲得一個 `https://music-vote-site.vercel.app` 的網址。

## 方法二：使用 Vercel CLI (手動上傳)

如果您不想使用 GitHub，可以直接從電腦上傳。

1.  **安裝 Vercel CLI**
    ```bash
    npm i -g vercel
    ```

2.  **登入 Vercel**
    ```bash
    vercel login
    ```

3.  **部署**
    在專案根目錄執行：
    ```bash
    vercel
    ```
    *   Set up and deploy? **Yes**
    *   Which scope? **willwi**
    *   Link to existing project? **No**
    *   Project name? **music-vote-site**
    *   In which directory? **./**
    *   Want to modify these settings? **No**

4.  **正式發布 (Production)**
    ```bash
    vercel --prod
    ```

## ⚠️ 重要注意事項

1.  **路由設定 (Routing)**
    *   本專案已包含 `vercel.json` 檔案，用來處理 SPA (單頁應用) 的路由重寫。這能確保使用者重新整理頁面時不會出現 404 錯誤。

2.  **Google Sheets API**
    *   請確保您的 Google Apps Script 已部署為 **Web App**，且權限設定為 **"Anyone"** (任何人)。
    *   請記得將 `client/src/pages/Home.tsx` 中的 `submitVoteToGoogleSheets` 函式替換為真實的 API 呼叫 (請參考 `google-sheets-structure.md`)。

3.  **自定義網域 (Custom Domain)**
    *   部署完成後，您可以在 Vercel 的 **Settings** -> **Domains** 中綁定您的網域 (例如 `vote.willwi.com`)。
