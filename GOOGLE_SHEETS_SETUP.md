# Google Sheets 投票系統設置指南

## 步驟 1：建立 Google Sheets

1. 前往 [Google Sheets](https://sheets.google.com)
2. 建立新的試算表，命名為「Willwi 摯愛音樂投票」
3. 在第一個工作表中，設置以下欄位標題（第一列）：

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| 時間戳記 | 姓名 | Email | 選擇的歌曲 | 留言 | 語言 | 歌曲數量 |

## 步驟 2：建立 Apps Script

1. 在 Google Sheets 中，點擊「擴充功能」→「Apps Script」
2. 刪除預設的程式碼
3. 複製以下完整程式碼並貼上：

```javascript
function doPost(e) {
  try {
    // 解析 JSON 資料
    const data = JSON.parse(e.postData.contents);
    
    // 取得試算表
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 準備資料列
    const timestamp = new Date();
    const name = data.name || '';
    const email = data.email || '';
    const songs = Array.isArray(data.songs) ? data.songs.join(', ') : '';
    const message = data.message || '';
    const language = data.language || 'zh';
    const songCount = Array.isArray(data.songs) ? data.songs.length : 0;
    
    // 寫入資料
    sheet.appendRow([
      timestamp,
      name,
      email,
      songs,
      message,
      language,
      songCount
    ]);
    
    // 回傳成功訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '投票已成功提交'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 回傳錯誤訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試函數
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        songs: [1, 2, 3],
        message: '這是測試訊息',
        language: 'zh'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. 點擊「儲存專案」，命名為「Willwi Vote API」

## 步驟 3：部署 Web App

1. 點擊右上角「部署」→「新增部署作業」
2. 選擇類型：「網頁應用程式」
3. 設定：
   - **說明**：Willwi 投票 API v1
   - **執行身分**：我
   - **具有應用程式存取權的使用者**：任何人
4. 點擊「部署」
5. 授權應用程式（選擇您的 Google 帳號 willchean@gmail.com）
6. **複製 Web App URL**（格式：`https://script.google.com/macros/s/...../exec`）

## 步驟 4：測試 API

在 Apps Script 編輯器中：
1. 選擇函數：`testDoPost`
2. 點擊「執行」
3. 檢查 Google Sheets 是否有新增測試資料

## 步驟 5：提供 URL 給開發者

將您的 Web App URL 提供給我，格式如下：
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## 常見問題

### Q: 如何查看投票統計？
A: 在 Google Sheets 中使用公式：
- 總投票數：`=COUNTA(B2:B)`
- 各歌曲票數：使用 COUNTIF 函數

### Q: 如何匯出資料？
A: 檔案 → 下載 → CSV 或 Excel

### Q: 如何設定 Email 通知？
A: 工具 → 通知規則 → 設定「有人提交表單時」

## 安全性說明

- Web App URL 是公開的，但只能寫入資料
- 建議定期檢查投票資料，防止垃圾投票
- 可以在 Apps Script 中加入 IP 限制或驗證碼

## 支援

如有問題，請聯繫開發者或查看 [Google Apps Script 文件](https://developers.google.com/apps-script)
