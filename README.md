# HxH Arena

A Hunter x Hunter web app built with Nuxt 4. Currently features a Water Divination Nen type quiz that determines your Nen category through 20 scenario-based questions.

## Features

- **Water Divination Quiz** - 20 questions with animated SVG bowl that reacts to your answers in real time
- **6 Nen Types** - Enhancer, Transmuter, Emitter, Conjurer, Manipulator, Specialist
- **Nen Aptitude Radar Chart** - Visual breakdown of your scores across all 6 types on the result page
- **Character Profiles** - Click any character on the result page to view their abilities
- **Share Result Card** - Download or copy your result as a PNG image
- **Sound Effects** - Water ripple on answer selection, aura reveal on result
- **Fully typed** - TypeScript throughout

## Tech Stack

- [Nuxt 4](https://nuxt.com) (SPA mode)
- [Vue 3](https://vuejs.org) with Composition API
- [Tailwind CSS](https://tailwindcss.com) via `@nuxtjs/tailwindcss`
- [Chart.js](https://www.chartjs.org) + [vue-chartjs](https://vue-chartjs.org) for the radar chart
- [html2canvas](https://html2canvas.hertzen.com) for share card generation
- [Vitest](https://vitest.dev) for unit tests

## Prerequisites

- Node.js 22+
- pnpm 11+

If you use nvm:

```bash
nvm install 22
nvm use 22
```

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
pnpm test         # run once
pnpm test:watch   # watch mode
```

67 unit tests covering Nen type data, question integrity, and quiz state machine.

## Build

```bash
pnpm build
pnpm preview
```

## Credits

- Character and ability data: [Hunterpedia](https://hunterxhunter.fandom.com/wiki/Hunterpedia)
- Sound effects: [Mixkit](https://mixkit.co)
- Hunter x Hunter is the intellectual property of Yoshihiro Togashi / Shueisha

## Author

[nat236919](https://github.com/nat236919)
