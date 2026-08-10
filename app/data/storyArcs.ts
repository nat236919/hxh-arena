export interface StoryArc {
  id: string
  number: number
  name: string
  japaneseName: string
  chapters: string
  episodes: string
  summary: string
  color: string
}

export const storyArcs: StoryArc[] = [
  {
    id: 'hunter-exam',
    number: 1,
    name: 'Hunter Exam',
    japaneseName: 'ハンター試験編',
    chapters: '1–38',
    episodes: '1–21',
    summary: 'Gon Freecss leaves Whale Island to take the Hunter Exam, determined to find his absent father Ging. He befriends Kurapika, Leorio, and Killua along the way — each with their own reason to become a Hunter.',
    color: '#E8A000',
  },
  {
    id: 'zoldyck-family',
    number: 2,
    name: 'Zoldyck Family',
    japaneseName: 'ゾルディック家編',
    chapters: '39–55',
    episodes: '22–26',
    summary: 'After Killua is disqualified and dragged home, Gon, Kurapika, and Leorio travel to Kukuroo Mountain to rescue him from his family — the world\'s most feared assassin clan.',
    color: '#6B3FD4',
  },
  {
    id: 'heavens-arena',
    number: 3,
    name: 'Heavens Arena',
    japaneseName: '天空闘技場編',
    chapters: '56–96',
    episodes: '27–36',
    summary: 'Gon and Killua train at the towering Heavens Arena, where they discover Nen — the life energy that underlies all great fighters. Their first real battles and the introduction of Hisoka\'s terrifying power.',
    color: '#1E7A40',
  },
  {
    id: 'yorknew-city',
    number: 4,
    name: 'Yorknew City',
    japaneseName: 'ヨークシン編',
    chapters: '97–183',
    episodes: '37–58',
    summary: 'Kurapika hunts the Phantom Troupe to recover the stolen eyes of his clan. Gon and Killua navigate the world\'s largest auction as the Troupe leaves a trail of destruction through Yorknew City.',
    color: '#CC1A1A',
  },
  {
    id: 'greed-island',
    number: 5,
    name: 'Greed Island',
    japaneseName: 'G.I.編',
    chapters: '184–261',
    episodes: '59–70',
    summary: 'Gon and Killua enter a Nen-based game created by Ging, competing against other players to collect rare cards. Their Nen abilities grow rapidly under Biscuit Krueger\'s harsh training.',
    color: '#E05010',
  },
  {
    id: 'chimera-ant',
    number: 6,
    name: 'Chimera Ant',
    japaneseName: 'キメラアント編',
    chapters: '186–318',
    episodes: '76–136',
    summary: 'The longest and most acclaimed arc. A species of Nen-capable Chimera Ants threatens humanity. Gon, Killua, and the Hunter Association face the terrifying Meruem — perhaps the most powerful being ever born.',
    color: '#8030A8',
  },
  {
    id: '13th-hunter-chairman',
    number: 7,
    name: '13th Hunter Chairman Election',
    japaneseName: '会長選挙編',
    chapters: '319–339',
    episodes: '137–148',
    summary: 'Following the events of the Chimera Ant arc, the Hunter Association must elect a new chairman. Gon lies near death; Killua makes the most painful decision of his life to save his best friend.',
    color: '#B8244B',
  },
  {
    id: 'succession-contest',
    number: 8,
    name: 'Succession Contest',
    japaneseName: '王位継承戦編',
    chapters: '340–400+',
    episodes: 'N/A (manga only)',
    summary: 'Aboard the Black Whale ship heading to the Dark Continent, the fourteen princes of the Kakin Empire wage a secret death game. The most politically complex arc in the series, currently ongoing.',
    color: '#006F44',
  },
]
