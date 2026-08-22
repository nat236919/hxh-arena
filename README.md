# HxH Arena

A Hunter x Hunter fan web app built with Nuxt 4. Take the Water Divination quiz to discover your Nen type, claim a Hunter Licence, then step into Heavens Arena to fight registered Hunters and iconic HxH characters.

## Features

### Water Divination

- **Nen Type Quiz** - 15 of 20 scenario questions selected randomly per run, with shuffled answer order
- **6 Nen Types** - Enhancer, Transmuter, Emitter, Conjurer, Manipulator, Specialist
- **Nen Aptitude Radar Chart** - Visual score breakdown across all 6 types on the result page
- **Nen Affinity Chart** - Shows which types are compatible and which are opposed based on the canon Nen wheel
- **Staged Result Reveal** - Type name, description, and detail column animate in sequence
- **Character Profiles** - Click any character on the result page to view their abilities
- **Share Result Card** - Download or copy your result as a PNG; result URL is shareable directly (`?type=transmuter`)

### Heavens Arena

- **Hunter Licence** - Register a named character after completing Water Divination; UUID persisted in sessionStorage
- **Attribute Allocation** - Distribute 20 points across Strength/Speed, Aura, Defense, and Intelligence (minimum 1 each)
- **1v1 Combat** - 2d6 dice rolls modified by Nen type bonus and stats determine the winner
- **Nen Matchups** - Compatible types on the Nen wheel get a 5% power boost (Nen Affinity); opposed types get a 5% penalty (Nen Clash)
- **Arena Rules Modal** - "?" button on the fight page explains the power formula, Nen bonuses, matchup effects, victory conditions, and leaderboard requirements
- **Opponent Pools** - Fight all challengers (registered Hunters + NPCs), NPCs only, or registered Hunters only
- **NPC Roster** - 10 HxH characters (Gon, Killua, Hisoka, Chrollo, and more) with canon-approximate stats and portraits
- **W/L/D Leaderboard** - Top 10 ranking by win rate; requires 10 fights to appear, updates after every fight
- **Latest Fight Card** - Homepage shows the most recent fight with Nen badges, dice rolls, and outcome
- **Name Validation** - Hunter names are checked for length, allowed characters, and l33t-substituted profanity

### General

- **Dark / Light Theme** - Toggle persisted via localStorage
- **Mobile Layout** - Responsive across all pages
- **Custom 404 Page** - Thematic error page with Nen seal and return link
- **Nen Seal Favicon** - Custom SVG favicon
- **Fully typed** - TypeScript throughout

## Tech Stack

- [Nuxt 4](https://nuxt.com) (SPA mode, `ssr: false`)
- [Vue 3](https://vuejs.org) with Composition API
- [Supabase](https://supabase.com) - Postgres database for characters, fight log, and leaderboard
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

If `nvm` is not found in your terminal, load it first:

```bash
source ~/.nvm/nvm.sh && nvm use 22
```

To make nvm available automatically in every new terminal, add this to your `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `NUXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

### Supabase Setup

Run the following SQL in your Supabase SQL editor to create the required tables and grant access:

```sql
-- Characters table
CREATE TABLE public.characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nen_type TEXT NOT NULL,
  name TEXT,
  strength_speed INTEGER DEFAULT 0,
  aura INTEGER DEFAULT 0,
  defense INTEGER DEFAULT 0,
  intelligence INTEGER DEFAULT 0,
  stats_locked BOOLEAN DEFAULT false,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  secret_token UUID DEFAULT gen_random_uuid()
);

-- Fight log table
CREATE TABLE public.fight_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  challenger_id UUID REFERENCES public.characters(id),
  opponent_id UUID,
  opponent_is_npc BOOLEAN DEFAULT false,
  challenger_roll INTEGER,
  opponent_roll INTEGER,
  winner TEXT
);

-- Grant anon access (required for SPA with no auth)
GRANT SELECT, INSERT, UPDATE ON public.characters TO anon;
GRANT SELECT, INSERT ON public.fight_log TO anon;

-- RLS policies
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fight_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon select" ON public.characters FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert" ON public.characters FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update own" ON public.characters FOR UPDATE TO anon
  USING (true) WITH CHECK (secret_token IS NOT NULL);

CREATE POLICY "anon read fight_log" ON public.fight_log FOR SELECT TO anon USING (true);
CREATE POLICY "anon insert fight_log" ON public.fight_log FOR INSERT TO anon WITH CHECK (true);
```

If you are adding `secret_token` to an existing table rather than creating fresh:

```sql
ALTER TABLE public.characters ADD COLUMN secret_token UUID DEFAULT gen_random_uuid();

-- Backfill any rows that have NULL
UPDATE public.characters SET secret_token = gen_random_uuid() WHERE secret_token IS NULL;

-- Tighten the existing UPDATE policy
ALTER POLICY "Allow anon update own" ON public.characters
  USING (true) WITH CHECK (secret_token IS NOT NULL);
```

## Database Schema

### `public.characters`

| Column | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `UUID` | `gen_random_uuid()` | Primary key; used as the Hunter Licence number |
| `created_at` | `TIMESTAMPTZ` | `now()` | Registration timestamp |
| `nen_type` | `TEXT` | - | One of the 6 Nen type ids |
| `name` | `TEXT` | `NULL` | Hunter name chosen at registration |
| `strength_speed` | `INTEGER` | `0` | Stat allocated during setup |
| `aura` | `INTEGER` | `0` | Stat allocated during setup |
| `defense` | `INTEGER` | `0` | Stat allocated during setup |
| `intelligence` | `INTEGER` | `0` | Stat allocated during setup |
| `stats_locked` | `BOOLEAN` | `false` | Set to `true` once setup is confirmed; prevents re-allocation |
| `wins` | `INTEGER` | `0` | Fight record |
| `losses` | `INTEGER` | `0` | Fight record |
| `draws` | `INTEGER` | `0` | Fight record |
| `secret_token` | `UUID` | `gen_random_uuid()` | Ownership token; required to match on every UPDATE |

### `public.fight_log`

| Column | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `UUID` | `gen_random_uuid()` | Primary key |
| `created_at` | `TIMESTAMPTZ` | `now()` | Fight timestamp |
| `challenger_id` | `UUID` | - | FK to `characters.id` |
| `opponent_id` | `UUID` | `NULL` | FK to `characters.id`, or NPC id string; `NULL` if NPC id not stored |
| `opponent_is_npc` | `BOOLEAN` | `false` | Distinguishes NPC fights from registered Hunter fights |
| `challenger_roll` | `INTEGER` | - | 2d6 total for the challenger |
| `opponent_roll` | `INTEGER` | - | 2d6 total for the opponent |
| `winner` | `TEXT` | - | `'challenger'`, `'opponent'`, or `'draw'` |

### Useful queries

```sql
-- Full leaderboard (win rate, min 10 fights)
SELECT name, nen_type, wins, losses, draws,
  ROUND(wins::numeric / NULLIF(wins + losses + draws, 0) * 100, 1) AS win_rate_pct
FROM public.characters
WHERE stats_locked = true
  AND (wins + losses + draws) >= 10
ORDER BY win_rate_pct DESC, wins DESC;

-- Latest fight with names resolved
SELECT
  c.name AS challenger,
  fl.challenger_roll,
  fl.opponent_roll,
  fl.winner,
  fl.created_at
FROM public.fight_log fl
JOIN public.characters c ON c.id = fl.challenger_id
ORDER BY fl.created_at DESC
LIMIT 10;

-- Backfill secret_token for rows created before the column was added
UPDATE public.characters
SET secret_token = gen_random_uuid()
WHERE secret_token IS NULL;
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

197 unit tests covering:

- **Nen type data** - all 6 types present, required fields, compatibility symmetry, opposition symmetry
- **Question data** - structure, answer scores, uniqueness
- **URL sharing** - `?type=` param parsing and validation
- **Quiz state machine** - shuffle, scoring accumulation, completion, reset
- **NPC roster** - required fields, unique ids, valid Nen types, positive integer stats
- **Profanity filter** - clean names pass, blocked words rejected, l33t substitutions detected, length and character rules enforced
- **Arena fight logic** - `roll2d6` range, `calcPower` Nen bonuses, `splitRoll` dice validity for all totals 2-12, `getMatchupMultiplier` affinity/clash/neutral for all 36 type pairings, `calcPower` with matchup modifier

## Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```text
app/
  composables/
    useArena.ts     # Arena: register, load character, fight, leaderboard, latest fight
    useNenQuiz.ts   # Quiz state: shuffled questions, scoring, reset
    useTheme.ts     # Dark/light theme toggle with localStorage persistence
  components/
    ArenaBackground.vue    # Aura orbs + scanline overlay
    ArenaFightResult.vue   # Fight outcome: verdict, portraits, dice, record
    ArenaHeader.vue        # Back link + page label header for arena pages
    ArenaPoolCard.vue      # Selectable opponent pool card with icon slot
    ArenaRulesModal.vue    # Fight rules modal: power formula, Nen bonuses, matchups
    ArenaStatChips.vue     # Stat bars + W/L/D record display
    SectionArena.vue       # Homepage arena section: steps, leaderboard, latest fight
  data/
    nenTypes.ts     # 6 Nen type definitions with traits, characters, colors, compatibility
    npcs.ts         # 10 HxH NPC fighters with stats and portrait paths
    questions.ts    # 20 scenario questions with per-answer Nen type scores
  lib/
    profanity.ts    # Hunter name validation with l33t normalization
    supabase.ts     # Supabase client singleton and Character type
  pages/
    index.vue               # Landing page
    quiz.vue                # Quiz page
    result.vue              # Result page: radar chart, affinity chart, Hunter Licence registration
    arena/
      index.vue             # Arena entry: Hunter Licence lookup
      setup.vue             # Attribute allocation
      fight.vue             # Opponent selection, fight animation, result
  error.vue         # Custom 404 page
tests/
  arenaFight.test.ts   # roll2d6, calcPower, splitRoll, NEN_BONUS, getMatchupMultiplier
  nenTypeUrl.test.ts
  nenTypes.test.ts
  npcs.test.ts
  profanity.test.ts
  questions.test.ts
  useNenQuiz.test.ts
public/
  favicon.svg       # Nen seal SVG favicon
  sitemap.xml
  characters/       # Character portrait images (.webp)
```

## Credits

- Character and ability data: [Hunterpedia](https://hunterxhunter.fandom.com/wiki/Hunterpedia)
- Hunter x Hunter is the intellectual property of Yoshihiro Togashi / Shueisha
- Fan project, not affiliated with or endorsed by the rights holders

## Author

[Nuttaphat Arunoprayoch](https://github.com/nat236919)
