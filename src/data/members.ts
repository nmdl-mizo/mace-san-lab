export interface MemberProfile {
  email?: string;
  group: 'Staff' | 'Researchers' | 'Agents' | 'Students' | 'Research Students';
  image: string;
  name: string;
  note?: string;
  role: string;
}

export const members: MemberProfile[] = [
  {
    name: 'Teruyasu Mizoguchi',
    role: 'Professor, PI',
    group: 'Staff',
    email: 'teru_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image1.png',
    note: 'Leads NMDL across materials design, atomic-scale characterization, simulation, and AI-enabled research.',
  },
  {
    name: 'Yutaka Yanaba',
    role: 'Technical Staff',
    group: 'Staff',
    email: 'yanaba_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/yanaba.png',
  },
  {
    name: 'Yoko Matsuo',
    role: 'Administrative Staff',
    group: 'Staff',
    email: 'ymatsuo_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image31.jpeg',
  },
  {
    name: 'Takumi Nakano',
    role: 'Researcher',
    group: 'Researchers',
    email: 'ntakumi_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image5.png',
  },
  {
    name: 'Tasuku Sugiura',
    role: 'Researcher',
    group: 'Researchers',
    email: 'tsugiura_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image6.jpeg',
  },
  {
    name: 'Yeongrok Jin',
    role: 'Researcher',
    group: 'Researchers',
    email: 'yrjin_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/46.jpg',
  },
  {
    name: 'MACE-SAN',
    role: 'AI-Agent / Playground Operator',
    group: 'Agents',
    image: '/images/members/mace-san-agent.png',
    note: 'Experimental AI-Agent supporting GitHub Pages operations, design prototyping, content migration, and web playground iteration for NMDL.',
  },
  {
    name: 'Poyen Chen',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'POYEN_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image9.png',
  },
  {
    name: 'Izumi Takahara',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'KOUGEN_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image10.png',
  },
  {
    name: 'Yu Fujikata',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'fujikata_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/fujikata.jpg',
  },
  {
    name: 'Louis Wong',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'lwong_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/lowis.jpg',
  },
  {
    name: 'Youjeong Choi',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'youjeong_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/youjeong.jpg',
  },
  {
    name: 'Masahiro Watanabe',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'mw008_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/watanabe.png',
  },
  {
    name: 'Ren Okubo',
    role: 'Doctoral Student',
    group: 'Students',
    email: 'ROKUBO_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/okubo2024.jpg',
  },
  {
    name: 'Gen Fukuzawa',
    role: 'Master Student',
    group: 'Students',
    email: 'genf_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/image12.png',
  },
  {
    name: 'Ibuki Okuda',
    role: 'Master Student',
    group: 'Students',
    email: 'okuda_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/okuda.jpg',
  },
  {
    name: 'Shuichiro Ozawa',
    role: 'Master Student',
    group: 'Students',
    email: 's-ozawa_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/ozawa.jpg',
  },
  {
    name: 'Ryotaro Sahashi',
    role: 'Master Student',
    group: 'Students',
    email: 'sahashi_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/sahashi.jpg',
  },
  {
    name: 'Kazuya Miyamoto',
    role: 'Master Student',
    group: 'Students',
    email: 'miya1216_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/miyamoto.jpg',
  },
  {
    name: 'Yinan Wang',
    role: 'Master Student',
    group: 'Students',
    email: 'ynwang_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/wang.jpg',
  },
  {
    name: 'Kohei Ueyama',
    role: 'Master Student',
    group: 'Students',
    email: 'koh1208_at__iis.u-tokyo.ac.jp',
    image: '/images/official/mem/ueyama.jpg',
  },
  {
    name: 'Akihito Hitotsuyanagi',
    role: 'Master Student',
    group: 'Students',
    email: 'akihito_at__iis.u-tokyo.ac.jp',
    image: '/images/official/mem/hitotsu.jpg',
  },
  {
    name: 'Yutaro Matsuki',
    role: 'Master Student',
    group: 'Students',
    email: 'ymatsuki_at__iis.u-tokyo.ac.jp',
    image: '/images/official/mem/matsuki.jpg',
  },
  {
    name: 'ChihLun Hsu',
    role: 'Research Student',
    group: 'Research Students',
    email: 'chihlun_at_iis.u-tokyo.ac.jp',
    image: '/images/official/mem/hsu.jpg',
  },
];

export const featuredMember = members[0];

export const groupedMembers = [
  { label: 'Staff', members: members.filter((member) => member.group === 'Staff') },
  { label: 'Researchers', members: members.filter((member) => member.group === 'Researchers') },
  { label: 'Agents', members: members.filter((member) => member.group === 'Agents') },
  { label: 'Students', members: members.filter((member) => member.group === 'Students') },
  { label: 'Research Students', members: members.filter((member) => member.group === 'Research Students') },
];
