# Holiday Greeting System - Testing Guide

## How to Test Holiday Greetings

### Method 1: Test Command (Recommended)

Use the `/holiday test` command to send a test greeting immediately:

```
/holiday test name:"Chinese New Year" language:Traditional Chinese
```

This will:
- Send the greeting to the configured channel immediately
- Add "(TEST)" to the title so you know it's a test
- Use the exact same format as real holiday greetings
- Include a random GIF from Giphy based on the gif_keyword

### Method 2: List All Holidays

View all configured holidays to verify they're in the database:

```
/holiday list
```

This shows:
- All solar calendar holidays
- All lunar calendar holidays
- Whether each holiday is enabled or disabled
- The channel where greetings will be sent

### Method 3: Check Logs

When the bot starts up, check the console logs for:
```
✅ Database tables initialized successfully
🎉 Initializing holidays...
✅ Successfully initialized 23 holidays!
🎉 Holiday greeting system initialized
```

## How Holiday Checking Works

1. **On Bot Startup**: The bot checks for holidays immediately
2. **Hourly Checks**: Every hour, the bot checks if it's midnight UTC (00:00)
3. **At Midnight**: If it's midnight, the bot checks for holidays matching today's date

### Solar Calendar Holidays
- Checked by comparing: current month/day == holiday month/day
- Example: Christmas (12/25) triggers on December 25 every year

### Lunar Calendar Holidays
- Bot automatically converts current date to lunar calendar
- Compares lunar month/day with holiday lunar month/day
- Example: Mid-Autumn Festival (Lunar 8/15) triggers on different solar dates each year
  - 2026: September 15 (solar)
  - 2027: October 4 (solar)
  - 2028: September 22 (solar)

## Verifying Lunar Calendar Conversion

To verify the lunar calendar conversion is working:

1. **Check Today's Lunar Date**:
   ```javascript
   const { Solar } = require('lunar-javascript');
   const solar = Solar.fromDate(new Date());
   const lunar = solar.getLunar();
   console.log(`Lunar Date: ${lunar.getMonth()}/${lunar.getDay()}`);
   ```

2. **Add a Test Holiday for Today's Lunar Date**:
   ```
   /holiday add
     name:"Test Lunar Holiday"
     calendar:lunar
     month:<today's lunar month>
     day:<today's lunar day>
     language:English
     channel:#general
     message:"This is a test of the lunar calendar system!"
     gif_keyword:"celebration"
   ```

3. **Wait for Next Hourly Check** or restart the bot to trigger immediate check

4. **Verify Greeting Appears** in the #general channel

## Expected Holiday Schedule for 2026

Here are some key holidays and when they should trigger in 2026:

### Lunar Calendar Holidays (dates vary each year)
- **Chinese New Year** (Lunar 1/1): January 29, 2026
- **Lantern Festival** (Lunar 1/15): February 12, 2026
- **Dragon Boat Festival** (Lunar 5/5): May 26, 2026
- **Mid-Autumn Festival** (Lunar 8/15): September 15, 2026

### Solar Calendar Holidays (fixed dates)
- **New Year**: January 1, 2026
- **Valentine's Day**: February 14, 2026
- **Philippines Independence Day**: June 12, 2026
- **Indonesia Independence Day**: August 17, 2026
- **Taiwan National Day**: October 10, 2026
- **Halloween**: October 31, 2026
- **Thanksgiving**: November 28, 2026 (4th Thursday of November - update manually if needed)
- **Christmas Eve**: December 24, 2026
- **Christmas**: December 25, 2026
- **Rizal Day**: December 30, 2026

## Troubleshooting

### Holiday greeting didn't send

1. **Check if holiday is enabled**:
   ```
   /holiday list
   ```
   Look for ✅ (enabled) or ❌ (disabled) next to the holiday

2. **Check bot is running**:
   - Verify bot is online in Discord
   - Check Zeabur deployment logs

3. **Check channel permissions**:
   - Bot must have permission to send messages in the target channel
   - Bot must have permission to embed links (for GIF display)

4. **Check Giphy API key**:
   - Verify GIPHY_API_KEY is set in environment variables
   - If missing, greeting will send without GIF

5. **Check logs for errors**:
   ```
   ❌ Error checking holidays: [error message]
   ```

### Test command not working

1. **Check permissions**: Only administrators can use `/holiday` command
2. **Check autocomplete**: Use autocomplete to select holiday name and language
3. **Check channel exists**: Verify the target channel hasn't been deleted

### Lunar calendar dates seem wrong

1. **Verify lunar-javascript package** is installed:
   ```
   npm list lunar-javascript
   ```

2. **Test lunar conversion** with current date:
   ```javascript
   const { Solar } = require('lunar-javascript');
   const solar = Solar.fromDate(new Date());
   const lunar = solar.getLunar();
   console.log(`Today (Lunar): ${lunar.getMonth()}/${lunar.getDay()}`);
   ```

3. **Compare with online lunar calendar** (e.g., https://www.hko.gov.hk/tc/gts/time/calendar/calendar.htm)

## Adding New Holidays

### Example: Add Día de los Muertos (Day of the Dead)

```
/holiday add
  name:"Día de los Muertos"
  calendar:solar
  month:11
  day:1
  language:en
  channel:#general
  message:"🌺 Happy Día de los Muertos!\n\nRemembering and honoring our loved ones who have passed."
  gif_keyword:"day of the dead"
```

### Example: Add Qixi Festival (Chinese Valentine's Day - Lunar Calendar)

```
/holiday add
  name:"Qixi Festival"
  calendar:lunar
  month:7
  day:7
  language:zh-TW
  channel:#chinese
  message:"💕 七夕節快樂！\n\n願天下有情人終成眷屬！"
  gif_keyword:"chinese valentine"
```

## Maintenance

### Annual Review (Recommended)

Some holidays have variable dates (e.g., Easter, Thanksgiving):

1. **Easter**: Varies each year based on lunar calendar
   - 2026: April 5
   - 2027: March 28
   - Update manually or disable if date doesn't match

2. **Thanksgiving (US)**: 4th Thursday of November
   - 2026: November 26
   - Currently set to November 28 in database
   - Update if needed: `/holiday add` with correct date

### No Maintenance Needed

Lunar calendar holidays automatically calculate correct dates:
- Chinese New Year
- Lantern Festival
- Dragon Boat Festival
- Mid-Autumn Festival
- Qixi Festival
- Any other lunar calendar holidays

These will always trigger on the correct date without any manual updates!
