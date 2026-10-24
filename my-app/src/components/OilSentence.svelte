<script lang="ts">
  import './scrolly-base.css';
  import { inview } from './scrolly';
  import { fade } from 'svelte/transition';

  // Sentences are abridged or paraphrased. Replace each with the exact statutory
  // wording and section numbers from the primary text before publishing.
  type Era = {
    year: string;
    law: string;
    pre: string;
    owner: string;
    post: string;
    tag?: string;
    owners: string; // who the law names as holder
    people: string; // are the people on the land named?
    peopleKind: 'no' | 'weak' | 'yes';
  };

  const eras: Era[] = [
    {
      year: '1914',
      law: 'Mineral Oils Ordinance',
      pre: 'The entire property in and control of all mineral oils is and shall be vested in ',
      owner: 'the Crown',
      post: '.',
      tag: 'Abridged',
      owners: 'The Crown',
      people: 'Not named',
      peopleKind: 'no'
    },
    {
      year: '1969',
      law: 'Petroleum Decree',
      pre: 'The entire property in and control of all petroleum in, under or upon any lands in Nigeria is and shall be vested in ',
      owner: 'the State',
      post: '.',
      tag: 'Abridged',
      owners: 'The State',
      people: 'Not named',
      peopleKind: 'no'
    },
    {
      year: '1978',
      law: 'Land Use Act',
      pre: 'All land in the territory of each State is vested in ',
      owner: 'the Governor',
      post: ', held in trust for the use and common benefit of all Nigerians.',
      tag: 'Abridged',
      owners: 'The Governor, in trust',
      people: '“All Nigerians”; customary rights revocable',
      peopleKind: 'weak'
    },
    {
      year: '1999',
      law: 'Constitution, section 44(3)',
      pre: 'The entire property in and control of all minerals, mineral oils and natural gas in, under or upon any land in Nigeria shall vest in ',
      owner: 'the Government of the Federation',
      post: '.',
      tag: 'Abridged',
      owners: 'The Federal Government',
      people: 'Not named',
      peopleKind: 'no'
    },
    {
      year: '2021',
      law: 'Petroleum Industry Act',
      pre: 'Operators shall pay three per cent of annual operating expenditure into ',
      owner: 'a host community development trust',
      post: '.',
      tag: 'Paraphrase',
      owners: 'Unchanged, with a company-funded trust added',
      people: 'Named as trust beneficiaries',
      peopleKind: 'weak'
    },
    {
      year: '1981',
      law: 'African Charter, Article 21',
      pre: '',
      owner: 'All peoples',
      post: ' shall freely dispose of their wealth and natural resources.',
      owners: 'The peoples themselves',
      people: 'The subject of the sentence',
      peopleKind: 'yes'
    }
  ];

  type Step = { era: number; eyebrow: string; title: string; body: string; note?: string };
  const steps: Step[] = [
    {
      era: -1,
      eyebrow: 'Read the verb, then look for the people',
      title: 'Six sentences, one question',
      body: 'Every Nigerian oil law answers the same question: who holds the oil? Follow the noun after the verb, and keep an eye on who is never named.'
    },
    {
      era: 0,
      eyebrow: '1914',
      title: 'The Crown',
      body: 'The Mineral Oils Ordinance vests oil in a monarch an ocean away. The people living above the oil are not part of the sentence.'
    },
    {
      era: 1,
      eyebrow: '1969',
      title: 'One noun changes',
      body: 'The military government’s Petroleum Decree uses the same construction. The Crown becomes the State. The communities stay out of the sentence.'
    },
    {
      era: 2,
      eyebrow: '1978',
      title: 'The land goes to the governor',
      body: 'The Land Use Act vests all land in each state’s governor, to be held in trust for all Nigerians. It also lets a governor revoke a customary right of occupancy where land is needed for mining or oil pipelines.',
      note: 'Check the exact section number (28) and wording in the 1978 text.'
    },
    {
      era: 3,
      eyebrow: '1999',
      title: 'The Constitution keeps the structure',
      body: 'Section 44(3) vests minerals, mineral oils and natural gas in the Government of the Federation, whatever customary land they lie beneath.'
    },
    {
      era: 4,
      eyebrow: '2021',
      title: 'The people appear, as beneficiaries',
      body: 'The Petroleum Industry Act requires operators to pay three percent of annual operating expenditure into host community development trusts. That is the first time communities are named in the machinery, as recipients of a company payment. Ownership does not change.'
    },
    {
      era: 5,
      eyebrow: 'The sentence Nigeria is bound by',
      title: 'Now put the people first',
      body: 'Article 21 of the African Charter, in force since 1986, has the peoples as its subject. In 2001 the African Commission on Human and Peoples’ Rights found Nigeria in violation of it in the Ogoni case, saying the government had facilitated the destruction of Ogoniland.',
      note: 'Whether and how communities describe themselves as indigenous peoples varies. Let the Ogoni, Ijaw and other communities you interview use their own terms.'
    }
  ];

  let active = $state(0);
  const era = $derived(steps[active].era);
  const shown = $derived(era < 0 ? null : eras[era]);
</script>

<main class="sc">
  <div class="sc-stage">
    <div class="paper">
      {#if shown}
        {#key era}
          <div in:fade={{ duration: 450 }}>
            <p class="law">{shown.year}, {shown.law}{#if shown.tag}<span class="tag">{shown.tag}</span>{/if}</p>
            <p class="sentence">
              {shown.pre}<span class="owner" class:people={shown.peopleKind === 'yes'}>{shown.owner}</span>{shown.post}
            </p>
          </div>
        {/key}
      {:else}
        <p class="sentence blank">The entire property in and control of all oil is and shall be vested in <span class="slot"></span></p>
      {/if}
    </div>

    <table class="ledger">
      <thead>
        <tr><th>Law</th><th>Holder named</th><th>The people on the land</th></tr>
      </thead>
      <tbody>
        {#each eras as e, i}
          <tr class:reached={era >= i} class:current={era === i}>
            <td>{e.year}</td>
            <td>{e.owners}</td>
            <td class={e.peopleKind}>{e.people}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="sc-steps">
    {#each steps as s, i}
      <section class="sc-step" use:inview={{ index: i, onenter: (v) => (active = v) }}>
        <div class="sc-card" class:live={active === i}>
          <p class="sc-eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p class="sc-body">{s.body}</p>
          {#if s.note}<p class="sc-note">{s.note}</p>{/if}
        </div>
      </section>
    {/each}
  </div>
</main>

<style>
  .paper { background: var(--paper); color: var(--ink); padding: clamp(1.4rem, 4vh, 2.6rem) clamp(1.2rem, 3vw, 2.8rem); min-height: 17rem; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55); }
  .law { margin: 0 0 1rem; font-size: 0.85rem; font-weight: 700; color: #8c7c5e; display: flex; gap: 0.8rem; align-items: baseline; }
  .tag { font-weight: 400; font-style: italic; }
  .sentence { margin: 0; font-size: clamp(1.25rem, 2.3vw, 2rem); line-height: 1.5; }
  .owner { background-image: linear-gradient(180deg, transparent 60%, rgba(226, 186, 82, 0.7) 60%); font-weight: 700; padding: 0 0.1em; }
  .owner.people { background-image: linear-gradient(180deg, transparent 60%, rgba(179, 38, 30, 0.35) 60%); }
  .slot { display: inline-block; width: 6ch; height: 1em; vertical-align: -0.12em; background: var(--ink); }
  .blank { color: #8c7c5e; }

  .ledger { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
  .ledger th { text-align: left; font-weight: 600; color: var(--mute); padding: 0.35rem 0.6rem 0.5rem 0; border-bottom: 1px solid rgba(239, 231, 212, 0.25); }
  .ledger td { padding: 0.5rem 0.6rem 0.5rem 0; border-bottom: 1px solid rgba(239, 231, 212, 0.1); color: #d6ccb6; vertical-align: top; }
  .ledger tr { opacity: 0; transition: opacity 0.6s var(--ease); }
  .ledger tr.reached { opacity: 0.55; }
  .ledger tr.current { opacity: 1; }
  td.no { color: #e0897f; }
  td.weak { color: var(--gold); }
  td.yes { color: #f7f0de; font-weight: 700; }
  thead tr { opacity: 1; }
  @media (max-width: 860px) { .sentence { font-size: 1.05rem; } .paper { min-height: 11rem; } .ledger { font-size: 0.74rem; } }
</style>