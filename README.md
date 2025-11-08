# EasyApplyMax

> **🚀 Currently in active development** - Join our community to stay updated on new features!

A powerful Chrome extension that automates LinkedIn Easy Apply job applications with smart form filling and human-like behavior simulation.

<div align="center">

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/xWaCXBZbws)
[![Twitter Follow](https://img.shields.io/badge/Twitter-@Azo92i-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Azo92i)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Features

### Current Features
- ✅ **Automated Easy Apply** - One-click job applications on LinkedIn
- ✅ **Smart Form Filling** - Automatically fills forms with your profile data
- ✅ **Human-like Behavior** - Random delays and natural interactions to avoid detection
- ✅ **Application Tracking** - Real-time statistics (applied, skipped, errors)
- ✅ **Blacklist System** - Skip jobs with unwanted keywords
- ✅ **Daily Limit Detection** - Stops when LinkedIn's limit is reached
- ✅ **Session Persistence** - Resume where you left off after browser restart
- ✅ **Export Data** - Download applied jobs as CSV

### 🚀 Coming Soon (Roadmap)
- 🔮 **AI-Powered Matching** - Smart job recommendations based on your profile
- 📄 **Dynamic CV Adaptation** - Auto-generate tailored resumes for each job
- ✍️ **Auto Cover Letters** - AI-generated personalized cover letters
- 🌐 **Company Website Auto-Apply** - Apply directly on company career pages
- 📊 **Advanced Analytics** - Track application success rates and insights
- 🎯 **Multi-Platform Support** - Extend to Indeed, Glassdoor, and more
- 🤖 **GPT Integration** - Enhanced form filling with AI understanding

---

## 🎥 Video Tutorial

<div align="center">

### 📺 Watch the Complete Tutorial

Learn how to install and use EasyApplyMax in this comprehensive video guide:

[![EasyApplyMax Tutorial](https://img.shields.io/badge/YouTube-Watch%20Tutorial-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=e7mUETgoZrI)

**[▶️ Watch on YouTube](https://www.youtube.com/watch?v=e7mUETgoZrI)**

The video covers:
- ✅ Installation and setup
- ✅ Configuration of your profile
- ✅ How to use the extension
- ✅ Tips and best practices

</div>

---

## 💬 Community & Support

<div align="center">

### 🌟 This is a Community-Driven Project!

We're building EasyApplyMax together with job seekers worldwide. Join us to:
- 💡 **Suggest features** you want to see
- 🐛 **Report bugs** and help improve stability
- 🤝 **Get support** from the community
- 🎯 **Share tips** and best practices
- 🚀 **Stay updated** on new AI-powered features

</div>

<table>
<tr>
<td align="center" width="50%">

### 💬 Discord Community
**Your main hub for everything EasyApplyMax**

Get instant help, discuss features, and connect with other users actively using the tool.

<a href="https://discord.gg/xWaCXBZbws">
  <img src="https://img.shields.io/badge/Join-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join Discord">
</a>

**[📱 Join Now →](https://discord.gg/xWaCXBZbws)**

</td>
<td align="center" width="50%">

### 🐦 Twitter Updates
**Follow for announcements & tips**

Stay in the loop with new releases, feature updates, and job search automation tips.

<a href="https://twitter.com/Azo92i">
  <img src="https://img.shields.io/badge/Follow-@Azo92i-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Follow on Twitter">
</a>

**[🔔 Follow @Azo92i →](https://twitter.com/Azo92i)**

</td>
</tr>
</table>

---

## 📥 Installation

### Quick Install (5 minutes)

1. **Download the extension**
   ```bash
   git clone https://github.com/yourusername/EasyApplyMax.git
   cd EasyApplyMax
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the `EasyApplyMax` folder
   - The extension icon should appear in your toolbar ✅

---

## ⚙️ Configuration

1. **Click the extension icon** in Chrome toolbar
2. **Fill your information:**
   - Personal details (name, email, phone)
   - Location (city, country)
   - Experience level
   - Expected salary & notice period
3. **Configure settings:**
   - Add blacklist keywords (e.g., "internship, junior, remote")
   - Set max applications per session
4. **Click "Save Configuration"** 💾

---

## 🎯 Usage Guide

### Step 1: Prepare Your Search

1. Go to **[LinkedIn Jobs](https://www.linkedin.com/jobs)**
2. Search for your desired positions
3. Apply filters (location, experience, salary, etc.)
4. ⚠️ **IMPORTANT**: Enable **"Easy Apply"** filter (mandatory)

### Step 2: Launch the Bot

1. Click the EasyApplyMax icon
2. Verify your configuration
3. Click **"Start"** ▶️
4. The bot will:
   - Browse job listings automatically
   - Click "Easy Apply" buttons
   - Fill out application forms
   - Submit applications
   - Move to next job

### Step 3: Monitor Progress

- 📊 **View stats** in extension popup
- 📝 **Check logs** in browser console (F12)
- ⏸️ **Stop anytime** with the Stop button
- 💾 **Auto-save** - Progress saved automatically

---

## 🧠 How It Works

The extension uses advanced techniques for reliability:

| Feature | Description |
|---------|-------------|
| **Multi-Selector Detection** | Uses XPath + CSS selectors for robust element finding |
| **Retry Mechanism** | Auto-retries failed actions up to 3 times |
| **Human Simulation** | Random delays (1-3s) between actions |
| **Form Intelligence** | Handles various LinkedIn form types |
| **Error Recovery** | Continues to next job if one fails |
| **Stuck Detection** | Auto-recovery if process freezes (2min timeout) |

---

## 📁 Project Structure

```
EasyApplyMax/
├── manifest.json          # Extension configuration
├── popup.html             # User interface
├── popup.css              # UI styling
├── popup.js               # UI logic
├── content-simple.js      # Main automation engine (51KB)
├── background.js          # Service worker
├── icons/                 # Extension icons
├── test/                  # Testing pages
├── docs/                  # Additional documentation
└── README.md              # This file
```

---

## 🧪 Testing

Test the extension before using on LinkedIn:

1. Open `test/test.html` in Chrome
2. Configure the extension
3. Click "Start"
4. Verify forms fill automatically ✅

---

## 🔒 Security & Privacy

- ✅ **100% Local** - All data stored in your browser only
- ✅ **No External Servers** - Zero data transmission
- ✅ **LinkedIn Only** - Extension only works on linkedin.com
- ✅ **Open Source** - Fully transparent code
- ✅ **No Tracking** - We don't collect any data

---

## ⚠️ Limitations

- Only works with **LinkedIn Easy Apply** jobs
- Some complex forms may need manual input
- LinkedIn may detect automation (use responsibly!)
- Daily limit: **~50-100 applications** per LinkedIn account
- Not responsible for account restrictions

---

## 🐛 Troubleshooting

<details>
<summary><strong>🔴 Extension doesn't start</strong></summary>

- ✓ Verify you're logged into LinkedIn
- ✓ Must be on job search results page
- ✓ Check configuration is complete
- ✓ Review logs in console (F12)

</details>

<details>
<summary><strong>🔴 Forms not filling</strong></summary>

- ✓ Verify all config fields are filled
- ✓ Try different field names (language-dependent)
- ✓ Check console for errors (F12)

</details>

<details>
<summary><strong>🔴 Bot seems stuck</strong></summary>

- ✓ Extension has 2-minute stuck detection
- ✓ Random delays are intentional (human simulation)
- ✓ Click "Stop" and restart if needed

</details>

---

## 🎓 Best Practices

- 🎯 Use blacklist to filter unwanted jobs
- ⏰ Don't run continuously for hours - take breaks
- 📝 Review applications periodically
- 🔄 Keep your LinkedIn profile updated
- 📊 Monitor statistics for effectiveness
- ⚖️ Use responsibly and ethically

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 📖 Improve documentation
- 🌍 Add translations

---

## 📜 License

Licensed under **GNU Affero General Public License v3.0 (AGPL-3.0)**

See [LICENSE](LICENSE) for full details.

---

## ⚠️ Disclaimer

This tool is provided for **educational purposes** and to assist with job searching.

**Important:**
- Use responsibly and ethically
- Excessive use may violate LinkedIn's Terms of Service
- We are not responsible for account restrictions
- This is a development tool in active progress

---

## 💎 Support the Project

Love EasyApplyMax? Here's how you can help:

- ⭐ **Star this repo** on GitHub
- 💬 **Join our [Discord](https://discord.gg/xWaCXBZbws)** community
- 🐦 **Follow [@Azo92i](https://twitter.com/Azo92i)** on Twitter
- 🔄 **Share** with job seekers
- 🐛 **Report bugs** to help us improve

---

<div align="center">

### 🚀 Ready to maximize your job applications?

**[Join Discord](https://discord.gg/xWaCXBZbws)** • **[Follow @Azo92i](https://twitter.com/Azo92i)** • **[Report Issues](https://github.com/yourusername/EasyApplyMax/issues)**

---

**Good luck with your job search! 🎯**

Made with ❤️ for job seekers worldwide

</div>
