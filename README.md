<div align="center">

<img src="https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg" width="180" alt="XPROVerce MD" />

# XPROVerce MD

### Private-base WhatsApp Multi-Device Bot Launcher

[Website](http://xpro-verce.site/) • [GitHub](https://github.com/xproverce/XPROVerce-MD)

</div>

XPROVerce MD is a WhatsApp Multi-Device bot built with Baileys. This repository contains the public launcher. The bot source and private runtime files are downloaded from the private `xproverce/base` repository only when the launcher starts.

## How It Works

1. The launcher reads the session configuration.
2. It downloads the selected branch of the private base repository through the GitHub API.
3. It prepares the session and runtime files in a temporary working directory.
4. It installs the private base dependencies.
5. It starts the private bot process.

The private base is not committed to this public repository. Keep the GitHub access token and session ID in deployment secrets.

## Features

- WhatsApp Multi-Device support through Baileys
- Plugin and command handling
- Group moderation and automation
- Buttons, lists, polls, reactions, and newsletter tools
- Media downloading, stickers, voice notes, and image processing
- Auto-reply, auto-sticker, and auto-voice features
- Status viewing and automated reactions
- Session restore and cloud-backed storage integrations
- Express services and deployment-friendly startup

## Technology

- Node.js 18 or newer
- Baileys Multi-Device
- Express.js
- MongoDB and PostgreSQL integrations
- Axios, Sharp, Puppeteer, FFmpeg, and Node-Cache

## Local Setup

```bash
git clone https://github.com/xproverce/XPROVerce-MD.git
cd XPROVerce-MD
npm install
```

Create `public/.env`, or export the variables in your shell:

```env
SESSION_ID=your_session_id
```

Start the launcher from the repository root:

```bash
npm start
```

The launcher uses `GITHUB_TOKEN` as a fallback when `PRIVATE_BASE_TOKEN` is not set. `PRIVATE_BASE_DIR` can be used to override the temporary private-base directory.

## Deployment

The service is a long-running worker. Set the following environment variables in your hosting platform:

| Variable | Required | Description |
| --- | --- | --- |
| `SESSION_ID` | Yes | WhatsApp session configuration used by the launcher |

### Koyeb, Render, or Railway

1. Create a worker/background service from this repository.
2. Use Node.js 18 or newer.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add the required environment variables as platform secrets.

### Heroku

Use a worker dyno rather than a web dyno:

```bash
heroku ps:scale worker=1
```

Set the same environment variables as Heroku Config Vars.

## Private Base Security

Never commit any of the following:

- `PRIVATE_BASE_TOKEN`
- `SESSION_ID`
- private `.env` files
- decrypted private-base source files
- encryption passphrases

The private base may also be stored as an encrypted archive for backup. Keep its passphrase outside GitHub. Encryption does not remove the need for a secure deployment secret because the bot must access decrypted files while running.

## GitHub Actions

For CI, keep secrets in repository or environment secrets and never place them directly in workflow files. A minimal validation workflow can install dependencies and check the launcher:

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
      - run: npm install
      - run: node --check start.js
```

## Disclaimer

This project is provided for educational and lawful automation purposes. Use WhatsApp integrations responsibly and follow WhatsApp terms, applicable laws, and platform policies. The maintainers are not responsible for misuse or account restrictions.

## Credits

- XPROVerce Team
- Baileys and its contributors
- Open-source contributors
