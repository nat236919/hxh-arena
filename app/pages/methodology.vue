<template>
  <div class="page-root">
    <div class="aura-field" aria-hidden="true">
      <div class="aura-orb aura-orb--gold" />
      <div class="aura-orb aura-orb--teal" />
      <div class="aura-orb aura-orb--purple" />
    </div>
    <div class="scanline-overlay" aria-hidden="true" />

    <header class="method-header">
      <NuxtLink to="/" class="back-link">
        <span class="back-arrow">&#8592;</span> Back to HxH Arena
      </NuxtLink>
      <div class="header-seal" aria-hidden="true">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(184,36,75,0.25)" stroke-width="0.8" />
          <polygon points="24,4 41,13.5 41,34.5 24,44 7,34.5 7,13.5" fill="none" stroke="rgba(184,36,75,0.7)"
            stroke-width="1.2" stroke-linejoin="round" />
          <circle cx="24" cy="24" r="9" fill="none" stroke="rgba(232,66,10,0.6)" stroke-width="1" />
          <circle cx="24" cy="24" r="2.5" fill="rgba(232,66,10,0.8)" />
        </svg>
      </div>
    </header>

    <main class="method-main">
      <div class="method-hero">
        <p class="method-tag">RESEARCH BASIS</p>
        <h1 class="method-title">What's the quiz based on?</h1>
        <p class="method-lead">
          This is a fan quiz. It's not a clinical assessment and it's not validated research.
          That said, the questions were designed with real personality psychology in mind,
          drawing on frameworks that have genuine academic backing. Here's an honest breakdown
          of what holds up and where the mapping gets loose.
        </p>
        <div class="disclaimer-box">
          <span class="disclaimer-icon">!</span>
          <p>
            The score weightings (e.g. "this answer gives Enhancer +3") are still subjective calls
            made by the quiz designer, not derived from empirical data. Citing these papers as
            validation for your result would be a stretch. This page is about intellectual honesty,
            not academic credibility.
          </p>
        </div>
      </div>

      <section class="framework-section">
        <h2 class="section-title">Frameworks used</h2>
        <div class="framework-grid">
          <div v-for="fw in frameworks" :key="fw.name" class="framework-card">
            <div class="fw-header">
              <span class="fw-tag">{{ fw.field }}</span>
              <h3 class="fw-name">{{ fw.name }}</h3>
            </div>
            <p class="fw-authors">{{ fw.authors }}</p>
            <p class="fw-desc">{{ fw.description }}</p>
          </div>
        </div>
      </section>

      <section class="dimensions-section">
        <h2 class="section-title">Question-by-question breakdown</h2>
        <p class="section-intro">
          Each quiz dimension mapped to the framework it draws from, with an honest note
          on how clean the fit actually is.
        </p>
        <div class="dim-list">
          <div v-for="dim in dimensions" :key="dim.label" class="dim-card">
            <div class="dim-top">
              <span class="dim-label">{{ dim.label }}</span>
              <span class="dim-strength" :class="`dim-strength--${dim.strength}`">
                {{ strengthLabel(dim.strength) }}
              </span>
            </div>
            <p class="dim-questions">Questions {{ dim.questions }}</p>
            <p class="dim-framework">{{ dim.framework }}</p>
            <p class="dim-note">{{ dim.note }}</p>
          </div>
        </div>
      </section>

      <section class="refs-section">
        <h2 class="section-title">References</h2>
        <ul class="ref-list">
          <li v-for="ref in references" :key="ref.citation" class="ref-item">
            <span class="ref-citation">{{ ref.citation }}</span>
            <a v-if="ref.url" :href="ref.url" target="_blank" rel="noopener" class="ref-link">
              View source
            </a>
          </li>
        </ul>
      </section>
    </main>

    <footer class="method-footer">
      <span>Hunter × Hunter © Yoshihiro Togashi / Shueisha</span>
      <span class="footer-sep">·</span>
      <span>Fan project, not affiliated with or endorsed by the rights holders.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Methodology - HxH Arena' })

const frameworks = [
  {
    name: 'Big Five Personality Traits',
    field: 'Personality Psychology',
    authors: 'McCrae & Costa (1987); John & Srivastava (1999)',
    description: 'Five broad dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. One of the most replicated frameworks in personality research.',
  },
  {
    name: 'Self-Determination Theory (SDT)',
    field: 'Motivation',
    authors: 'Deci & Ryan (1985, 2000, 2020)',
    description: 'Describes human motivation along a continuum from external regulation to intrinsic motivation. Identifies three core psychological needs: autonomy, competence, and relatedness.',
  },
  {
    name: 'Process Model of Emotion Regulation',
    field: 'Emotion Psychology',
    authors: 'Gross & John (1998, 2003)',
    description: 'Distinguishes cognitive reappraisal (changing how you think about a situation) from expressive suppression (hiding the emotional response). Operationalized in the Emotion Regulation Questionnaire (ERQ).',
  },
  {
    name: 'Approach-Avoidance Motivation',
    field: 'Motivation',
    authors: 'Elliot (1999, 2006)',
    description: 'A hierarchical model separating motivation toward positive outcomes (approach) from motivation away from negative ones (avoidance). Predicts goal pursuit, persistence, and emotional response.',
  },
  {
    name: 'Barratt Impulsiveness Scale (BIS-11)',
    field: 'Personality / Clinical',
    authors: 'Patton, Stanford & Barratt (1995)',
    description: 'Measures three subtypes of impulsivity: attentional (difficulty focusing), motor (acting without thinking), and non-planning (living in the present without regard for consequences).',
  },
  {
    name: 'Attachment Theory',
    field: 'Developmental Psychology',
    authors: 'Bowlby (1969-1982); Ainsworth et al. (1978)',
    description: 'Describes how early emotional bonds shape adult relationship styles. Secure, anxious, and avoidant attachment styles predict how people approach trust, loyalty, and collaboration.',
  },
  {
    name: "Need for Closure",
    field: 'Cognitive Psychology',
    authors: 'Kruglanski (1989)',
    description: 'Measures desire for definite answers over ambiguity. High scorers prefer closure and structure; low scorers are comfortable with open-ended outcomes and uncertainty.',
  },
  {
    name: "McClelland's Power Motivation",
    field: 'Motivation',
    authors: 'McClelland (1975)',
    description: 'Identifies power, affiliation, and achievement as three core social motives. Power motivation specifically distinguishes between controlling others and using power to protect or help.',
  },
]

const dimensions = [
  {
    label: 'Impulsivity vs. deliberation',
    questions: '1, 7, 8',
    framework: 'BIS-11 (Patton et al.); Approach-Avoidance (Elliot)',
    note: 'The charge-in vs. observe-first split maps directly to BIS-11 motor impulsivity. Elliot\'s approach framework covers the action-oriented vs. avoidant planning split.',
    strength: 'strong',
  },
  {
    label: 'Emotional expression and regulation',
    questions: '12, 17',
    framework: 'Gross\'s Process Model; Big Five Neuroticism',
    note: 'Transparent/controlled maps cleanly to reappraisal vs. suppression (ERQ). Dramatic/shifting is high Neuroticism. Unreadable maps to expressive suppression.',
    strength: 'strong',
  },
  {
    label: 'Core motivation',
    questions: '4, 10',
    framework: 'Self-Determination Theory (Deci & Ryan); McClelland\'s Power Motivation',
    note: 'Autonomy and mastery options are directly supported by SDT\'s basic psychological needs. Control maps to McClelland. Single-goal focus and revenge-driven motivation are less well-supported by either framework.',
    strength: 'moderate',
  },
  {
    label: 'Rule-following vs. flexibility',
    questions: '3',
    framework: 'Big Five Conscientiousness; Big Five Openness',
    note: 'Rule-embracing vs. gut-driven is a strong match for the Conscientiousness dimension. Creative rule-bending maps to high Openness combined with lower Conscientiousness. "Imposing rules on others" drifts toward dominance and Machiavellianism, which Big Five doesn\'t cleanly cover.',
    strength: 'moderate',
  },
  {
    label: 'Alliance and trust style',
    questions: '14',
    framework: 'Attachment Theory (Bowlby); Big Five Agreeableness',
    note: 'Loyalty-driven vs. avoidant/solo maps well to secure vs. avoidant attachment. Transactional alliances overlap with Machiavellianism research. Situational joining is loosely anxious attachment. Reasonable fit overall.',
    strength: 'moderate',
  },
  {
    label: 'Response to friend in danger',
    questions: '2',
    framework: 'Big Five Agreeableness and Neuroticism; Gross\'s Emotion Regulation',
    note: 'Protective instinct is high Agreeableness. Emotional regulation under stress is low Neuroticism. Improvisation and preparation-reliance are not well-separated by any single framework. Partial fit.',
    strength: 'partial',
  },
  {
    label: 'Goal completion and what comes after',
    questions: '10',
    framework: 'Approach-Avoidance (Elliot); Need for Closure (Kruglanski); SDT',
    note: 'Closure-seeking vs. immediately-seeking-the-next maps to Need for Closure. Restlessness is low Need for Closure plus high sensation-seeking (Zuckerman). Indifference maps loosely to SDT\'s amotivation.',
    strength: 'moderate',
  },
  {
    label: 'Handling betrayal',
    questions: '11',
    framework: 'Gross\'s Emotion Regulation; Forgiveness research (McCullough, Worthington)',
    note: 'Direct confrontation is low suppression, high expressivity. Cold detachment is high suppression. Patient revenge has some backing in unforgiveness research but this is a niche area. Documentation is conscientiousness-driven. Mixed fit.',
    strength: 'partial',
  },
  {
    label: 'Learning and preparation style',
    questions: '5, 16',
    framework: 'Kolb\'s Experiential Learning (1984); Big Five Conscientiousness',
    note: 'Deep study before acting maps to Kolb\'s Assimilating style. Apply-and-refine maps to Accommodating. Repetition-until-mastery is high Conscientiousness. Rule-breaking experimentation is high Openness. Note: Kolb\'s Learning Style Inventory has faced validity critiques (Coffield et al., 2004). Weakest overall mapping.',
    strength: 'weak',
  },
  {
    label: 'What power means to you',
    questions: '15',
    framework: 'SDT Goal Contents Theory; McClelland\'s Power Motivation',
    note: 'Mastery and freedom map well to SDT intrinsic goals. Control maps to McClelland\'s power motive. Protection as power is closest to affiliation motive combined with Agreeableness. Requires two frameworks, but both are solid.',
    strength: 'moderate',
  },
  {
    label: 'Water Divination and ability preference',
    questions: '6, 9',
    framework: 'None (Nen-specific)',
    note: 'These questions are pure HxH lore. They are not mapped to psychology research and are not intended to be. They exist to ground the quiz in the source material.',
    strength: 'none',
  },
]

const strengthLabel = (s: string) => {
  if (s === 'strong') return 'Strong fit'
  if (s === 'moderate') return 'Moderate fit'
  if (s === 'partial') return 'Partial fit'
  if (s === 'weak') return 'Weak fit'
  return 'Lore only'
}

const references = [
  {
    citation: 'Deci, E. L., & Ryan, R. M. (1985). Intrinsic motivation and self-determination in human behavior. Plenum.',
    url: 'https://selfdeterminationtheory.org/theory/',
  },
  {
    citation: 'Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68-78.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11392867/',
  },
  {
    citation: 'Gross, J. J., & John, O. P. (2003). Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being. Journal of Personality and Social Psychology, 85(2), 348-362.',
    url: 'https://emotrab.ufba.br/wp-content/uploads/2019/07/Gross-James-Individual-Differences-in-Two-Emotion-Regulation-Processes....pdf',
  },
  {
    citation: 'Patton, J. H., Stanford, M. S., & Barratt, E. S. (1995). Factor structure of the Barratt Impulsiveness Scale. Journal of Clinical Psychology, 51(6), 768-774.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3805371/',
  },
  {
    citation: 'Elliot, A. J. (1999). Approach and avoidance motivation and achievement goals. Educational Psychologist, 34(3), 169-189.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12003479/',
  },
  {
    citation: 'Elliot, A. J. (2006). The hierarchical model of approach-avoidance motivation. Motivation and Emotion, 30(2), 111-116.',
    url: 'https://link.springer.com/article/10.1007/s11031-006-9028-7',
  },
  {
    citation: 'McCrae, R. R., & Costa, P. T. (1987). Validation of the five-factor model of personality across instruments and observers. Journal of Personality and Social Psychology, 52(1), 81-90.',
    url: 'https://www.ebsco.com/research-starters/social-sciences-and-humanities/big-five-personality-traits',
  },
  {
    citation: 'Bowlby, J. (1969-1982). Attachment and Loss (Vols. 1-3). Basic Books.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4085672/',
  },
  {
    citation: 'McClelland, D. C. (1975). Power: The inner experience. Irvington.',
    url: null,
  },
  {
    citation: 'Kruglanski, A. W. (1989). Lay epistemics and human knowledge: Cognitive and motivational bases. Plenum.',
    url: null,
  },
  {
    citation: 'Kolb, D. A. (1984). Experiential learning: Experience as the source of learning and development. Prentice Hall.',
    url: null,
  },
  {
    citation: 'Coffield, F., Moseley, D., Hall, E., & Ecclestone, K. (2004). Learning styles and pedagogy in post-16 learning: A systematic and critical review. Learning and Skills Research Centre.',
    url: null,
  },
]
</script>

<style scoped>
.page-root {
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  color: var(--hxh-text);
  position: relative;
  overflow-x: hidden;
}

.aura-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.aura-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}

.aura-orb--gold {
  width: 500px;
  height: 500px;
  background: #e8a000;
  top: -100px;
  right: -100px;
}

.aura-orb--teal {
  width: 400px;
  height: 400px;
  background: #00b4d8;
  bottom: 20%;
  left: -80px;
}

.aura-orb--purple {
  width: 350px;
  height: 350px;
  background: #6b3fd4;
  top: 40%;
  right: 10%;
}

.scanline-overlay {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px);
  pointer-events: none;
  z-index: 1;
}

.method-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  background: var(--hxh-bg-deep);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}

.back-link {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.5);
  text-decoration: none;
  padding: 6px 14px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.back-link:hover {
  color: rgba(184, 36, 75, 0.9);
  border-color: rgba(184, 36, 75, 0.3);
  background: rgba(184, 36, 75, 0.07);
}

.back-arrow {
  margin-right: 4px;
}

.header-seal svg {
  width: 32px;
  height: 32px;
  opacity: 0.7;
  filter: drop-shadow(0 0 6px rgba(184, 36, 75, 0.35));
}

.method-main {
  position: relative;
  z-index: 2;
  max-width: 860px;
  margin: 0 auto;
  padding: 64px 24px 80px;
}

.method-hero {
  margin-bottom: 72px;
}

.method-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: rgba(184, 36, 75, 0.8);
  margin-bottom: 12px;
}

.method-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: 0.05em;
  color: var(--hxh-text);
  margin-bottom: 20px;
  line-height: 1.1;
}

.method-lead {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(220, 220, 220, 0.75);
  max-width: 680px;
  margin-bottom: 28px;
}

.disclaimer-box {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: rgba(184, 36, 75, 0.06);
  border: 1px solid rgba(184, 36, 75, 0.2);
  border-radius: 6px;
  padding: 18px 20px;
  max-width: 680px;
}

.disclaimer-icon {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: rgba(184, 36, 75, 0.9);
  background: rgba(184, 36, 75, 0.15);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.disclaimer-box p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(220, 220, 220, 0.65);
  margin: 0;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text);
  text-transform: uppercase;
  margin-bottom: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.section-intro {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(220, 220, 220, 0.5);
  margin-bottom: 28px;
}

.framework-section {
  margin-bottom: 72px;
}

.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.framework-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 18px 20px;
  transition: border-color 0.2s;
}

.framework-card:hover {
  border-color: rgba(184, 36, 75, 0.25);
}

.fw-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.fw-tag {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.8);
  background: rgba(184, 36, 75, 0.1);
  border-radius: 2px;
  padding: 2px 7px;
  white-space: nowrap;
  margin-top: 2px;
}

.fw-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: rgba(220, 220, 220, 0.9);
  margin: 0;
}

.fw-authors {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.4);
  margin-bottom: 10px;
  font-style: italic;
}

.fw-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(220, 220, 220, 0.6);
  margin: 0;
}

.dimensions-section {
  margin-bottom: 72px;
}

.dim-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.dim-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 16px 20px;
}

.dim-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.dim-label {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  color: rgba(220, 220, 220, 0.9);
  text-transform: uppercase;
}

.dim-strength {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 2px 8px;
  white-space: nowrap;
}

.dim-strength--strong {
  color: #50c878;
  background: rgba(80, 200, 120, 0.1);
  border: 1px solid rgba(80, 200, 120, 0.25);
}

.dim-strength--moderate {
  color: #e8a000;
  background: rgba(232, 160, 0, 0.1);
  border: 1px solid rgba(232, 160, 0, 0.25);
}

.dim-strength--partial {
  color: #e05010;
  background: rgba(224, 80, 16, 0.1);
  border: 1px solid rgba(224, 80, 16, 0.25);
}

.dim-strength--weak {
  color: rgba(220, 220, 220, 0.4);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dim-strength--none {
  color: rgba(184, 36, 75, 0.8);
  background: rgba(184, 36, 75, 0.07);
  border: 1px solid rgba(184, 36, 75, 0.2);
}

.dim-questions {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.35);
  margin-bottom: 6px;
}

.dim-framework {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: rgba(220, 220, 220, 0.55);
  margin-bottom: 8px;
  font-style: italic;
}

.dim-note {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(220, 220, 220, 0.6);
  margin: 0;
}

.refs-section {
  margin-bottom: 48px;
}

.ref-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ref-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  flex-wrap: wrap;
}

.ref-citation {
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgba(220, 220, 220, 0.55);
  flex: 1;
  min-width: 200px;
}

.ref-link {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.8);
  text-decoration: none;
  white-space: nowrap;
  padding: 4px 8px;
  border: 1px solid rgba(184, 36, 75, 0.2);
  border-radius: 2px;
  transition: color 0.2s, background 0.2s;
  align-self: flex-start;
  margin-top: 2px;
}

.ref-link:hover {
  color: rgba(184, 36, 75, 1);
  background: rgba(184, 36, 75, 0.1);
}

.method-footer {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 24px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.25);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-sep {
  opacity: 0.4;
}

@media (max-width: 640px) {
  .method-header {
    padding: 10px 16px;
  }

  .method-main {
    padding: 48px 16px 60px;
  }

  .framework-grid {
    grid-template-columns: 1fr;
  }

  .dim-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
