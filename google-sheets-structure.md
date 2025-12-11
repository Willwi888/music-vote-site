# Google Sheets 資料結構設計

由於本專案為靜態網站 (Static Site)，我們將使用 Google Sheets 作為輕量級的資料庫來儲存投票結果。

## 1. 表格結構 (Sheet Structure)

建議建立一個新的 Google Sheet，並將工作表命名為 `Votes`。

| Column | Header Name | Description | Example |
| :--- | :--- | :--- | :--- |
| A | `timestamp` | 投票時間 (ISO 8601) | `2025-12-11T10:30:00Z` |
| B | `name` | 投票者姓名 | `Will Chen` |
| C | `email` | 投票者 Email | `will@willwi.com` |
| D | `language` | 語言偏好 | `zh` |
| E | `selected_songs` | 選擇的歌曲 ID (逗號分隔) | `1,5,12,20,25,28,30,33,38,40` |
| F | `message` | 留言內容 | `這首歌陪我度過了最艱難的時光...` |
| G | `ip_address` | (Optional) 來源 IP | `192.168.1.1` |
| H | `user_agent` | (Optional) 瀏覽器資訊 | `Mozilla/5.0...` |

## 2. API 串接方案 (Integration Strategy)

為了讓靜態網站能寫入 Google Sheets，我們將使用 **Google Apps Script (GAS)** 部署一個 Web App。

### GAS 程式碼 (Code.gs)

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Votes');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

### 部署步驟 (Deployment Steps)

1.  在 Google Sheet 中點擊 `Extensions` > `Apps Script`。
2.  貼上上述程式碼。
3.  點擊 `Deploy` > `New deployment`。
4.  Select type: `Web app`.
5.  Description: `Vote API`.
6.  Execute as: `Me` (你的 Google 帳號).
7.  **Who has access: `Anyone` (這點非常重要，允許匿名寫入)**.
8.  點擊 `Deploy` 並授權。
9.  複製生成的 `Web App URL` (以 `https://script.google.com/macros/s/.../exec` 開頭)。

## 3. 前端實作 (Frontend Implementation)

前端將使用 `fetch` API 發送 POST 請求到上述 URL。

```typescript
const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL';

const submitVote = async (data: VoteData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('language', data.language);
  formData.append('selected_songs', data.selectedSongs.join(','));
  formData.append('message', data.message);

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // 重要：解決 CORS 問題，但無法讀取回應內容
  });
};
```

**注意**：由於 `no-cors` 模式無法讀取回應，我們將假設請求成功（除非網路錯誤），並顯示感謝頁面。
