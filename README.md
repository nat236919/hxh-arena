# HxH Arena

A Hunter x Hunter fan web app built with Nuxt 4. Features a Water Divination Nen type quiz that determines your Nen category through 20 scenario-based questions.

## Features

- **Water Divination Quiz** - 15 of 20 scenario questions selected randomly per run, with shuffled answer order
- **6 Nen Types** - Enhancer, Transmuter, Emitter, Conjurer, Manipulator, Specialist
- **Nen Aptitude Radar Chart** - Visual score breakdown across all 6 types on the result page
- **Nen Affinity Chart** - Shows which types are compatible and which are opposed based on the canon Nen wheel
- **Staged Result Reveal** - Type name, description, and detail column animate in sequence for dramatic impact
- **Character Profiles** - Click any character on the result page to view their abilities
- **Share Result Card** - Download or copy your result as a PNG image; result URL is shareable directly (`?type=transmuter`)
- **Dark / Light Theme** - Toggle between dark and light modes, persisted via localStorage
- **Custom 404 Page** - Thematic error page with Nen seal and return link
- **Mobile Layout** - Quiz page adapts to a compact horizontal strip on small screens
- **Nen Seal Favicon** - Custom SVG favicon using the Nen aura seal motif
- **Fully typed** - TypeScript throughout

## Tech Stack

- [Nuxt 4](https://nuxt.com) (SPA mode, `ssr: false`)
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

146 unit tests covering Nen type data integrity (including compatibility symmetry), question structure, URL sharing logic, and quiz state machine (shuffle, scoring, reset).

## Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```
app/
  composables/
    useNenQuiz.ts   # Quiz state: shuffled questions, scoring, reset
    useTheme.ts     # Dark/light theme toggle with localStorage persistence
  data/
    questions.ts    # 20 scenario questions with per-answer Nen type scores
    nenTypes.ts     # 6 Nen type definitions with traits, characters, colors, compatibility
  pages/
    index.vue       # Landing page
    quiz.vue        # Quiz page (responsive: horizontal strip on mobile)
    result.vue      # Result page with radar chart, affinity chart, character profiles, share card
  error.vue         # Custom 404 page
tests/
  questions.test.ts
  nenTypes.test.ts
  useNenQuiz.test.ts
public/
  favicon.svg       # Nen seal SVG favicon
  sitemap.xml
  characters/       # Character portrait images
```

## Credits

- Character and ability data: [Hunterpedia](https://hunterxhunter.fandom.com/wiki/Hunterpedia)
- Hunter x Hunter is the intellectual property of Yoshihiro Togashi / Shueisha
- Fan project, not affiliated with or endorsed by the rights holders

## Author

[Nuttaphat Arunoprayoch](https://github.com/nat236919)
