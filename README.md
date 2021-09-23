# aberoth-hotkeys
Powerful open-source hotkeys for Aberoth

### Requirements:
  - [AutoHotkey 1.1](https://www.autohotkey.com/)
  - [Git](https://git-scm.com/)
  - [NodeJS 12+](https://nodejs.org/en/)
  - [Inno-Setup 6 *(optional)*](https://jrsoftware.org/isinfo.php)
  - Windows 7+

Install w/ chocolatey: `choco install git autohotkey nodejs innosetup`

### Building:
  1. Create a .env file, or copy the default .env.example as ".env"
  2. Install yarn globally *(optional)* - `npm install -g yarn`
  3. Install dependencies - `yarn install / npm install`
  4. Build & run `yarn start / npm start`

### Road-map:
  - Load custom scripts
  - Plugin & theme system

### Scripts
```bash
example:  yarn build / npm run build

start           # Build & run
start:dev       # Build & run w/ dev tools & hot reloading
start:test      # Hot-reload tests
build           # Build
build:dev       # Build w/ dev tools
clean           # Clean
kill            # Kill all Auto-Hotkey scripts
lint            # Run all linters
lint:eslint     # Lint js
lint:stylelint  # Lint css
test            # Run all tests
ci              # Continuous integration script
```
