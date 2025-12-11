# Formspree 設置指南

## 什麼是 Formspree？

Formspree 是一個表單處理服務，可以讓您的網站表單直接發送資料到您的 Email，無需設置後端伺服器。

## 您的 Formspree 設定

- **Formspree Endpoint**: `https://formspree.io/f/xnnqbgpo`
- **接收 Email**: `willchean@gmail.com`

## 啟用步驟（重要！）

### 步驟 1：確認 Email

1. 前往：https://formspree.io/f/xnnqbgpo/confirm
2. 輸入您的 Email：`willchean@gmail.com`
3. 點擊「Send Confirmation」
4. 檢查您的信箱（包括垃圾郵件夾）
5. 點擊確認連結

### 步驟 2：驗證設置

確認後，您可以：
- 前往 https://formspree.io 登入（使用 willchean@gmail.com）
- 查看所有提交的投票
- 下載 CSV 檔案
- 設定自動回覆

## 投票資料格式

每次有人投票，您會收到一封 Email，包含：

```
主旨：新投票：[投票者姓名] 選擇了 [X] 首歌

內容：
- Name: [投票者姓名]
- Email: [投票者 Email]
- Songs: [選擇的歌曲編號，以逗號分隔]
- Song Count: [選擇的歌曲數量]
- Message: [投票者留言]
- Language: [使用的語言]
- Timestamp: [投票時間]
```

## 將資料匯入 Google Sheets

### 方法 1：手動複製

1. 從 Email 中複製投票資料
2. 貼到您的 Google Sheets：
   https://docs.google.com/spreadsheets/d/1ddELHPTMaf0-9xbFpzx8PHiOIEqlEDdVJaKa7hzA5N4/

### 方法 2：使用 Formspree Dashboard

1. 登入 https://formspree.io
2. 選擇您的表單
3. 點擊「Export」
4. 下載 CSV 檔案
5. 在 Google Sheets 中：檔案 → 匯入 → 上傳 CSV

### 方法 3：使用 Zapier（進階）

如果您想要自動化：
1. 註冊 Zapier 帳號
2. 建立 Zap：Formspree → Google Sheets
3. 每次投票會自動寫入 Google Sheets

## 免費方案限制

- 每月 50 次提交
- 無限表單
- Email 通知
- 基本垃圾郵件過濾

如果投票超過 50 次，可以升級到付費方案（$10/月）。

## 常見問題

### Q: 沒有收到確認信？
A: 檢查垃圾郵件夾，或重新發送確認信。

### Q: 如何查看所有投票？
A: 登入 Formspree Dashboard 或查看 Email。

### Q: 可以匯出資料嗎？
A: 可以，在 Dashboard 中點擊 Export 下載 CSV。

### Q: 如何防止垃圾投票？
A: Formspree 有基本的垃圾郵件過濾，付費版可以加入 reCAPTCHA。

## 支援

- Formspree 文件：https://help.formspree.io
- 聯繫支援：support@formspree.io
