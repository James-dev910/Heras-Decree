# Hera's Decree - Discord Event Notification Bot

A Discord Bot designed for group event notifications with automatic scheduling and recurring reminder features.

## Features

- **Slash Commands Interface**: Intuitive operation using Discord's native autocomplete search
- **Batch Scheduling**: Schedule all 4 Bear Trap events at once with `/setup_bear_series`
- **Countdown Timers**: View upcoming events with live countdown timers using `/countdown`
- **Custom Events**: Add your own events with custom emojis and scheduling types
- **Multi-Server Independent Operation**: Each Discord server's event data is completely independent
- **Smart Scheduling System**:
  - Bear Series Events: Auto-repeat every 48 hours
  - Other Events: One-time notifications (auto-deleted after notification)
  - Custom Events: Choose recurring or single type
- **Smart Timezone Display**: Shows both UTC time and local time using Discord's native timestamp feature
- **Multi-Language Support**: Notifications in 9 languages (Chinese, English, Tagalog, Indonesian, Korean, Japanese, Thai, Spanish, German)
- **PostgreSQL Database**: Permanent data storage - schedules persist through redeployments
- **Precise Reminders**: Automatic notifications sent 5 minutes before event start
- **Cloud Deployment Optimized**: Commands auto-register on startup, no manual configuration needed
- **Fun GIF Feature**: Search and share random GIFs from Giphy with `/gif` command

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
| `/setup_bear_series` | Batch schedule all 4 Bear Trap events at once | **Manage Server** |
| `/list` | View all scheduled events | Everyone |
| `/countdown` | Show upcoming events with countdown timers | Everyone |
| `/stop` | Stop specific event or clear all schedules (autocomplete search, select "All" to clear all) | Everyone |
| `/language` | Set your preferred notification language (9 languages supported) | Everyone |
| `/add_event` | Add a custom event with name, emoji, and type | **Manage Server** |
| `/remove_event` | Remove a custom event (autocomplete search) | **Manage Server** |
| `/gif` | Search and share random GIFs from Giphy (autocomplete suggestions + custom keywords) | Everyone |

### 🔒 Permission Requirements

- **Everyone**: All users can schedule events, view schedules, stop events, view countdowns, and set language preferences
- **Manage Server**: Only users with "Manage Server" permission can:
  - Batch schedule Bear Trap series (`/setup_bear_series`)
  - Create custom events (`/add_event`)
  - Remove custom events (`/remove_event`)
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
- Notification format (in your selected language):
```
🚨 @everyone

😂 **testevent** starts in **5 minutes**!

⏰ Start Time:
   • UTC Time: 2026-08-30 14:00
   • Your Time: [Displays in your local timezone automatically]

🛡️ Get ready for the battle!
```

#### Batch Schedule Bear Trap Series
```
/setup_bear_series
  bear_trap_1:2026-08-30 14:00
  bear_trap_2:2026-08-30 16:00
  academy_bear_trap_1:2026-08-30 18:00
  academy_bear_trap_2:2026-08-30 20:00
  channel:#events
```
- Schedules all 4 Bear Trap events at once
- Each event repeats every 48 hours automatically
- Saves time compared to scheduling each event individually
- Perfect for weekly Bear Trap coordination

#### View Countdown Timers
```
/countdown
```
- Shows all upcoming events with live countdown timers
- Example output:
```
⏰ Upcoming Events Countdown:

⚔️ Bear Trap 1 🔄
   • Time: in 2 hours
   • Countdown: 2h 15m 30s
   • Notification: 5 minutes before

😂 testevent 📅
   • Time: in 5 hours
   • Countdown: 5h 42m 18s
   • Notification: 5 minutes before

💡 Use /list to see full event details
```

#### Search and Share GIFs
```
/gif keyword:happy
```
- Searches Giphy for "happy" GIFs and returns a random GIF (auto-embeds in Discord)
- **Autocomplete Suggestions**: Type to see 20+ suggested keywords (happy, sad, excited, cat, dog, etc.)
- **Custom Keywords**: Enter any keyword you want (not limited to suggestions)
- **True Randomness**: Each search returns a different GIF (powered by Giphy Random API)
- **Clean Output**: Only shows the GIF image, no extra text
- Example: The bot will send a random GIF URL that Discord automatically displays as an embedded image

**Smart Features:**
- **Multi-Language**: Set your preferred language with `/language`
- **Timezone Display**: Shows both UTC time and your local time
- **Auto-Detection**: Uses your Discord language by default
- **Batch Scheduling**: Schedule all Bear Traps at once with `/setup_bear_series`
- **Countdown Timers**: Track time remaining with `/countdown`
- **Fun GIFs**: Share random GIFs from Giphy with `/gif`
- **9 Languages Supported**: 繁體中文, English, Tagalog, Indonesia, 한국어, 日本語, ไทย, Español, Deutsch

### 🌍 Multi-Language Support

The bot supports **9 languages** for notifications:

| Language | Code | Flag |
|----------|------|------|
| Traditional Chinese | zh-TW | 🇹🇼 |
| English | en-US | 🇺🇸 |
| Tagalog | tl | 🇵🇭 |
| Indonesian | id | 🇮🇩 |
| Korean | ko | 🇰🇷 |
| Japanese | ja | 🇯🇵 |
| Thai | th | 🇹🇭 |
| Spanish | es-ES | 🇪🇸 |
| German | de | 🇩🇪 |

**How it works:**
1. **Default**: Bot uses your Discord language setting automatically
2. **Custom**: Use `/language` to set your preferred language
3. **Real-Time**: Language preference applies immediately to all your scheduled events
4. **Per-User**: Each user can have their own language preference

**Example:**
```
/language lang:繁體中文
→ All your notifications (including existing schedules) will now be in Traditional Chinese
```

**Important Notes:**
- ✅ Changing language applies to **all your existing schedules** immediately
- ✅ Each user sees notifications in their own preferred language
- ⚠️ Language settings will reset when redeploying (use database for production)

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

#### 3. Add PostgreSQL Database

**IMPORTANT: Do this BEFORE deploying the bot!**

1. In your Zeabur project, click **"Create Service"** or **"+ Add Service"**
2. Select **"Marketplace"** or **"Prebuilt"**
3. Search for **"PostgreSQL"**
4. Click **"Deploy"**
5. Wait 1-2 minutes for PostgreSQL to finish deploying

Zeabur will automatically generate these environment variables:
- `POSTGRES_CONNECTION_STRING` (you'll reference this in bot settings)
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DATABASE`, etc.

#### 4. Get Giphy API Key (For `/gif` Command)

1. Go to [Giphy Developers](https://developers.giphy.com/)
2. Sign in or create an account
3. Click **"Create an App"** → Select **"API"**
4. Fill in:
   - App Name: `Hera's Decree Discord Bot`
   - App Description: `A Discord bot for event notifications and fun GIF commands`
5. Copy your **API Key** (looks like: `abc123def456...`)

#### 5. Configure Bot Environment Variables

Add these environment variables to your **bot service** (not PostgreSQL):

| Variable Name | Description | Example/Value |
|--------------|-------------|---------|
| `DISCORD_TOKEN` | Discord Bot Token | `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt` |
| `CLIENT_ID` | Discord Application ID | `1234567890123456789` |
| `GUILD_ID` | Discord Server ID (Optional) | `9876543210987654321` |
| `POSTGRES_CONNECTION_STRING` | PostgreSQL Connection | `${POSTGRES_CONNECTION_STRING}` |
| `GIPHY_API_KEY` | Giphy API Key (for `/gif` command) | `abc123def456ghi789...` |

**How to reference PostgreSQL:**
- Click the value field for `POSTGRES_CONNECTION_STRING`
- Type `${POSTGRES_CONNECTION_STRING}` - Zeabur will auto-link it to your PostgreSQL service

**Notes:**
- `NODE_ENV` is not required - Zeabur's internal PostgreSQL network doesn't use SSL
- `GIPHY_API_KEY` is optional - if not set, the `/gif` command will show an error message to users

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
│   ├── setup_bear_series.js
│   ├── list.js
│   ├── countdown.js
│   ├── stop.js
│   ├── add_event.js
│   ├── remove_event.js
│   ├── language.js
│   └── gif.js             # GIF search command (Giphy API)
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
- **Dual Time Display**: Shows both UTC time (for scheduling reference) and local time (automatic conversion)
- **Automatic Per-User Display**: Each user automatically sees event times in their own local timezone
- **No Configuration Required**: Discord handles timezone conversion automatically based on each user's device settings
- **Examples**:
  - Input: `/setup_time event:testevent time:2026-08-30 14:00` (UTC)
  - Notification shows:
    - UTC Time: 2026-08-30 14:00
    - Taiwan user's local time: `2026年8月30日 下午10:00`
    - Japan user's local time: `2026年8月30日 23:00`
    - US user's local time: `August 30, 2026 6:00 AM PST`
- **Benefits**:
  - ✅ Each user sees their own local time automatically
  - ✅ UTC time always visible for reference
  - ✅ Supports all timezones worldwide
  - ✅ Discord handles daylight saving time automatically

### Multi-Language System
- **Supported Languages**: 9 languages (繁體中文, English, Tagalog, Indonesia, 한국어, 日本語, ไทย, Español, Deutsch)
- **Auto-Detection**: Automatically uses Discord's locale setting
- **User Preferences**: Each user can override with `/language` command
- **Persistent Storage**: Language preferences stored in `user-preferences.json`
- **Per-Guild Per-User**: Each user has independent language settings for each server

### Scheduling Logic
- **Check frequency**: Every 60 seconds
- **Notification window**: 5-6 minutes before event time (1-minute tolerance window)
- **Bear event cycling**: Automatically adds 48 hours after sending notification
- **Single events**: Automatically removed after sending notification

### Data Storage

**PostgreSQL Database Tables:**

1. **schedules** - Event schedules
   - Stores: guild_id, event_name, event_time, channel_id, type, language, created_by
   - Primary Key: (guild_id, event_name)
   - Automatic timezone handling and recurring logic

2. **custom_events** - Custom events
   - Stores: guild_id, event_name, emoji, type
   - Primary Key: (guild_id, event_name)

3. **user_preferences** - Language preferences
   - Stores: guild_id, user_id, language
   - Primary Key: (guild_id, user_id)

**Benefits:**
- ✅ **Permanent storage** - Data persists through redeployments
- ✅ **Multi-server architecture** - Each guild's data is completely independent
- ✅ **Automatic backups** - Zeabur PostgreSQL includes backup features
- ✅ **No data loss** - Unlike JSON files, database data is never reset

**Legacy JSON Files (Deprecated):**
- Old versions used `scheduler-data.json`, `custom-events.json`, `user-preferences.json`
- These are no longer used with PostgreSQL enabled
- Format for reference:
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

## Testing Guide

### How to Test PostgreSQL Integration

After deploying with PostgreSQL, follow these steps to verify everything works:

#### 1. Check Database Connection
Look for these messages in Zeabur logs:
```
✅ Logged in as Hera's Decree#1234
✅ Database connection successful
✅ Database tables initialized successfully
```

#### 2. Test Event Scheduling
```
/setup_time event:Bear Trap 1 time:2026-08-28 XX:XX
→ Should see: ✅ Bear Trap 1 (Recurring, every 48 hours) scheduled...
```

#### 3. Verify Data Persistence
```
Step 1: /setup_time event:Caesar Boss time:2026-08-29 10:00
Step 2: /list
        → Should show: Caesar Boss scheduled

Step 3: Redeploy bot on Zeabur (trigger a new deployment)

Step 4: /list again
        → Should STILL show: Caesar Boss scheduled ✅
```

**If Caesar Boss is still there after redeployment, PostgreSQL is working correctly!**

#### 4. Test Multi-Language
```
/language lang:繁體中文
→ Wait for scheduled event notification
→ Should appear in Traditional Chinese ✅
```

#### 5. Test Custom Events
```
/add_event name:testevent emoji:😂 type:Single
/setup_time event:testevent time:2026-08-29 14:00
→ Should work and persist after redeployment ✅
```

### Expected Behavior

**With PostgreSQL (Current Version):**
- ✅ Schedules persist through redeployments
- ✅ Custom events persist
- ✅ Language settings persist
- ✅ No data loss on updates

**Without PostgreSQL (Old Version):**
- ❌ All data resets on redeployment
- ❌ Need to recreate schedules
- ❌ Custom events deleted
- ❌ Language settings lost

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

### Language not changing?
1. Make sure you used `/language` to set your preference
2. Language applies to **YOUR** schedules only (other users have their own settings)
3. If issue persists, try stopping and re-creating the schedule

### /help command error?
1. This was fixed in the latest version - redeploy to get the fix
2. If still failing, check Zeabur logs for detailed error messages

### Data disappeared after redeployment?
1. **With PostgreSQL**: Data should NOT disappear - check database connection
2. **Without PostgreSQL (old version)**: JSON files reset on every deployment
3. **Solution**: Ensure PostgreSQL is properly configured with `POSTGRES_CONNECTION_STRING`

### Database connection failed?
1. Check that PostgreSQL service is running in Zeabur
2. Verify `POSTGRES_CONNECTION_STRING` environment variable is set correctly as `${POSTGRES_CONNECTION_STRING}`
3. Check bot logs for specific database errors
4. If you see "SSL connection" errors, remove `NODE_ENV` variable (not needed for Zeabur)

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
