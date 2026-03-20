# Changelog

All notable changes to AutoApplyMax will be documented in this file.

## [v1.6.0] - 2026-01-26

### ✨ New Features

- **AI-Powered Answers (Groq Integration)** - Uses Groq AI to intelligently answer unknown/custom application questions
- **Smart Answer Caching** - All answers are saved to storage and reused for similar questions (no repeated API calls)
- **Similarity Matching** - Finds cached answers for similar questions using Jaccard similarity algorithm
- **Professional Profile** - Configure your professional summary and skills for better AI responses
- **Textarea Support** - Now handles long-form text fields like cover letter snippets
- **Learning System** - Saves all submitted answers to improve future applications

### 🔧 Settings Additions

- Groq API Key field (free at console.groq.com)
- Enable/Disable AI toggle
- Professional Summary textarea
- Skills input field
- Cached answers counter with clear button

### 📝 How AI Works

1. When a question is detected, first checks the cache for exact or similar matches
2. If no cache hit (>70% similarity), calls Groq API with your profile context
3. Answer is saved to cache for future use
4. All answers from successful applications are automatically cached

## [v1.5.0] - 2026-01-15

### ✨ New Features

- **LinkedIn Collections Support** - Now works on `/jobs/collections/` pages (saved jobs, recommended jobs, etc.) with infinite scroll
- **Smart Resume Selection** - Now selects existing/previously uploaded CV instead of re-uploading for each application. Only uploads once (first application), then reuses the CV.

### 🐛 Bug Fixes

- Removed redundant "Welcome aboard!" toast message after onboarding
- Fixed fadeOut animation for onboarding overlay closure
- Fixed resume being uploaded for every single application (now uploads once, then selects existing)

### 🔧 Technical Improvements

- Collections support uses conditional selectors (only on collections pages, doesn't affect search pages)
- Infinite scroll pagination for collections pages
- Standard pagination preserved for search pages

## [v1.0.0] - 2024-10-28

### 🎉 Initial Release

#### ✨ Features

- **Automated LinkedIn Easy Apply** - One-click job applications
- **Smart Form Filling** - Automatically fills application forms
- **Human-like Behavior** - Random delays and natural interactions
- **Blacklist System** - Skip jobs with unwanted keywords
- **Daily Limit Detection** - Automatically stops when LinkedIn limit is reached
- **Session Persistence** - Resume where you left off after browser restart
- **Application Tracking** - Real-time statistics (applied/skipped/errors)
- **CSV Export** - Download applied jobs data
- **Applied Jobs Tab** - View application history in extension popup

#### 🎨 UI/UX

- Clean, modern interface with LinkedIn color scheme
- Discord community card with direct link
- Three tabs: Personal Info, Settings, Applied Jobs
- Gradient button colors:
  - **Save Config**: Light blue (#e8f4f8 → #d4e9f2)
  - **Stop**: Light red (#fee2e2 → #fecaca)
  - **Export**: Light green (#d1fae5 → #a7f3d0)
  - **Reset**: Light orange (#fed7aa → #fdba74)
- Job cards with company, location, and time ago
- Empty state for no applications

#### 🤖 Automation

- Multi-selector element detection (XPath + CSS)
- Retry mechanism (up to 3 attempts)
- Automatic stuck detection (2-minute timeout)
- Form intelligence for various LinkedIn form types
- Error recovery and continuation

#### 🔒 Security & Privacy

- 100% local data storage
- No external servers
- LinkedIn-only permissions
- Open source and transparent

#### 💬 Community

- Discord integration (<https://discord.gg/xWaCXBZbws>)
- Twitter presence (@Azo92i)
- Community-driven development
- Feature voting and feedback

#### 📚 Documentation

- Professional README with roadmap
- Installation guide
- Usage guide
- Troubleshooting section
- Contributing guidelines
- Icon generation guide
- Next steps guide
- Google Sheets integration guide (future)

### 🐛 Bug Fixes

- Fixed daily limit detection with multiple message patterns
- Improved button state synchronization
- Better error handling for failed applications

### 🚀 Coming Soon (Roadmap)

#### v1.1.0 - AI Integration

- AI-powered job matching
- Google Sheets auto-export
- Success rate tracking

#### v1.2.0 - CV & Cover Letters

- Dynamic CV adaptation for each job
- AI-generated cover letters
- Multi-format resume support

#### v1.3.0 - Multi-Platform

- Indeed support
- Glassdoor support
- Company career page auto-apply

#### v1.4.0 - Advanced Analytics

- Application success rates
- Response time tracking
- Industry insights
- A/B testing features

---

## Version History

- **v1.0.0** - 2024-10-28 - Initial release 🎉

---

## Upgrade Guide

### From Nothing to v1.0.0

Fresh install - follow [Installation Guide](README.md#installation)

---

## Breaking Changes

None yet - this is the first release!

---

## Contributors

- Initial development and design
- Community feedback and testing

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Links

- 💬 [Discord Community](https://discord.gg/xWaCXBZbws)
- 🐦 [Twitter @Azo92i](https://twitter.com/Azo92i)
- 🐛 [Report Issues](https://github.com/yourusername/AutoApplyMax/issues)
- ⭐ [GitHub Repo](https://github.com/yourusername/AutoApplyMax)
