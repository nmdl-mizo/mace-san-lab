export interface MemberProfile {
  email?: string;
  group: 'Staff' | 'Researchers' | 'Students';
  image: string;
  name: string;
  note: string;
  role: string;
}

export const members: MemberProfile[] = [
  {
    name: 'Teruyasu Mizoguchi',
    role: 'Professor, PI',
    group: 'Staff',
    email: 'teru_at_iis.u-tokyo.ac.jp',
    image: '/images/members/teruyasu-mizoguchi.png',
    note: 'Leads NMDL across materials design, atomic-scale characterization, simulation, and AI-enabled research.',
  },
  {
    name: 'Yutaka Yanaba',
    role: 'Technical Staff',
    group: 'Staff',
    email: 'yanaba_at_iis.u-tokyo.ac.jp',
    image: '/images/members/yutaka-yanaba.png',
    note: 'Supports the laboratory’s technical foundation and day-to-day experimental environment.',
  },
  {
    name: 'Yoko Matsuo',
    role: 'Administrative Staff',
    group: 'Staff',
    email: 'ymatsuo_at_iis.u-tokyo.ac.jp',
    image: '/images/members/yoko-matsuo.jpeg',
    note: 'Supports laboratory operations and keeps the group running smoothly behind the scenes.',
  },
  {
    name: 'Takumi Nakano',
    role: 'Researcher',
    group: 'Researchers',
    email: 'ntakumi_at_iis.u-tokyo.ac.jp',
    image: '/images/members/takumi-nakano.png',
    note: 'Works on research themes spanning materials simulation and advanced computational workflows.',
  },
  {
    name: 'Tasuku Sugiura',
    role: 'Researcher',
    group: 'Researchers',
    email: 'tsugiura_at_iis.u-tokyo.ac.jp',
    image: '/images/members/tasuku-sugiura.jpeg',
    note: 'Contributes to theory-driven materials research and computational development inside the lab.',
  },
  {
    name: 'Yeongrok Jin',
    role: 'Researcher',
    group: 'Researchers',
    email: 'yrjin_at_iis.u-tokyo.ac.jp',
    image: '/images/members/yeongrok-jin.jpg',
    note: 'Engages in research at the intersection of atomic-scale analysis and materials functionality.',
  },
  {
    name: 'Poyen Chen',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'POYEN_at_iis.u-tokyo.ac.jp',
    image: '/images/members/poyen-chen.png',
    note: 'Pursues doctoral research in the NMDL environment with a strong focus on advanced materials science.',
  },
  {
    name: 'Izumi Takahara',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'KOUGEN_at_iis.u-tokyo.ac.jp',
    image: '/images/members/izumi-takahara.png',
    note: 'Works on materials research themes shaped by theory, data, and a modern computational perspective.',
  },
  {
    name: 'Yu Fujikata',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'fujikata_at_iis.u-tokyo.ac.jp',
    image: '/images/members/yu-fujikata.jpg',
    note: 'Develops research as part of the doctoral student cohort in the lab’s evolving materials program.',
  },
  {
    name: 'Louis Wong',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'lwong_at_iis.u-tokyo.ac.jp',
    image: '/images/members/louis-wong.jpg',
    note: 'Explores doctoral-level materials research with an eye toward ambitious and future-facing themes.',
  },
];

export const featuredMember = members[0];

export const groupedMembers = [
  { label: 'Staff', members: members.filter((member) => member.group === 'Staff') },
  { label: 'Researchers', members: members.filter((member) => member.group === 'Researchers') },
  { label: 'Students', members: members.filter((member) => member.group === 'Students') },
];
