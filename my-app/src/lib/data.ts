// All story content lives here. Edit this file to change the story;
// the components just draw whatever is in these arrays.

export type Owner = 'community' | 'crown' | 'federal' | 'governors';
export type Widget = 'split' | 'cut' | 'ladder';

export type Station = {
  id: string;
  at: number;            // position along the pipe AND scroll progress, 0 to 1 (computed below)
  year: string;
  title: string;
  text: string;
  kind?: 'gate' | 'crown';
  quote?: string;
  note?: string;
  widget?: Widget;       // an interactive panel shown in the card
  owner?: Owner;         // if set, the pipe changes colour here: this is the title chain
};

type Raw = Omit<Station, 'at'>;

const raw: Raw[] = [
  { id: 'resist', year: '1900', title: 'Many states, then conquest',
    text: 'Before 1900 the land that became Nigeria held many self-governing states: Kanem-Bornu, the Sokoto Caliphate, Ife, Benin, Oyo and Delta city-states such as Nembe, Bonny and New Calabar. From 1900 Britain moved to rule them, and resistance to the occupation continued until about 1906.' },
  { id: 'pool', year: '1906', title: 'Pooling the money',
    text: 'Lagos was joined to the southern protectorate. The aim was one central policy and shared resources, so that revenue from the south would cover the cost of the north.' },
  { id: 'merge', year: '1914', title: 'One country, no vote',
    text: 'Lord Lugard merged the north and south. The records show Nigerians were not asked whether they agreed.',
    note: 'Raji and Abejide argue the merger should not be seen as a mistake. Historians disagree about its legacy.' },
  { id: 'oil07', year: '1907', title: 'Oil gets its own law',
    text: 'John Simon Bergheim, a British engineer, asked the Colonial Office for backing. It refused to fund him but wrote oil rules separate from mining rules. Section 5 let the Governor agree sales of surface and underground minerals with traditional rulers without rent on oil.',
    note: 'We step back a few years: the 1907 law came before the 1914 merger.' },
  { id: 'sapara', year: '1907', title: 'A motion defeated',
    text: 'Sapara Williams, an unofficial member of the Legislative Council, asked that rulers share in what was found on their land. The official members voted him down. The Governor then gave Bergheim’s company exclusive oil rights in the south-west.' },
  { id: 'gate', year: '1914', title: 'The gate', kind: 'gate',
    quote: 'No lease or license shall be granted except to a British subject or to a British company registered in Great Britain or in a British colony…',
    text: 'The first oil law of the merged country. Licences went only to British subjects and companies with a British-majority board. Nigerian firms could not hold one.' },
  { id: 'crown', year: '1916', title: 'Vested in the Crown', kind: 'crown', owner: 'crown',
    quote: 'The entire property in and control of the minerals, and mineral oils, in under or upon any land in Nigeria… is and shall be vested in the Crown…',
    text: 'Section 3(1) of the Mineral Ordinance. Everything below ground, and all rivers and streams, passed to the Crown. It stood until the Petroleum Act of 1969.' },
  { id: 'comp', year: '1916', title: 'Compensation, on paper',
    text: 'The same ordinance required payment for crops, trees and buildings destroyed by miners.',
    note: 'It is unclear whether surface rents were ever actually paid to landowners.' },
  { id: 'first', year: '1921', title: 'First licences',
    text: 'D’Arcy Exploration and Whitehall Petroleum received the first Niger Delta rights. Neither found oil in commercial quantity, and both returned their licences in 1923.' },
  { id: 'whole', year: '1937', title: 'The whole country',
    text: 'Shell D’Arcy, a consortium of Shell and the Anglo-Persian Oil Company, was granted exclusive exploration rights for all of Nigeria.' },
  { id: 'obnoxious', year: '1945', title: 'The “obnoxious ordinances”',
    text: 'The Mineral Oil Ordinance of 1945 did not require landowners’ consent before exploration or production. Landowners and the NCNC party objected, and the Zikist movement called the proposed land and mineral laws “obnoxious ordinances”. A new Governor-General reviewed the bills in 1947, and landowners were promised compensation and that no land would be taken without Colonial Office permission.' },
  { id: 'drill', year: '1951', title: 'Drilling begins',
    text: 'Shell D’Arcy drilled its first test well, near Owerri. The same year its licence shrank from the whole country to about a sixth of it, focused on the south.' },
  { id: 'oloibiri', year: '1956', title: 'Oloibiri',
    text: 'In January, Shell-BP found oil in commercial quantity at Oloibiri, at about 12,000 feet. A pipeline to Port Harcourt followed, and by March 1958 the field was producing 5,000 barrels a day.',
    note: 'At this stage the companies set their own production levels and prices. The government’s interest was tax, rent and royalty.' },
  { id: 'raisman', year: '1958', title: 'Who gets the money?', widget: 'split',
    text: 'Until then, rents and royalties stayed in the three regions. The Raisman report proposed pooling them: 50% to the host region, 20% federal, 30% to the other regions. It began shifting power from the regions to the centre.',
    note: 'In 1956 Nnamdi Azikiwe warned a British official that if the West and North kept insisting on derivation, the East would “regionalise everything”.' },
  { id: 'ppta', year: '1959', title: 'A 50-50 split',
    text: 'The Petroleum Profits Tax Act set a 50-50 profit share with foreign producers. It took effect from 1 January 1958, so it covered all production at Oloibiri. The model came from the Middle East, which had copied Venezuela’s 1948 system.' },
  { id: 'war', year: '1967', title: 'Twelve states', widget: 'cut',
    text: 'Nigeria produced 580,000 barrels a day, 84% of it by Shell-BP. As the Eastern Region moved towards secession and began demanding royalties, General Gowon divided the country into twelve states. The Eastern Region became three, and the core Igbo state, East Central, was cut off from the oil-producing Delta. The war that followed lasted until 1970, with over two million deaths, direct and indirect.',
    note: 'Most accounts stress ethnic causes. The Code4SA paper argues control of oil revenue was central too.' },
  { id: 'act69', year: '1969', title: 'The reversal that wasn’t', owner: 'federal',
    quote: 'Licences could only be granted to Nigerian citizens or companies incorporated in Nigeria.',
    text: 'The Petroleum Act annulled the 1914 ordinance. Licences now went to Nigerians, and local-content rules required training Nigerian staff. But the Act vested all ownership and control of the industry in the state.',
    note: 'Notice what changed (who may hold a licence) and what did not (title stays with a central authority).' },
  { id: 'ladder', year: '1971–79', title: 'Climbing the ladder', widget: 'ladder',
    text: 'The state raised its stake in joint ventures and the tax and royalty rates, following OPEC’s lead. Drag the year to see it happen.' },
  { id: 'lua78', year: '1978', title: 'The Land Use Act', owner: 'governors',
    text: 'The Land Use Act placed all land in each state under the Governor, to hold in trust for Nigerians. Before it, there was no uniform system of land tenure. Supporters say it unified a patchwork. Critics say it weakened customary rights; one study of Ekiti State found the rural poor were most affected.',
    note: 'The Act covers land. Oil title stayed under the Petroleum Act.' },
  { id: 'now', year: 'Today', title: 'Still unsettled',
    text: 'After 2003, militancy rose in the Niger Delta. Shell began selling onshore assets, including eight blocks for $2.7bn in 2012. Successive governments tried to overhaul the oil laws, and the reform bill became a battleground between the government and oil companies.',
    note: 'Code4SA’s paper ends around 2016. Later developments, such as the 2021 Petroleum Industry Act, need your own sourcing.' }
];

// Space the stations evenly along the pipe. Add or remove entries above and this adapts.
export const stations: Station[] = raw.map((s, i) => ({
  ...s,
  at: 0.03 + (i * 0.94) / (raw.length - 1)
}));

// Build the coloured pipe segments from the `owner` fields. Each segment runs
// from one title change to the next.
export type Segment = { from: number; to: number; owner: Owner };

export const segments: Segment[] = (() => {
  const out: Segment[] = [];
  let owner: Owner = 'community';
  let from = 0;
  for (const s of stations) {
    if (s.owner && s.owner !== owner) {
      out.push({ from, to: s.at, owner });
      owner = s.owner;
      from = s.at;
    }
  }
  out.push({ from, to: 1, owner });
  return out;
})();

export const ownerLabel: Record<Owner, string> = {
  community: 'Communities', crown: 'The Crown', federal: 'The federal state', governors: 'State governors'
};

export function ownerAt(progress: number): Owner {
  return (segments.find((s) => progress <= s.to) ?? segments[segments.length - 1]).owner;
}

// Data for the 1971-79 slider: state stake in joint ventures, oil tax and royalty (%).
export const ladder = [
  { year: 1971, equity: 35, tax: 50, royalty: 12.5 },
  { year: 1973, equity: 35, tax: 55, royalty: 12.5 },
  { year: 1974, equity: 55, tax: 67.75, royalty: 16.67 },
  { year: 1975, equity: 55, tax: 85, royalty: 20 },
  { year: 1979, equity: 60, tax: 85, royalty: 20 }
];