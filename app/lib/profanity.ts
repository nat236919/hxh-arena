const BLOCKED = [
  'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'cock', 'pussy',
  'nigger', 'nigga', 'faggot', 'fag', 'retard', 'whore', 'slut',
  'bastard', 'piss', 'damn', 'crap', 'twat', 'wanker', 'bollocks',
  'prick', 'arse', 'nazi', 'hitler',
]

const PATTERN = new RegExp(
  BLOCKED.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i'
)

export function containsProfanity(text: string): boolean {
  // strip common l33t substitutions before checking
  const normalized = text
    .toLowerCase()
    .replace(/4/g, 'a')
    .replace(/3/g, 'e')
    .replace(/1/g, 'i')
    .replace(/0/g, 'o')
    .replace(/5/g, 's')
    .replace(/\$/g, 's')
    .replace(/@/g, 'a')
    .replace(/[^a-z]/g, '')
  return PATTERN.test(normalized)
}

export function validateHunterName(name: string): string | null {
  const trimmed = name.trim()
  if (trimmed.length < 2) return 'Name must be at least 2 characters.'
  if (trimmed.length > 24) return 'Name must be 24 characters or fewer.'
  if (!/^[\w\s\-'.]+$/u.test(trimmed)) return "Only letters, numbers, spaces, hyphens, apostrophes, and periods allowed."
  if (containsProfanity(trimmed)) return 'That name is not allowed.'
  return null
}
