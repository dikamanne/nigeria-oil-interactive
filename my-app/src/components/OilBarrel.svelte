<script lang="ts">
  import './scrolly-base.css';
  import { inview } from './scrolly';

  // The units are illustrative: the SHARES are legal, the figures are not NEITI data.
  // To add real money, pull NEITI's audit and replace the labels with actual amounts.
  type Step = { eyebrow: string; title: string; body: string; note?: string; stats?: { num: string; label: string }[] };
  const steps: Step[] = [
    {
      eyebrow: 'Start with 100',
      title: 'Every barrel starts with the federation',
      body: 'Under section 44(3) of the Constitution, oil beneath any land in Nigeria vests in the Government of the Federation. So revenue starts in one place, whoever lives above the well.',
      note: 'Units are illustrative. The shares shown are set by law; they are not audited amounts.'
    },
    {
      eyebrow: 'Constitution, section 162(2)',
      title: 'Thirteen goes to the producing state',
      body: 'The constitution sets derivation at not less than 13 percent of oil revenue for the state it comes from. It is a minimum, and the money goes to state governments, not to the communities on the ground.'
    },
    {
      eyebrow: 'The governor’s desk',
      title: 'Then it stops',
      body: 'In the first half of 2023, nine producing states shared N544.9 billion in derivation. Host-community groups say the fund has been politicised and are lobbying for a law requiring states to pass part of it to community trusts. Ijaw leader Edwin Clark has said oil-producing communities are political minorities in their own states, with little voice.',
      note: 'Check whether any law currently obliges governors to pass derivation money to communities.'
    },
    {
      eyebrow: 'Petroleum Industry Act, 2021',
      title: 'The one payment routed to communities',
      body: 'The PIA requires operators to pay three percent of their annual operating expenditure into host community development trusts. It is company-funded and set against what companies spend, not against what the oil earns.',
      stats: [{ num: '3 in 100', label: 'of operating spending, not of oil revenue' }]
    },
    {
      eyebrow: '2025',
      title: 'The transparency agency had to ask',
      body: 'NEITI publicly urged oil companies in 2025 to make effective use of the three percent. The mechanism exists in law; how consistently it is enforced is still being watched.'
    },
    {
      eyebrow: 'The sentence that begins with the people',
      title: 'Who “free disposal” was meant for',
      body: 'Article 21 of the African Charter says all peoples shall freely dispose of their wealth and natural resources. In 2001 the African Commission found Nigeria violated it in the Ogoni case. Follow the money in this diagram and ask who, in law, is doing the disposing.'
    }
  ];

  let active = $state(0);
</script>

<main class="sc">
  <div class="sc-stage">
    <div class="flow">
      <div class="lane">
        <p class="lab">Oil revenue entering the Federation Account <em>(100 illustrative units)</em></p>
        <div class="bar"><div class="seg whole" style="width:100%">100</div></div>
      </div>

      <div class="lane" class:on={active >= 1}>
        <p class="lab">Section 162(2): at least 13 to the producing state</p>
        <div class="bar">
          <div class="seg gold" style="width:{active >= 1 ? 13 : 0}%">13</div>
          <div class="seg rest" style="width:{active >= 1 ? 87 : 0}%">87 shared by everyone else</div>
        </div>
      </div>

      <div class="lane" class:on={active >= 2}>
        <p class="lab">Where the 13 goes next</p>
        <div class="hop">
          <div class="box gov">State government</div>
          <span class="arrow">→</span>
          <div class="box empty">Host communities: no share fixed by this clause</div>
        </div>
      </div>

      <div class="lane divided" class:on={active >= 3}>
        <p class="lab">A separate pot, on a separate scale: 100 units of company operating spending</p>
        <div class="bar">
          <div class="seg red" style="width:{active >= 3 ? 3 : 0}%">3</div>
          <div class="seg rest" style="width:{active >= 3 ? 97 : 0}%">97 stays with operations</div>
        </div>
        <p class="cap">The 3 is paid by companies into host community trusts. It is not a cut of the oil revenue above.</p>
      </div>

      <div class="lane" class:on={active >= 5}>
        <blockquote>
          <p>All peoples shall freely dispose of their wealth and natural resources.</p>
          <cite>African Charter on Human and Peoples’ Rights, Article 21</cite>
        </blockquote>
      </div>
    </div>

    <p class="sc-src">Sources: Constitution of Nigeria (ss. 44(3), 162(2)); Petroleum Industry Act 2021; TheCable on 2023 derivation sharing; NEITI; African Commission, SERAC v Nigeria, Comm. 155/96 (2001).</p>
  </div>

  <div class="sc-steps">
    {#each steps as s, i}
      <section class="sc-step" use:inview={{ index: i, onenter: (v) => (active = v) }}>
        <div class="sc-card" class:live={active === i}>
          <p class="sc-eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p class="sc-body">{s.body}</p>
          {#if s.stats}
            <ul class="sc-stats">
              {#each s.stats as st}<li><span class="sc-num">{st.num}</span><span class="sc-unit">{st.label}</span></li>{/each}
            </ul>
          {/if}
          {#if s.note}<p class="sc-note">{s.note}</p>{/if}
        </div>
      </section>
    {/each}
  </div>
</main>

<style>
  .flow { display: grid; gap: 2.2vh; }
  .lane { opacity: 0; transform: translateY(10px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
  .lane:first-child, .lane.on { opacity: 1; transform: none; }
  .lane.divided { padding-top: 1.6vh; border-top: 1px dashed rgba(239, 231, 212, 0.3); }
  .lab { margin: 0 0 0.4rem; font-size: 0.9rem; color: #d6ccb6; }
  .lab em { color: var(--mute); }
  .bar { display: flex; height: 2.4rem; background: rgba(239, 231, 212, 0.06); }
  .seg { display: flex; align-items: center; justify-content: center; overflow: hidden; white-space: nowrap; font-size: 0.85rem; font-weight: 700; transition: width 1s var(--ease); }
  .whole { background: var(--paper); color: var(--ink); }
  .gold { background: var(--gold); color: #1a1613; }
  .red { background: var(--red); color: #fff; }
  .rest { background: rgba(239, 231, 212, 0.16); color: #bfb39a; font-weight: 400; }
  .hop { display: flex; align-items: stretch; gap: 0.8rem; }
  .box { padding: 0.7rem 0.9rem; font-size: 0.88rem; }
  .gov { background: var(--gold); color: #1a1613; font-weight: 700; }
  .empty { border: 2px dashed var(--red); color: #e0897f; flex: 1; }
  .arrow { align-self: center; color: var(--mute); font-size: 1.3rem; }
  .cap { margin: 0.5rem 0 0; font-size: 0.82rem; color: var(--mute); }
  blockquote { margin: 0; padding: 1rem 1.2rem; background: var(--paper); color: var(--ink); }
  blockquote p { margin: 0 0 0.4rem; font-size: clamp(1.15rem, 2vw, 1.6rem); line-height: 1.4; font-weight: 700; }
  cite { font-size: 0.8rem; font-style: normal; color: #8c7c5e; }
  @media (max-width: 860px) { .lab { font-size: 0.78rem; } .bar { height: 2rem; } .seg { font-size: 0.74rem; } .box { font-size: 0.78rem; padding: 0.5rem; } }
</style>