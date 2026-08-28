# Hera's Decree - Discord Event Notification Bot

A Discord Bot designed for group event notifications with automatic scheduling and recurring reminder features.

## Features

- **Slash Commands Interface**: Intuitive operation using Discord's native autocomplete search
- **Custom Events**: Add your own events with custom emojis and scheduling types
- **Multi-Server Independent Operation**: Each Discord server's event data is completely independent
- **Smart Scheduling System**:
  - Bear Series Events: Auto-repeat every 48 hours
  - Other Events: One-time notifications
  - Custom Events: Choose recurring or single type
- **Smart Timezone Display**: Uses Discord's native timestamp feature to automatically show event times in each user's local timezone
- **Precise Reminders**: Automatic notifications sent 5 minutes before event start
- **Cloud Deployment Optimized**: Commands auto-register on startup, no manual configuration needed

## Supported Event Types

### 🐻 Default Bear Series (Recurring, every 48 hours)
- Bear Trap 1
- Bear Trap 2
- Academy Bear Trap 1
- Academy Bear Trap 2

### ⚔️ Default Other Events (One-time)
- Caesar Boss
- Viking

### ✨ Custom Events
Create your own events with:
- Custom names
- Custom emojis
- Choice of recurring (48h) or single (one-time) type

## Commands

| Command | Description | Permission Required |
|---------|-------------|---------------------|
| `/help` | Display all features and command instructions | Everyone |
| `/setup_time` | Schedule event notification time (autocomplete search for event, input UTC time) | Everyone |
| `/list` | View all scheduled events | Everyone |
| `/stop` | Stop specific event or clear all schedules (autocomplete search, select "All" to clear all) | Everyone |
| `/add_event` | Add a custom event with name, emoji, and type | **Manage Server** |
| `/remove_event` | Remove a custom event (autocomplete search) | **Manage Server** |

### 🔒 Permission Requirements

- **Everyone**: All users can schedule events, view schedules, and stop events
- **Manage Server**: Only users with "Manage Server" permission can create or remove custom events
  - This includes server owners and users with the "Manage Server" role permission
  - This prevents unauthorized users from modifying the event list

### Usage Examples

#### Schedule Default Event
```
/setup_time event:Bear Trap 1 time:2026-08-30 14:00
```
- Event time: 2026-08-30 14:00 UTC
- Notification time: 2026-08-30 13:55 UTC (5 minutes early)
- Next cycle: 2026-09-01 13:55 UTC (48 hours later)

#### Add Custom Event
```
/add_event name:testevent emoji:😂 type:Single
```
- Creates a new one-time event named "testevent" with emoji 😂

#### Schedule Custom Event
```
/setup_time event:testevent time:2026-08-30 14:00
```
- Notification format:
```
🚨 @everyone

😂 **testevent** starts in **5 minutes**!

⏰ Start Time: [Automatically displays in each user's local timezone]

🛡️ Get ready for the battle!
```

**Smart Timezone Feature:**
- Taiwan users see: `2026年8月30日 22:00`
- Japan users see: `2026年8月30日 23:00`
- US users see: `August 30, 2026 6:00 AM`
- The bot uses Discord's built-in timestamp feature, so everyone sees their own local time automatically!

### 📍 Important: Notification Channel Location

**Notifications are sent to the channel where you execute the `/setup_time` command.**

- Set in **Channel A** → Notification sent to **Channel A**
- Set in **Channel B** → Notification sent to **Channel B**
- Re-setting an event in a different channel will change the notification location

**Example Scenario:**
```
1. Execute in #general: /setup_time event:Bear Trap 1 time:2026-08-30 14:00
   → Notification sent to #general

2. Execute in #events: /setup_time event:Viking time:2026-09-01 10:00
   → Notification sent to #events
```

---

## Deployment Guide

### Step 1: Discord Bot Setup

#### 1. Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Enter name (e.g., Hera's Decree) and create

#### 2. Create Bot and Get Token

1. Click **"Bot"** in the left sidebar
2. Click **"Add Bot"** and confirm
3. Find the **"TOKEN"** section on Bot page
4. Click **"Reset Token"** and copy (⚠️ Only shown once, save it securely)

#### 3. Configure Privileged Gateway Intents

Enable the following permissions at the bottom of the Bot settings page:

- ✅ **SERVER MEMBERS INTENT** (if reading member info is needed)
- ✅ **MESSAGE CONTENT INTENT** (if reading message content is needed)

> **Note**: This bot primarily uses `Guilds` and `GuildMessages` intents, already configured in code.

#### 4. Get Client ID

1. Click **"General Information"** in the left sidebar
2. Copy **"APPLICATION ID"** (this is your `CLIENT_ID`)

#### 5. Get Guild ID (Server ID)

1. In Discord, open **User Settings → Advanced**
2. Enable **"Developer Mode"**
3. Right-click your server icon → **"Copy Server ID"**

#### 6. Generate Bot Invite Link

1. Click **"OAuth2" → "URL Generator"** in the left sidebar
2. Under **SCOPES**, select:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Under **BOT PERMISSIONS**, select:
   - ✅ `Send Messages`
   - ✅ `Mention Everyone`
   - ✅ `Use Slash Commands`
   - ✅ `Read Messages/View Channels`
4. Copy the generated URL at the bottom and open in browser
5. Select your server and authorize

---

### Step 2: Zeabur Deployment

#### 1. Prepare GitHub Repository

Push the project to GitHub:

```bash
cd /path/to/Heras_decree
git init
git add .
git commit -m "Initial commit: Hera's Decree Bot"
git branch -M main
git remote add origin https://github.com/your-username/Heras_decree.git
git push -u origin main
```

#### 2. Create Project on Zeabur

1. Go to [Zeabur](https://zeabur.com/)
2. Login and click **"Create Project"**
3. Select **"Deploy from GitHub"**
4. Authorize Zeabur to access your GitHub
5. Select `Heras_decree` repository

#### 3. Configure Environment Variables

Add the following environment variables in Zeabur project settings:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `DISCORD_TOKEN` | Discord Bot Token | `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt` |
| `CLIENT_ID` | Discord Application ID | `1234567890123456789` |
| `GUILD_ID` | Discord Server ID (Optional) | `9876543210987654321` |

> **GUILD_ID Explanation**:
> - **Fill single server ID**: Commands take effect immediately on that server (recommended for main server)
> - **Leave empty**: Commands register globally to all servers, takes up to 1 hour to take effect
>
> **Multi-Server Support**:
> - Bot can operate on multiple Discord servers simultaneously
> - Each server's event data is **completely independent**
> - Events set in Server A won't appear in Server B's `/list`
> - If you have multiple servers, recommend leaving `GUILD_ID` empty for global registration

#### 4. Deploy

1. Click **"Deploy"**
2. Zeabur will automatically:
   - Run `npm install`
   - Run `npm start` (starts `bot.js`)
3. Check Logs to confirm successful deployment:
   ```
   ✅ Logged in as Hera's Decree#1234
   🔄 Started refreshing application (/) commands.
   ✅ Successfully registered commands to guild 9876543210987654321
   ⏰ Scheduler initialized - checking for events every minute
   ```

---

### Step 3: Test Bot

1. In Discord server, type `/help` to confirm commands are registered
2. Test scheduling:
   ```
   /setup_time event:Caesar Boss time:2026-08-27 15:00
   ```
3. Use `/list` to view schedules
4. Use `/stop` to cancel schedules

---

## Project Structure

```
Heras_decree/
├── bot.js                  # Main program (auto-register commands, handle events)
├── scheduler.js            # Scheduling management system
├── commands/               # Slash Commands definitions
│   ├── help.js
│   ├── setup_time.js
│   ├── list.js
│   └── stop.js
├── package.json            # Project dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore list
├── Procfile                # Zeabur startup config
└── README.md               # This document
```

---

## Technical Details

### Time Format and Timezone Display
- **Input format**: `YYYY-MM-DD HH:MM` (UTC timezone)
- **Example**: `2026-08-30 14:00` represents August 30, 2026, 2:00 PM UTC
- **Display format**: Uses Discord's native timestamp feature

### Smart Timezone Feature
- **Discord Native Timestamps**: The bot uses Discord's `<t:timestamp:F>` format
- **Automatic Per-User Display**: Each user automatically sees event times in their own local timezone
- **No Configuration Required**: Discord handles timezone conversion automatically based on each user's device settings
- **Examples**:
  - Input: `/setup_time event:testevent time:2026-08-30 14:00` (UTC)
  - Taiwan user sees: `2026年8月30日 下午10:00`
  - Japan user sees: `2026年8月30日 23:00`
  - US user sees: `August 30, 2026 6:00 AM PST`
- **Benefits**:
  - ✅ Each user sees their own local time automatically
  - ✅ No need for manual timezone settings
  - ✅ Supports all timezones worldwide
  - ✅ Discord handles daylight saving time automatically

### Scheduling Logic
- **Check frequency**: Every 60 seconds
- **Notification window**: 5-6 minutes before event time (1-minute tolerance window)
- **Bear event cycling**: Automatically adds 48 hours after sending notification
- **Single events**: Automatically removed after sending notification

### Data Storage
- Schedule data stored in `scheduler-data.json`
- **Multi-server architecture**: Uses Guild ID as first-level key to ensure independent server data
- Format:
  ```json
  {
    "1234567890123456789": {
      "Bear Trap 1": {
        "time": "2026-08-30T14:00:00.000Z",
        "channelId": "9876543210987654321",
        "type": "recurring",
        "lastNotified": null
      }
    },
    "9999999999999999999": {
      "Viking": {
        "time": "2026-09-01T10:00:00.000Z",
        "channelId": "8888888888888888888",
        "type": "single",
        "lastNotified": null
      }
    }
  }
  ```
  > The above example shows two different servers (Guild ID: `1234567890123456789` and `9999999999999999999`) with their independent schedule data

---

## Troubleshooting

### Commands not appearing?
1. Verify environment variables `CLIENT_ID` and `GUILD_ID` are correct
2. Check Zeabur Logs for error messages
3. Global commands need up to 1 hour to take effect (recommend using `GUILD_ID`)

### Notifications not sent?
1. Verify Bot has `Send Messages` and `Mention Everyone` permissions
2. Check time format is correct (UTC timezone)
3. Verify time is set in the future (can't be past time)

### Bot offline?
1. Check Zeabur service status
2. Verify `DISCORD_TOKEN` is correct and not expired
3. Check Logs for error messages

---

## License

MIT License

---

## Developer

For modifications or feature extensions, refer to:
- [discord.js Official Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/docs/)

---

**Enjoy! ⚔️**
