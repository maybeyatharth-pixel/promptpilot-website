# PromptPilot — AI Prompt Generator & Studio 🚀

> **Craft High-Impact AI Prompts in Seconds.**  
> Transform vague ideas into structured, high-precision prompts for ChatGPT, Claude, Gemini, and Midjourney using proven prompt engineering frameworks. 100% Free, Client-Side, and Privacy-Preserving.

![PromptPilot Preview](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Hosting](https://img.shields.io/badge/Deploy%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify)
![Stack](https://img.shields.io/badge/Stack-Modular%20HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## ✨ Features & Highlights

- **🎯 Systematic Frameworks (CO-STAR & RTF):** Generates prompts applying **Context, Objective, Style, Tone, Audience, and Response**, plus **Role, Task, and Format** execution principles.
- **⚡ 5 Specialized Domain Categories:**
  - 💻 **Coding & Dev:** Architecture specs, unit test suites, refactoring, and security audits.
  - 📚 **Studying & Academia:** Feynman technique explanations, active recall flashcards, and literature reviews.
  - ✍️ **Writing & Content:** Authoritative technical essays, newsletter hooks, and narrative structures.
  - 📈 **Marketing & Sales:** High-converting landing copy, enterprise cold outreach, and social hooks.
  - 🎨 **Creative & Design:** Worldbuilding lore, cinematic Midjourney v6 parameters, and screenwriting beats.
  - ⚡ **General / Universal:** Decision matrices, trade-off analyses, and executive briefs.
- **🤖 Multi-Model Syntax Adaptation:**
  - **Claude 3.5 Sonnet:** Formats instructions with Anthropic's recommended XML semantic tags (`<role>`, `<context>`, `<task>`, `<constraints>`).
  - **ChatGPT (GPT-4o):** Formats instructions with system markdown role framing.
  - **Google Gemini:** Formats instructions with structured directives and explicit grounding.
  - **Midjourney v6:** Formats prompts with photorealistic descriptors, lighting parameters, and camera flags (`--ar 16:9 --v 6.0 --style raw`).
- **📋 1-Click Clipboard Copy & Export:** Instant copy with visible toast notification feedback, plus direct `.md` and `.txt` file export.
- **📊 Real-Time Quality Score & Token Estimator:** Evaluates prompt clarity, role assignment, constraints presence, and estimated token usage.
- **⭐ Local Favorites & History:** Save prompts directly in your browser's `localStorage` with zero account creation required.
- **📨 Netlify-Compatible Contact Form:** Built-in form handling with bot-field spam protection, client-side validation, and instant confirmation states.
- **🔒 100% Client-Side Privacy:** Zero data sent to third-party AI APIs. Runs entirely in your browser without requiring paid API keys.

---

## 📂 Project Architecture

```
promptpilot/
├── index.html               # Main semantic HTML5 structure, Netlify form, SEO & social meta
├── netlify.toml             # Netlify deployment configuration & security headers
├── _redirects               # Single-page static redirect fallback
├── .gitignore               # Git ignore rules
├── README.md                # Documentation, setup, GitHub & Netlify deployment guides
├── css/
│   ├── styles.css           # Global theme variables, typography, layout, animations
│   └── components.css       # Studio panels, segmented cards, modals, toasts, drawers, buttons
├── js/
│   ├── app.js               # Main application coordinator & event listeners
│   ├── generator.js         # Prompt generation engine (CO-STAR, RTF, multi-model syntax)
│   ├── presets.js           # Curated prompt blueprints & quick template presets library
│   ├── storage.js           # LocalStorage favorites & history persistence
│   └── ui.js                # Toast system, clipboard copy, mobile navigation, export downloads
└── tests/
    └── test-runner.ps1      # Automated sanity & validation test script
```

---

## 💻 How to Run Locally

Because PromptPilot uses modern ES6 modules, open it using a local HTTP server or modern browser:

### Option 1: Using Python (if installed)
```bash
# In the promptpilot directory:
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 2: Using Node / npx / http-server (if installed)
```bash
# In the promptpilot directory:
npx serve .
# or
npx http-server . -p 8080
```

### Option 3: Using VS Code Live Server
1. Open the `promptpilot` folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 4: Direct Browser Preview
You can also directly double-click `index.html` or open it with Microsoft Edge / Google Chrome:
```powershell
Start-Process "msedge.exe" "$PWD\index.html"
```

---

## 🚀 Step-by-Step GitHub Upload Guide

Follow these exact steps to push this project to a new GitHub repository:

### Step 1: Open Terminal in the Project Directory
```powershell
cd C:\Users\maybe\.gemini\antigravity\scratch\promptpilot
```

### Step 2: Initialize Git & Commit Files
```powershell
git init
git add .
git commit -m "feat: initial commit of PromptPilot AI prompt generator website"
```

### Step 3: Create a New Repository on GitHub
1. Go to [GitHub.com/new](https://github.com/new).
2. Enter the repository name: `promptpilot` (or your preferred name).
3. Set the repository to **Public**.
4. **Do not** initialize with a README, .gitignore, or license (they are already included).
5. Click **"Create repository"**.

### Step 4: Link and Push to GitHub
```powershell
# Rename branch to main
git branch -M main

# Add your GitHub remote URL (replace YOUR_USERNAME with your GitHub handle):
git remote add origin https://github.com/YOUR_USERNAME/promptpilot.git

# Push your code:
git push -u origin main
```

---

## 🌐 Step-by-Step Netlify Deployment Guide

There are two easy methods to deploy PromptPilot to Netlify:

### Method A: Continuous Deployment via GitHub (Recommended)
1. Sign in to your [Netlify Dashboard](https://app.netlify.com).
2. Click **"Add new site"** ➔ **"Import an existing project"**.
3. Choose **GitHub** and authorize access if prompted.
4. Select your **`promptpilot`** repository.
5. In the build settings:
   - **Branch to deploy:** `main`
   - **Base directory:** *(Leave blank)*
   - **Build command:** *(Leave blank — static site requires no build step)*
   - **Publish directory:** `.` (or leave default, `netlify.toml` handles this automatically)
6. Click **"Deploy promptpilot"**.
7. Netlify will deploy your site in less than 30 seconds and provide you with a live URL (e.g. `https://promptpilot-xyz.netlify.app`)!

---

### Method B: Instant Netlify Drag-and-Drop (Zero Git required)
1. Sign in to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `promptpilot` project folder directly into the browser window.
3. Your website is live immediately!

---

## ⚙️ Configuration & Features Requiring Optional Setup

All core features of PromptPilot work **immediately out of the box** without any external setup or keys. Here are optional configurations you can enable:

### 1. Netlify Form Submissions & Email Notifications
- **How it works:** The contact form is configured with standard Netlify Forms attributes:
  ```html
  <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact">
    ...
  </form>
  ```
- **Where submissions go:** When deployed on Netlify, every submitted form message appears in your **Netlify Dashboard > Site Configuration > Forms**.
- **Optional Email Notifications:** In your Netlify dashboard, go to **Forms > Form notifications** to have messages forwarded directly to your personal or work email address.

### 2. Custom Domain Setup (Optional)
- In Netlify, go to **Domain management > Add custom domain** (e.g., `promptpilot.com` or `promptpilot.ai`).
- Add the CNAME or ALIAS records provided by Netlify to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
- Free automatic SSL certificates (Let's Encrypt) are provisioned automatically.

### 3. Open Graph Image Preview (Optional)
- Replace `og-preview.png` with a custom 1200x630 banner screenshot of your live website to display rich social previews when sharing on Twitter, LinkedIn, or Discord.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE). Free for personal, academic, and commercial use.
