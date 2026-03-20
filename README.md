# AutoApplyMax

**AI-powered job application automation.** Auto-apply to 50+ jobs/day across LinkedIn, Indeed, Glassdoor, WTTJ & Monster.

<div align="center">

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install%20Free-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/autoapplymax/oeaobljpdipleeanlfjppmlokkajodbk)
[![Website](https://img.shields.io/badge/Website-autoapplymax.com-0A66C2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.autoapplymax.com)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/xWaCXBZbws)

</div>

---

## What is AutoApplyMax?

AutoApplyMax is a free Chrome extension that automates your entire job search. Instead of spending 3-4 hours/day filling the same forms, AutoApplyMax handles it all — auto-filling applications, optimizing your resume with AI, generating cover letters, and tracking everything in a real-time dashboard.

### The Problem

- Average job seeker spends **11 hours/week** applying
- **70% of applications** are never seen by a human
- Same forms filled out **50+ times**
- No way to track what you applied to

### The Solution

Upload your resume once, fill your profile, and let AutoApplyMax do the rest.

---

## Features

### Multi-Platform Auto-Apply

One-click automation across 5+ job platforms:

| Platform | What AutoApplyMax Does |
|----------|----------------------|
| **LinkedIn** | Easy Apply automation — fills every field, clicks Submit |
| **Indeed** | SmartApply multi-step form navigation |
| **Glassdoor** | One-click application submission |
| **WTTJ** | Full form completion |
| **Monster** | Automated form filling & submission |
| **Any site** | Universal Autofill for any job application form |

### AI Resume Optimizer

Your resume, tailored to every job automatically:

- **ATS Compatibility Scoring** — target 90%+ to pass Applicant Tracking Systems
- **Keyword Matching** — extracts keywords from job descriptions and optimizes your resume
- **Smart Rewording** — AI rewrites sections for maximum impact
- **Before/After Comparison** — see exactly what changed and why

### AI Cover Letter Generator

Personalized cover letters in one click:

- Company-specific personalization based on mission & values
- Multiple professional tones
- Job requirement matching
- Template library for different industries

### Real-Time Dashboard

Track every application in one place:

- **Pipeline View** — Applied > Screening > Interview > Offer
- **ATS Scores** — see your score per application
- **Analytics** — weekly/monthly performance, response rates
- **Export** — download all data as CSV

### Smart Form Filling

- Human-like behavior with random delays (1-3s between actions)
- Multi-selector detection (XPath + CSS) for robust element finding
- Auto-retry on failed actions (up to 3 attempts)
- Stuck detection with auto-recovery (2min timeout)
- Session persistence — resume where you left off

---

## Quick Start

### Install from Chrome Web Store (Recommended)

1. **[Install AutoApplyMax](https://chromewebstore.google.com/detail/autoapplymax/oeaobljpdipleeanlfjppmlokkajodbk)** — free, one-click install
2. Click the extension icon, fill your profile once
3. Upload your resume (PDF/DOCX)
4. Go to LinkedIn/Indeed/Glassdoor and click **Start**
5. Track everything at [autoapplymax.com/dashboard](https://www.autoapplymax.com/dashboard.html)

### Install from Source

```bash
git clone https://github.com/Azoo92i/EAM-.git
cd EAM-
```

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the folder

---

## How It Works

```
You fill your profile once
        |
        v
AutoApplyMax opens job listings
        |
        v
AI optimizes your resume for each job (ATS 90%+)
        |
        v
Forms are auto-filled and submitted
        |
        v
Dashboard tracks everything in real-time
```

### Architecture

```
AutoApplyMax/
├── manifest.json          # Chrome Extension Manifest V3
├── popup.html/css/js      # Extension popup UI
├── content-simple.js      # Main automation engine
├── background.js          # Service worker (tab orchestration)
├── icons/                 # Extension icons
└── chrome-store-release/  # Production build
```

**Adapters Pattern:** Each job platform has a dedicated adapter that handles site-specific form structures, button locations, and submission flows. A generic FormFiller handles common fields, while adapters override for platform-specific quirks.

---

## Job Search Tips

Based on data from thousands of automated applications:

1. **Apply within 24 hours of posting.** Jobs posted <24h have 3x higher response rates. Recruiters review the first batch and move on.

2. **Keep your resume ATS-simple.** Single column, standard fonts, no graphics. Fancy Canva resumes get parsed as garbage by ATS systems. A plain resume gets 4x more callbacks.

3. **Match keywords from the job description.** If the posting says "project management" and your resume says "managed projects" — some ATS will miss it. Use exact phrases. Target 70%+ keyword match for best results.

4. **Volume + quality is the formula.** Applying to 5 jobs/day manually feels productive but gets you nowhere. 40-50 properly formatted applications/day with automation changes the math entirely.

5. **Track everything.** You can't optimize what you don't measure. Use the dashboard to see which platforms get the best response rates for your profile.

6. **Follow up on LinkedIn.** After applying, find the hiring manager and send a 2-line message. This alone can double your interview rate for specific roles.

---

## Links

| | |
|---|---|
| Website | [autoapplymax.com](https://www.autoapplymax.com) |
| Dashboard | [autoapplymax.com/dashboard](https://www.autoapplymax.com/dashboard.html) |
| Blog | [autoapplymax.com/blog](https://www.autoapplymax.com/blog.html) |
| Chrome Extension | [Chrome Web Store](https://chromewebstore.google.com/detail/autoapplymax/oeaobljpdipleeanlfjppmlokkajodbk) |
| Discord | [Join Community](https://discord.gg/xWaCXBZbws) |
| Twitter/X | [@autoapplymax](https://x.com/autoapplymax) |

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- Report bugs via [Issues](https://github.com/Azoo92i/EAM-/issues)
- Suggest features on [Discord](https://discord.gg/xWaCXBZbws)
- Submit pull requests

---

## Security & Privacy

- All data stored locally in your browser (chrome.storage)
- Open source — fully transparent code
- No tracking, no analytics, no data collection
- Resume data never leaves your machine (AI features use client-side processing)

---

## License

Licensed under **GNU Affero General Public License v3.0 (AGPL-3.0)** — see [LICENSE](LICENSE).

---

## Disclaimer

This tool assists with job searching. Use responsibly and ethically. Excessive automation may violate platform Terms of Service. We are not responsible for account restrictions.

---

<div align="center">

**AutoApplyMax — Go from 5 to 50+ job applications per day.**

[Install Free](https://chromewebstore.google.com/detail/autoapplymax/oeaobljpdipleeanlfjppmlokkajodbk) | [Website](https://www.autoapplymax.com) | [Discord](https://discord.gg/xWaCXBZbws) | [Twitter](https://x.com/autoapplymax)

</div>
