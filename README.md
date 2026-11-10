# Metalnome

A metronome for drummers of the punk, metal, and knuckle-dragging variety. In addition to a plain click, this metronome plays full drum grooves (kick, snare, hi-hat, crash) at your tempo, with a broken heart pulsing as a visual time keeper.

Built with vanilla JavaScript, [Tone.js](https://tonejs.github.io/), Vite, and Sass.

## Quick Start

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/maritzbuchholz/Metronome.git
   cd Metronome
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the local URL Vite prints (usually `http://localhost:5173`), pick a groove, enter a BPM, and press **Play**.

## Common Scripts

- `npm run dev` starts the Vite dev server.
- `npm run build` builds the site into `dist`.

## Grooves

Straight Up, BLAST BEAT!, Motorhead, Slipknot, BREAKDOWN, Tresillo, Quad Fills, and Face Ripper. Each groove is its own file in `grooves/`. Some grooves lock the Division dropdown to the value they need.

## Styling

Styles live in `main.scss` and compile to `main.css`, which is the file the page loads. Sass isn't an npm dependency, so recompile after editing:

```bash
npx sass main.scss main.css
```

## Deployment

- **GitHub Pages:** the workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo settings, set Pages to deploy from **GitHub Actions**.
- **Netlify:** `netlify.toml` already runs `npm run build` and publishes `dist`.

## Miscellaneous Items

- Run `npm install` before `npm run dev` or `npm run build`.
- Browsers block audio until the first tap or click, so the first press of **Play** unlocks sound.
- On iOS, a silent looping audio file keeps sound playing with the silent switch on. To regenerate it, run `node generate_silence.js`.
