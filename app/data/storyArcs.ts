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
    summary: 'Gon leaves his island home to take the Hunter Exam, chasing the idea of a father he\'s never met. The exam is brutal and full of people with their own desperate reasons to pass. This is where the four main characters meet, and where you first realize this show is not going to go easy on anyone.',
    color: '#E8A000',
  },
  {
    id: 'zoldyck-family',
    number: 2,
    name: 'Zoldyck Family',
    japaneseName: 'ゾルディック家編',
    chapters: '39–55',
    episodes: '22–26',
    summary: 'Killua gets dragged back home right at the end of the exam, and Gon just decides to go get him back. The Zoldyck estate is genuinely one of the most unsettling settings in the whole series, and the family dynamics there are... a lot.',
    color: '#6B3FD4',
  },
  {
    id: 'heavens-arena',
    number: 3,
    name: 'Heavens Arena',
    japaneseName: '天空闘技場編',
    chapters: '56–96',
    episodes: '27–36',
    summary: 'Gon and Killua need money and experience, so they fight in a giant skyscraper tournament. The higher the floor, the scarier the fighters. This is where Nen gets explained for real, and where Hisoka becomes genuinely terrifying rather than just creepy. Bungee Gum hits different the first time.',
    color: '#1E7A40',
  },
  {
    id: 'yorknew-city',
    number: 4,
    name: 'Yorknew City',
    japaneseName: 'ヨークシン編',
    chapters: '97–183',
    episodes: '37–58',
    summary: 'Kurapika finally gets his shot at the Phantom Troupe, and the whole arc becomes this tense chess match between a grieving survivor and a group of extremely powerful criminals. Meanwhile Gon and Killua are in over their heads at a criminal auction and having a great time anyway. One of the best arcs in the show.',
    color: '#CC1A1A',
  },
  {
    id: 'greed-island',
    number: 5,
    name: 'Greed Island',
    japaneseName: 'G.I.編',
    chapters: '184–261',
    episodes: '59–70',
    summary: 'Gon and Killua play a literal video game inside the Nen world, because Ging apparently designed it. It sounds silly but there are assassins and cursed card trades and Bisky training them into the ground. The tone is lighter but the stakes sneak up on you by the end.',
    color: '#E05010',
  },
  {
    id: 'chimera-ant',
    number: 6,
    name: 'Chimera Ant',
    japaneseName: 'キメラアント編',
    chapters: '186–318',
    episodes: '76–136',
    summary: 'The big one. Chimera Ants are a species that can inherit human traits, and their king Meruem might be the most powerful thing in the entire world. What starts as a monster-of-the-week premise turns into something really thoughtful about humanity, power, and what it means to evolve. Gon\'s breakdown hits like a freight train.',
    color: '#8030A8',
  },
  {
    id: '13th-hunter-chairman',
    number: 7,
    name: '13th Hunter Chairman Election',
    japaneseName: '会長選挙編',
    chapters: '319–339',
    episodes: '137–148',
    summary: 'The aftermath of the Chimera Ant arc. Gon is barely alive and Killua has to make a decision that costs him everything to save him. The chairman election subplot is actually pretty engaging on its own, but Killua\'s story is the emotional gut punch the whole arc builds toward.',
    color: '#B8244B',
  },
  {
    id: 'succession-contest',
    number: 8,
    name: 'Succession Contest',
    japaneseName: '王位継承戦編',
    chapters: '340–400+',
    episodes: 'N/A (manga only)',
    summary: 'A giant ship, fourteen royal heirs trying to murder each other, and Kurapika smack in the middle of it trying to save an infant prince. The manga-only arc goes full political thriller with so many moving pieces it takes spreadsheets to track. Still ongoing, and somehow still escalating.',
    color: '#006F44',
  },
]
