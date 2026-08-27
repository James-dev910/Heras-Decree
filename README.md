# Hera's Decree - Discord Event Notification Bot

一個專為群組活動通知設計的 Discord Bot，支援自動排程與循環提醒功能。

## 功能特色

- **Slash Commands 介面**：使用 Discord 原生選單介面，操作直覺簡便
- **智慧排程系統**：
  - Bear 系列活動：每 48 小時自動循環
  - 其他活動：單次通知
- **精準提醒**：活動開始前 5 分鐘自動發送通知
- **雲端部署優化**：啟動時自動註冊指令，無需手動配置

## 支援的活動類型

### 🐻 Bear 系列（循環，每 48 小時）
- Bear Trap 1
- Bear Trap 2
- Academy Bear Trap 1
- Academy Bear Trap 2

### ⚔️ 其他活動（單次）
- Caesar Boss
- Viking

## 指令說明

| 指令 | 說明 |
|------|------|
| `/help` | 顯示所有功能與指令說明 |
| `/setup_time` | 設定活動通知時間（使用選單選擇活動與輸入 UTC 時間） |
| `/list` | 查看所有已排程的活動 |
| `/stop` | 停止指定活動或清除所有排程（選擇 "All"） |

### 使用範例

```
/setup_time event:Bear Trap 1 time:2026-08-30 14:00
```
- 活動時間：2026-08-30 14:00 UTC
- 通知時間：2026-08-30 13:55 UTC（提前 5 分鐘）
- 下次循環：2026-09-01 13:55 UTC（48 小時後）

---

## 部署指南

### 第一步：Discord Bot 設定

#### 1. 建立 Discord Application

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 **"New Application"**
3. 輸入名稱（例如：Hera's Decree）並建立

#### 2. 建立 Bot 並取得 Token

1. 在左側選單點擊 **"Bot"**
2. 點擊 **"Add Bot"** 確認建立
3. 在 Bot 頁面找到 **"TOKEN"** 區塊
4. 點擊 **"Reset Token"** 並複製（⚠️ 只會顯示一次，請妥善保存）

#### 3. 設定 Privileged Gateway Intents

在 Bot 設定頁面下方，啟用以下權限：

- ✅ **SERVER MEMBERS INTENT**（如需讀取成員資訊）
- ✅ **MESSAGE CONTENT INTENT**（如需讀取訊息內容）

> **注意**：本 Bot 主要使用 `Guilds` 和 `GuildMessages` intents，已在程式碼中配置。

#### 4. 取得 Client ID

1. 在左側選單點擊 **"General Information"**
2. 複製 **"APPLICATION ID"**（這就是 `CLIENT_ID`）

#### 5. 取得 Guild ID（伺服器 ID）

1. 在 Discord 中開啟 **使用者設定 → 進階**
2. 啟用 **"開發者模式"**
3. 右鍵點擊你的伺服器圖示 → **"複製伺服器 ID"**

#### 6. 生成 Bot 邀請連結

1. 在左側選單點擊 **"OAuth2" → "URL Generator"**
2. 在 **SCOPES** 勾選：
   - ✅ `bot`
   - ✅ `applications.commands`
3. 在 **BOT PERMISSIONS** 勾選：
   - ✅ `Send Messages`（發送訊息）
   - ✅ `Mention Everyone`（提及 @everyone）
   - ✅ `Use Slash Commands`（使用斜線指令）
   - ✅ `Read Messages/View Channels`（讀取訊息/查看頻道）
4. 複製底部生成的 URL 並在瀏覽器開啟
5. 選擇你的伺服器並授權

---

### 第二步：Zeabur 部署

#### 1. 準備 GitHub Repository

將專案推送到 GitHub：

```bash
cd /path/to/Heras_decree
git init
git add .
git commit -m "Initial commit: Hera's Decree Bot"
git branch -M main
git remote add origin https://github.com/你的使用者名稱/Heras_decree.git
git push -u origin main
```

#### 2. 在 Zeabur 建立專案

1. 前往 [Zeabur](https://zeabur.com/)
2. 登入並點擊 **"Create Project"**
3. 選擇 **"Deploy from GitHub"**
4. 授權 Zeabur 存取你的 GitHub
5. 選擇 `Heras_decree` repository

#### 3. 設定環境變數

在 Zeabur 專案設定中，新增以下環境變數：

| 變數名稱 | 說明 | 範例 |
|---------|------|------|
| `DISCORD_TOKEN` | Discord Bot Token | `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt` |
| `CLIENT_ID` | Discord Application ID | `1234567890123456789` |
| `GUILD_ID` | Discord Server ID（選填，填寫後指令更新更快） | `9876543210987654321` |

> **GUILD_ID 說明**：
> - **填寫**：指令僅註冊到該伺服器，更新立即生效（推薦）
> - **不填**：指令全域註冊，需要最多 1 小時生效

#### 4. 部署

1. 點擊 **"Deploy"**
2. Zeabur 會自動：
   - 執行 `npm install`
   - 執行 `npm start`（啟動 `bot.js`）
3. 查看 Logs 確認部署成功：
   ```
   ✅ Logged in as Hera's Decree#1234
   🔄 Started refreshing application (/) commands.
   ✅ Successfully registered commands to guild 9876543210987654321
   ⏰ Scheduler initialized - checking for events every minute
   ```

---

### 第三步：測試 Bot

1. 在 Discord 伺服器中輸入 `/help` 確認指令已註冊
2. 測試排程：
   ```
   /setup_time event:Caesar Boss time:2026-08-27 15:00
   ```
3. 使用 `/list` 查看排程
4. 使用 `/stop` 取消排程

---

## 專案結構

```
Heras_decree/
├── bot.js                  # 主程式（自動註冊指令、處理事件）
├── scheduler.js            # 排程管理系統
├── commands/               # Slash Commands 定義
│   ├── help.js
│   ├── setup_time.js
│   ├── list.js
│   └── stop.js
├── package.json            # 專案依賴
├── .env.example            # 環境變數範例
├── .gitignore              # Git 忽略清單
├── Procfile                # Zeabur 啟動設定
└── README.md               # 本文件
```

---

## 技術細節

### 時間格式
- **輸入格式**：`YYYY-MM-DD HH:MM`（UTC 時區）
- **範例**：`2026-08-30 14:00` 代表 2026 年 8 月 30 日下午 2 點 UTC

### 排程邏輯
- **檢查頻率**：每 60 秒檢查一次
- **通知視窗**：活動時間前 5-6 分鐘內（1 分鐘容錯視窗）
- **Bear 事件循環**：發送通知後自動加 48 小時
- **單次事件**：發送通知後自動移除

### 資料儲存
- 排程資料儲存於 `scheduler-data.json`
- 格式：
  ```json
  {
    "Bear Trap 1": {
      "time": "2026-08-30T14:00:00.000Z",
      "channelId": "1234567890123456789",
      "type": "recurring",
      "lastNotified": null
    }
  }
  ```

---

## 疑難排解

### 指令沒有出現？
1. 確認環境變數 `CLIENT_ID` 和 `GUILD_ID` 正確
2. 查看 Zeabur Logs 是否有錯誤訊息
3. 全域指令需要最多 1 小時生效（建議使用 `GUILD_ID`）

### 通知沒有發送？
1. 確認 Bot 有 `Send Messages` 和 `Mention Everyone` 權限
2. 檢查時間格式是否正確（UTC 時區）
3. 確認時間設定在未來（不能是過去時間）

### Bot 離線？
1. 檢查 Zeabur 服務狀態
2. 確認 `DISCORD_TOKEN` 正確且未過期
3. 查看 Logs 尋找錯誤訊息

---

## 授權

MIT License

---

## 開發者

如需修改或擴充功能，請參考：
- [discord.js 官方文件](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/docs/)

---

**祝你使用愉快！⚔️**
