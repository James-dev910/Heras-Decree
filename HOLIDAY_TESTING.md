# Holiday Greeting System - Testing Guide (Multi-Server Version)

## 🎉 New Multi-Server Architecture

Each Discord server can now configure its own holidays independently! No more hard-coded channel IDs.

## Quick Start

### 1. Install Holiday Templates

Install pre-configured holiday templates for your server:

```
/holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#chinese
/holiday setup language:"Tagalog (Philippines)" channel:#tagalog
/holiday setup language:"English (Universal)" channel:#general
```

Each template contains multiple holidays that will be automatically sent to the specified channel.

### 2. List Your Holidays

```
/holiday list
```

This shows all holidays configured for **your server only** (not other servers).

### 3. Test Holidays

**Test in the configured channel:**
```
/holiday test name:"Chinese New Year" language:Traditional Chinese
```

**Test in a different channel (perfect for test servers!):**
```
/holiday test name:"Chinese New Year" language:Traditional Chinese channel:#test-channel
```

The `channel` parameter allows you to override the configured channel, making it easy to test in test servers without the exact channel names from production.

## Testing Workflow

### For Production Server:

1. Install templates with production channels:
   ```
   /holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#chinese
   /holiday setup language:"English (Universal)" channel:#general
   ```

2. Test in production channels:
   ```
   /holiday test name:"Christmas" language:English
   ```

3. Holidays will automatically send to the configured channels on the correct dates.

### For Test Server:

1. Install the same templates but with test server channels:
   ```
   /holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#test
   /holiday setup language:"English (Universal)" channel:#test
   ```

2. Or, install in production and test with channel override:
   ```
   /holiday test name:"Christmas" language:English channel:#any-test-channel
   ```

## How It Works

### Solar Calendar Holidays
- Checked by comparing: current month/day == holiday month/day
- Example: Christmas (12/25) triggers on December 25 every year

### Lunar Calendar Holidays
- Bot automatically converts current date to lunar calendar using `lunar-javascript`
- Compares lunar month/day with holiday lunar month/day
- Example: Mid-Autumn Festival (Lunar 8/15) triggers on different solar dates each year:
  - 2026: September 15 (solar)
  - 2027: October 4 (solar)
  - 2028: September 22 (solar)

### Multi-Server Support
- Each server has its own set of holidays in the database
- Holidays are stored with `guild_id` (server ID)
- Different servers can have different holidays and channels
- Modifying holidays in one server doesn't affect other servers

## Available Templates

| Language | Holidays | Description |
|----------|----------|-------------|
| **Traditional Chinese (Taiwan/HK)** | 5 | Chinese New Year (Lunar 1/1), Lantern Festival (Lunar 1/15), Dragon Boat Festival (Lunar 5/5), Mid-Autumn Festival (Lunar 8/15), National Day (10/10) |
| **Tagalog (Philippines)** | 4 | Independence Day (6/12), Rizal Day (12/30), New Year (1/1), Christmas (12/25) |
| **Bisaya/Cebuano (Philippines)** | 4 | Independence Day (6/12), Rizal Day (12/30), New Year (1/1), Christmas (12/25) |
| **Indonesian** | 3 | Independence Day (8/17), New Year (1/1), Christmas (12/25) |
| **English (Universal)** | 7 | New Year, Valentine's Day, Easter, Halloween, Thanksgiving, Christmas Eve, Christmas |

## Commands

### `/holiday setup`
Install a holiday template for your server.

**Parameters:**
- `language` - Choose from 5 templates (required)
- `channel` - Channel where greetings will be sent (required)

**Example:**
```
/holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#chinese
```

### `/holiday list`
View all holidays configured for your server.

**Example:**
```
/holiday list
```

### `/holiday test`
Send a test greeting immediately.

**Parameters:**
- `name` - Holiday name (autocomplete) (required)
- `language` - Holiday language (autocomplete) (required)
- `channel` - Override channel for testing (optional)

**Examples:**
```
/holiday test name:"Chinese New Year" language:Traditional Chinese
/holiday test name:"Christmas" language:English channel:#test
```

### `/holiday add`
Add a custom holiday.

**Parameters:**
- `name` - Holiday name
- `calendar` - Solar or Lunar
- `month` - 1-12
- `day` - 1-31
- `language` - Language code
- `channel` - Channel to send greeting
- `message` - Greeting message
- `gif_keyword` - Giphy search keyword

**Example:**
```
/holiday add
  name:"Qixi Festival"
  calendar:lunar
  month:7
  day:7
  language:Traditional Chinese
  channel:#chinese
  message:"💕 七夕節快樂！\n\n願天下有情人終成眷屬！"
  gif_keyword:"chinese valentine"
```

### `/holiday delete`
Delete a holiday from your server.

**Example:**
```
/holiday delete name:"Easter" language:English
```

### `/holiday enable` / `/holiday disable`
Enable or disable a holiday without deleting it.

**Example:**
```
/holiday disable name:"Halloween" language:English
/holiday enable name:"Halloween" language:English
```

## Troubleshooting

### "No holidays configured for this server"

**Solution:** Install a template first using `/holiday setup`

### "Holiday not found" when testing

**Possible causes:**
1. Holiday hasn't been installed for this server
2. Typo in holiday name (use autocomplete)
3. Wrong language selected

**Solution:** Use `/holiday list` to see available holidays, then use autocomplete in `/holiday test`

### Test greeting not appearing

**Possible causes:**
1. Bot doesn't have permission to send messages in the channel
2. Bot doesn't have permission to embed links (for GIFs)
3. Channel ID is invalid

**Solution:**
- Check bot permissions in the target channel
- Try using channel override: `/holiday test ... channel:#another-channel`

### Lunar calendar dates seem wrong

**Verification:**
1. Check today's lunar date:
   ```javascript
   const { Solar } = require('lunar-javascript');
   const solar = Solar.fromDate(new Date());
   const lunar = solar.getLunar();
   console.log(`Today (Lunar): ${lunar.getMonth()}/${lunar.getDay()}`);
   ```

2. Compare with online lunar calendar converter

3. The bot uses the same library, so dates should match

## Production vs Test Server Setup

### Scenario: You have both production and test servers

**Option 1: Install in both servers**
```
# Production Server
/holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#chinese
/holiday setup language:"English (Universal)" channel:#general

# Test Server
/holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#test
/holiday setup language:"English (Universal)" channel:#test
```

**Option 2: Install in production only, test with override**
```
# Production Server
/holiday setup language:"Traditional Chinese (Taiwan/HK)" channel:#chinese

# Test Server (use channel override)
# First, run /holiday list in production to see holiday names
# Then test in test server:
/holiday test name:"Chinese New Year" language:Traditional Chinese channel:#any-test-channel
```

**Recommendation:** Use Option 2 for simplicity. The test server doesn't need permanent holiday configuration if you're just testing.

## Expected Holiday Schedule for 2026

### Lunar Calendar Holidays (dates auto-calculated)
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
- **Thanksgiving**: November 28, 2026
- **Christmas Eve**: December 24, 2026
- **Christmas**: December 25, 2026
- **Rizal Day**: December 30, 2026

## Maintenance

### No Maintenance Needed for Lunar Holidays ✅

Lunar calendar holidays automatically calculate correct dates every year:
- Chinese New Year
- Lantern Festival
- Dragon Boat Festival
- Mid-Autumn Festival
- Any other lunar holidays you add

**These will always trigger on the correct date without any manual updates!**

### Variable Solar Holidays (Update Manually)

Some holidays have variable dates:

1. **Easter** - Varies based on lunar calendar
   - 2026: April 5
   - 2027: March 28
   - Update using `/holiday add` with new date

2. **Thanksgiving (US)** - 4th Thursday of November
   - 2026: November 26
   - Currently set to November 28
   - Update if needed

## FAQ

**Q: Can I install multiple language templates?**
A: Yes! Install as many as you want. Each goes to a different channel.

**Q: Can I customize the greeting message?**
A: Yes, use `/holiday add` to create a custom holiday or update an existing one.

**Q: Do I need to set up holidays on every server?**
A: Yes, each server needs its own setup. But it's just one command per language template.

**Q: Can I test in my test server without installing holidays?**
A: No, you need to install at least one template. But you can test in any channel using the `channel` override parameter.

**Q: What happens if I delete the configured channel?**
A: The holiday greeting will fail to send. Update the channel using `/holiday add` with the same holiday name and language.

**Q: Can I disable all holidays at once?**
A: Not currently. Disable individually using `/holiday disable`, or delete using `/holiday delete`.
