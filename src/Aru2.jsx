import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {cl, R, CREAM, GOLD, GOLDD, CAPS, Caption, Fonts, Dust, Vig, Foot, Crown, Face, SideHead, Bangle, Brahma, LotusSeat, GhostTemple, Swan, Cloud, FirePillar, SkyDefs, Stars, Ketaki, Nagara, Gopuram, Palm, SC} from './Aru.jsx';
import {Shiva} from './Scene.jsx';
import TL from './timeline.json';

const VS = '#5a8fd0', VSD = '#3d68a3', YEL = '#e9b63a', YELD = '#b98422';
const lin = (t, a, b, x = 0, y = 1) => interpolate(t, [a, b], [x, y], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const pulse = (t, a, d = 0.5) => Math.max(0, 1 - Math.abs(t - a) / d);
const Cam = ({z = 1, fx = 960, fy = 540, children}) => <g transform={`translate(960 540) scale(${z}) translate(${-fx} ${-fy})`}>{children}</g>;

/* ============================================================ figures */
const Limb = ({d, w = 38, c, cd}) => <g><path d={d} fill="none" stroke={cd} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" /><path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></g>;
const TallCrown = () => (
  <g>
    <path d="M-60 0 C-58 -74 -38 -128 0 -172 C38 -128 58 -74 60 0Z" fill={GOLD} /><path d="M0 0 L0 -172 C38 -128 58 -74 60 0Z" fill={GOLDD} opacity="0.55" />
    <path d="M-52 -50 Q0 -72 52 -50 M-38 -100 Q0 -120 38 -100" fill="none" stroke={GOLDD} strokeWidth="6" />
    <rect x="-64" y="-12" width="128" height="18" rx="6" fill={GOLDD} /><circle cx="0" cy="-30" r="10" fill="#c0392b" /><circle cx="0" cy="-80" r="7" fill="#2e8b6a" /><path d="M-7 -170 Q0 -204 7 -170Z" fill="#fbe9b4" />
  </g>
);
const VFace = ({closed = 0, eye = 0, sk = VS, skd = VSD, crown = 'tall', open = 0, worry = 0}) => (
  <g>
    <path d="M-72 -34 C-84 20 -76 64 -58 88 L58 88 C76 64 84 20 72 -34Z" fill="#17151d" />
    <ellipse cx="-66" cy="6" rx="12" ry="22" fill={skd} /><ellipse cx="66" cy="6" rx="12" ry="22" fill={skd} /><circle cx="-68" cy="36" r="10" fill={GOLD} /><circle cx="68" cy="36" r="10" fill={GOLD} />
    <path d="M-62 -10 C-62 -72 62 -72 62 -10 C62 40 38 72 0 76 C-38 72 -62 40 -62 -10Z" fill={sk} /><path d="M0 -58 C62 -72 62 -10 62 -10 C62 40 38 72 0 76Z" fill={skd} opacity="0.45" />
    {[-1, 1].map((d) => (
      <g key={d} transform={`translate(${d * 28} -6)`}>
        {closed ? <path d="M-16 0 Q0 10 16 0" fill="none" stroke="#17151d" strokeWidth="4" strokeLinecap="round" /> : <g><path d={`M-16 0 Q0 ${-12 + eye * 5} 16 0 Q0 9 -16 0Z`} fill="#fffaf0" /><circle cx="0" cy="-1" r="6" fill="#1c1420" /><path d={`M-18 -1 Q0 ${-14 + eye * 6} 18 -1`} fill="none" stroke="#17151d" strokeWidth="3" strokeLinecap="round" /></g>}
        <path d={`M-19 ${-18 + eye * 4 * d + worry * (d > 0 ? -8 : 6)} Q0 -27 19 ${-18 - eye * 4 * d + worry * (d > 0 ? 6 : -8)}`} fill="none" stroke="#17151d" strokeWidth="5" strokeLinecap="round" />
      </g>
    ))}
    <path d="M-6 -12 L-10 22 Q0 28 10 22 L6 -12" fill={skd} opacity="0.5" />{open > 0.06 ? <g><ellipse cx="0" cy={48 + open * 4} rx={12 + 3 * open} ry={2 + 11 * open} fill="#3a1018" /><path d={`M${-9 - 2 * open} ${46 + open} h${18 + 4 * open}`} stroke="#fffaf0" strokeWidth={3 * Math.min(1, open * 2)} /><ellipse cx="0" cy={54 + open * 9} rx={7 + 2 * open} ry={1 + 4 * open} fill="#c0564a" /></g> : <path d={`M-14 44 q14 ${10 - worry * 14} 28 0`} fill="none" stroke="#6a2634" strokeWidth="4.5" strokeLinecap="round" />}
    <path d="M-9 -52 L-9 -30 Q0 -20 9 -30 L9 -52" fill="none" stroke="#fbf3df" strokeWidth="5" /><path d="M0 -50 L0 -30" stroke="#c0392b" strokeWidth="5" />
    <g transform="translate(0 -56)">{crown === 'tall' ? <TallCrown /> : <Crown />}</g>
  </g>
);
const HandUp = ({sk, skd}) => (
  <g><path d="M-26 20 C-30 -10 -26 -44 -22 -56 L22 -56 C26 -44 30 -10 26 20Z" fill={sk} />{[-17, -6, 5, 16].map((x, i) => <rect key={i} x={x - 5} y={-92 + Math.abs(i - 1.5) * 7} width="11" height="44" rx="5.5" fill={sk} stroke={skd} strokeWidth="1.5" />)}<rect x="-40" y="-36" width="16" height="34" rx="8" fill={sk} transform="rotate(-24 -32 -20)" /><circle cx="0" cy="-18" r="9" fill="#c0392b" opacity="0.8" /></g>
);
const Chakra = ({k}) => (
  <g transform={`rotate(${k * 6})`}><circle r="46" fill="none" stroke={GOLD} strokeWidth="10" /><circle r="26" fill="none" stroke={GOLD} strokeWidth="4" /><circle r="9" fill={GOLD} />{[...Array(8)].map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 -62 l8 13 h-16Z" fill={GOLD} />)}{[...Array(4)].map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M-26 0 H26" stroke={GOLD} strokeWidth="3" />)}</g>
);
const Conch = () => <g><path d="M-30 24 C-46 -30 0 -62 28 -30 C46 -6 22 32 -4 24 C12 14 14 -6 0 -12 C-12 -14 -18 0 -10 12Z" fill="#f3ecd8" stroke="#cfc3a0" strokeWidth="3" /><path d="M-30 24 L-44 44" stroke="#cfc3a0" strokeWidth="7" strokeLinecap="round" /></g>;
const Deity = ({k = 0, pose = 'stand', closed = 0, eye = 0, bow = 0, hands = 'bless', items = true, sk = VS, skd = VSD, c1 = YEL, c2 = YELD, crown = 'tall', halo = true, ph = 0, garland = true, open = 0, worry = 0}) => {
  const br = Math.sin(k / 22 + 1 + ph) * 4;
  return (
    <g>
      {halo && <g><circle cx="0" cy="-150" r="210" fill="none" stroke="#fbe9b4" strokeWidth="5" opacity="0.45" /><circle cx="0" cy="-150" r="226" fill="none" stroke="#fbe9b4" strokeWidth="2" opacity="0.28" /></g>}
      {items && <g>
        <Limb c={sk} cd={skd} d={`M-84 ${20 + br} L-196 ${-6 + br} L-214 ${-128 + br}`} /><Limb c={sk} cd={skd} d={`M84 ${20 + br} L196 ${-6 + br} L214 ${-128 + br}`} />
        <Bangle x={-207} y={-84 + br} r={8} /><Bangle x={207} y={-84 + br} r={-8} />
        <g transform={`translate(-216 ${-204 + br})`}><Chakra k={k} /></g><ellipse cx="-214" cy={-140 + br} rx="24" ry="20" fill={sk} />
        <g transform={`translate(218 ${-180 + br})`}><Conch /></g><ellipse cx="214" cy={-140 + br} rx="24" ry="20" fill={sk} />
      </g>}
      {pose === 'sit' ? <g>
        <path d="M-236 300 C-250 214 -110 196 0 208 C110 196 250 214 236 300 C150 344 -150 344 -236 300Z" fill={c1} /><path d="M0 208 C110 196 250 214 236 300 C150 344 60 342 0 340Z" fill={c2} opacity="0.6" />
        <path d="M-200 292 C-90 250 60 252 150 300" fill="none" stroke={c2} strokeWidth="9" /><ellipse cx="-150" cy="306" rx="46" ry="20" fill={sk} /><ellipse cx="156" cy="304" rx="46" ry="20" fill={skd} />
      </g> : <g>
        <path d="M-98 206 C-106 320 -112 440 -118 560 L-10 560 L0 320 L10 560 L118 560 C112 440 106 320 98 206Z" fill={c1} /><path d="M0 206 L98 206 C106 320 112 440 118 560 L10 560 L0 320Z" fill={c2} opacity="0.55" />
        <path d="M-116 522 L-12 522 M12 522 L116 522" stroke={c2} strokeWidth="10" /><path d="M-20 214 C-34 300 -30 400 -44 500 L-20 506 C-8 400 -4 300 4 214Z" fill={c2} opacity="0.5" />
        <ellipse cx="-66" cy="566" rx="50" ry="16" fill={sk} /><ellipse cx="66" cy="566" rx="50" ry="16" fill={skd} />
      </g>}
      <path d={`M-96 214 C-112 120 -108 50 -86 ${4 + br} L86 ${4 + br} C108 50 112 120 96 214Z`} fill={sk} /><path d={`M0 ${4 + br} L86 ${4 + br} C108 50 112 120 96 214 L0 214Z`} fill={skd} opacity="0.45" />
      <path d="M-98 176 C-40 196 40 196 98 176 L100 222 C40 236 -40 236 -100 222Z" fill={GOLD} /><rect x="-18" y="178" width="36" height="46" rx="8" fill={GOLDD} /><circle cx="0" cy="200" r="9" fill="#c0392b" />
      <path d={`M-62 ${10 + br} Q0 ${96 + br} 62 ${10 + br}`} fill="none" stroke={GOLD} strokeWidth="10" /><circle cx="0" cy={56 + br} r="12" fill="#c0392b" stroke={GOLD} strokeWidth="4" />
      {garland && <g><path d={`M-72 ${14 + br} C-96 150 -44 262 0 272 C44 262 96 150 72 ${14 + br}`} fill="none" stroke="#3f9a5c" strokeWidth="13" />{[...Array(13)].map((_, i) => { const u = i / 12, a = Math.PI * u; const x = -Math.cos(a) * 78 * (1 - 0.25 * Math.sin(a)), y = 14 + Math.sin(a) * 258; return <circle key={i} cx={x} cy={y + br * (1 - Math.sin(a))} r="8" fill={i % 2 ? '#fbf3df' : '#e98aa6'} />; })}</g>}
      {hands === 'bless' && <g><Limb c={sk} cd={skd} d={`M-90 ${30 + br} L-150 ${126 + br} L-160 212`} /><ellipse cx="-162" cy="224" rx="24" ry="20" fill={sk} /><Limb c={sk} cd={skd} d={`M90 ${30 + br} L156 ${120 + br} L150 ${36 + br}`} /><g transform={`translate(150 ${8 + br})`}><HandUp sk={sk} skd={skd} /></g><Bangle x={152} y={70 + br} /><Bangle x={-158} y={186} r={-8} /></g>}
      {hands === 'down' && <g><Limb c={sk} cd={skd} d={`M-90 ${30 + br} L-144 ${128 + br} L-152 216`} /><ellipse cx="-154" cy="228" rx="24" ry="20" fill={sk} /><Limb c={sk} cd={skd} d={`M90 ${30 + br} L144 ${128 + br} L152 216`} /><ellipse cx="154" cy="228" rx="24" ry="20" fill={skd} /><Bangle x={-150} y={190} r={-6} /><Bangle x={150} y={190} r={6} /></g>}
      {hands === 'fold' && <g><Limb c={sk} cd={skd} d={`M-90 ${30 + br} L-136 ${136 + br} L-24 ${118 + br}`} /><Limb c={sk} cd={skd} d={`M90 ${30 + br} L136 ${136 + br} L24 ${118 + br}`} /><path d={`M-24 ${128 + br} C-30 86 -12 54 0 ${38 + br} C12 54 30 86 24 ${128 + br}Z`} fill={sk} stroke={skd} strokeWidth="3" /><path d={`M0 ${44 + br} L0 ${126 + br}`} stroke={skd} strokeWidth="3" /><Bangle x={-60} y={126 + br} r={8} /><Bangle x={60} y={126 + br} r={-8} /></g>}
      <g transform={`translate(0 ${-92 + br}) rotate(${bow} 0 80)`}><path d="M-40 60 L-46 100 L46 100 L40 60Z" fill={skd} /><VFace closed={closed} eye={eye} sk={sk} skd={skd} crown={crown} open={open} worry={worry} /></g>
    </g>
  );
};
const BH = '#2f3a5e', BHD = '#1c233d';
const Bhairava = ({k, sw = 1, reach = 0}) => {
  const br = Math.sin(k / 16) * 5; const hx = 150 + reach * 110, hy = 220 - reach * 130;
  return (
    <g>
      <circle cx="0" cy="-100" r="330" fill="url(#fglow)" opacity="0.5" />
      {[...Array(15)].map((_, i) => { const a = -118 + i * 17, l = 150 + 34 * Math.sin(k / 5 + i * 2.1); return <path key={i} transform={`translate(0 -96) rotate(${a})`} d={`M-30 -40 Q${10 * Math.sin(k / 4 + i)} ${-l * 0.7} 0 ${-l} Q22 ${-l * 0.5} 30 -40Z`} fill={i % 3 ? '#14101c' : '#3a1420'} />; })}
      <Limb c={BH} cd={BHD} w={44} d={`M-56 360 L-70 556`} /><Limb c={BH} cd={BHD} w={44} d={`M56 360 L70 556`} /><ellipse cx="-78" cy="568" rx="52" ry="16" fill={BH} /><ellipse cx="78" cy="568" rx="52" ry="16" fill={BHD} />
      <path d="M-104 206 L-124 400 L-40 372 L0 410 L40 372 L124 400 L104 206Z" fill="#d0902f" /><path d="M0 206 L0 410 L40 372 L124 400 L104 206Z" fill="#a86f1f" opacity="0.7" />
      {[-80, -40, 10, 50, 86].map((x, i) => <path key={i} d={`M${x} 236 q8 40 -4 86`} stroke="#4a2a0c" strokeWidth="9" fill="none" strokeLinecap="round" />)}
      <path d={`M-104 214 C-122 120 -116 50 -92 ${4 + br} L92 ${4 + br} C116 50 122 120 104 214Z`} fill={BH} /><path d={`M0 ${4 + br} L92 ${4 + br} C116 50 122 120 104 214 L0 214Z`} fill={BHD} opacity="0.6" />
      <rect x="-106" y="190" width="212" height="26" rx="8" fill={GOLDD} />
      {[...Array(11)].map((_, i) => { const a = Math.PI * i / 10; const x = -Math.cos(a) * 84, y = 20 + Math.sin(a) * 150 + br * (1 - Math.sin(a)); return <g key={i}><circle cx={x} cy={y} r="15" fill="#efe9dc" /><circle cx={x - 5} cy={y - 2} r="3" fill="#2a2030" /><circle cx={x + 5} cy={y - 2} r="3" fill="#2a2030" /></g>; })}
      <Limb c={BH} cd={BHD} w={44} d={`M92 ${30 + br} L152 ${130 + br} L${hx} ${hy}`} /><ellipse cx={hx + 6} cy={hy - 8} rx="28" ry="24" fill={BH} />
      <Limb c={BH} cd={BHD} w={44} d={`M-92 ${30 + br} L-200 ${0 + br - sw * 30} L-230 ${-110 - sw * 60 + br}`} />
      <g transform={`translate(-232 ${-128 - sw * 60 + br}) rotate(${-34 + sw * 22})`}><path d="M-12 0 L-18 -300 Q4 -372 30 -290 L12 0Z" fill="#e3e9f2" /><path d="M0 0 L4 -350 Q24 -330 30 -290 L12 0Z" fill="#aab4c6" /><rect x="-40" y="-8" width="80" height="16" rx="6" fill={GOLD} /><rect x="-10" y="6" width="20" height="50" rx="8" fill="#6b3a1e" /></g>
      <ellipse cx="-232" cy={-124 - sw * 60 + br} rx="28" ry="24" fill={BH} />
      <g transform={`translate(0 ${-96 + br})`}>
        <path d="M-44 60 L-50 104 L50 104 L44 60Z" fill={BHD} />
        <path d="M-70 -10 C-70 -84 70 -84 70 -10 C70 46 42 84 0 88 C-42 84 -70 46 -70 -10Z" fill={BH} /><path d="M0 -66 C70 -84 70 -10 70 -10 C70 46 42 84 0 88Z" fill={BHD} opacity="0.6" />
        {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 30} -8)`}><circle r="19" fill="#fff6e6" /><circle r="10" fill="#c22a1c" /><circle r="4.5" fill="#150c10" /><path d={`M${-24 * d} -30 L${26 * d} -16`} stroke="#0c0a12" strokeWidth="10" strokeLinecap="round" /></g>)}
        <path d="M0 -56 C-10 -44 -10 -30 0 -22 C10 -30 10 -44 0 -56Z" fill="#ff8a2a" /><circle cx="0" cy="-38" r="4" fill="#150c10" />
        <path d="M-34 36 Q0 20 34 36 Q30 70 0 72 Q-30 70 -34 36Z" fill="#5a0f14" /><path d="M-26 36 l7 18 l7 -18 M12 36 l7 18 l7 -18" fill="#fff6e6" /><path d="M-52 26 Q-30 10 0 26 Q30 10 52 26 Q30 22 0 34 Q-30 22 -52 26Z" fill="#0c0a12" />
        <circle cx="-74" cy="34" r="12" fill={GOLD} /><circle cx="74" cy="34" r="12" fill={GOLD} /><path d="M-58 -52 Q0 -86 58 -52" fill="none" stroke={GOLD} strokeWidth="9" /><path d="M-14 -84 a22 22 0 1 0 30 6 a16 16 0 1 1 -30 -6Z" fill="#f3ecd8" />
      </g>
    </g>
  );
};
const Varaha = ({k, dig = 1}) => { const l = Math.sin(k / 2.6) * 20 * dig; return (
  <g>
    <path d="M-196 -20 q-40 -30 -30 -66 q20 -20 30 6 q-14 16 6 40Z" fill={VSD} />
    {[[-110, 0], [-60, 1], [110, 1], [160, 0]].map(([x, p], i) => <g key={i}><path d={`M${x} 80 L${x + (p ? l : -l)} 186`} stroke={i % 2 ? VSD : '#33598f'} strokeWidth="46" strokeLinecap="round" /><ellipse cx={x + (p ? l : -l)} cy="200" rx="26" ry="14" fill="#1c1a22" /></g>)}
    <path d="M-196 -10 C-196 -116 -60 -156 64 -134 C156 -118 214 -60 218 10 C214 84 120 122 0 122 C-112 122 -196 84 -196 -10Z" fill={VS} />
    <path d="M-196 0 C-170 70 -60 100 40 96 C130 92 200 60 218 10 C214 84 120 122 0 122 C-112 122 -196 84 -196 0Z" fill={VSD} opacity="0.7" />
    {[...Array(9)].map((_, i) => <path key={i} d={`M${-150 + i * 34} ${-126 - Math.sin(i / 8 * Math.PI) * 22} l14 -30 l12 30Z`} fill="#27456f" />)}
    <path d="M-60 -130 Q0 -60 -20 100" fill="none" stroke={GOLD} strokeWidth="9" opacity="0.9" />
    <path d="M150 -116 C244 -126 306 -76 336 -24 L396 6 C410 28 400 56 376 58 L304 62 C242 84 180 62 160 20Z" fill={VS} /><path d="M176 40 C240 66 300 60 376 58 L304 62 C242 84 180 62 160 20Z" fill={VSD} opacity="0.7" />
    <ellipse cx="390" cy="30" rx="20" ry="29" fill="#33598f" /><circle cx="392" cy="20" r="5" fill="#16243d" /><circle cx="392" cy="40" r="5" fill="#16243d" />
    <path d="M306 60 Q330 10 306 -22 Q340 2 334 58Z" fill="#fff8e6" /><path d="M270 64 Q288 26 272 2 Q298 20 294 64Z" fill="#e9dfc6" />
    <circle cx="262" cy="-54" r="13" fill="#fffaf0" /><circle cx="266" cy="-52" r="6.5" fill="#16121c" /><path d="M240 -78 L288 -66" stroke="#16243d" strokeWidth="7" strokeLinecap="round" />
    <path d="M176 -112 L196 -176 L232 -120Z" fill={VSD} /><g transform="translate(232 -128) rotate(22) scale(0.5)"><Crown /></g>
  </g>); };
const Garuda = ({k}) => { const f = Math.sin(k / 5); const W = (
  <g><path d="M0 0 C-80 -84 -230 -116 -360 -64 C-316 -42 -304 -20 -314 12 C-262 0 -240 22 -246 54 C-198 36 -166 54 -156 90 C-104 64 -40 52 0 44Z" fill="#c8452c" /><path d="M0 10 C-70 -40 -190 -70 -290 -44 C-250 -24 -240 0 -246 30 C-190 16 -160 40 -150 70 C-100 50 -40 40 0 36Z" fill="#e6a03a" /><path d="M-40 14 C-110 -20 -190 -30 -250 -18" fill="none" stroke="#9a3020" strokeWidth="5" /></g>);
  return (
    <g>
      <g transform={`translate(-40 0) scale(1 ${0.5 + 0.55 * f})`}>{W}</g><g transform={`translate(40 0) scale(-1 ${0.5 + 0.55 * f})`}>{W}</g>
      {[-30, -10, 10, 30].map((a, i) => <path key={i} transform={`rotate(${a} 0 60)`} d="M-18 80 L0 210 L18 80Z" fill={i % 2 ? '#c8452c' : '#e6a03a'} />)}
      <ellipse cx="0" cy="40" rx="66" ry="96" fill="#d99a2b" /><path d="M0 -56 C66 -56 66 136 0 136Z" fill="#b97a1c" opacity="0.6" />
      <circle cx="0" cy="-80" r="50" fill="#f3ecd8" /><path d="M0 -130 C50 -130 50 -30 0 -30Z" fill="#d9cfb6" opacity="0.7" /><path d="M-18 -78 L0 -24 L18 -78 Q0 -92 -18 -78Z" fill={GOLD} /><circle cx="-20" cy="-92" r="7" fill="#16121c" /><circle cx="20" cy="-92" r="7" fill="#16121c" />
      <g transform="translate(0 -122) scale(0.6)"><Crown /></g>
    </g>); };
const Hoods = ({k}) => (
  <g>{[-57, -38, -19, 0, 19, 38, 57].map((a, i) => <g key={i} transform={`rotate(${a + Math.sin(k / 30 + i) * 1.5} 0 80)`}><path d="M-50 80 C-76 -30 -54 -150 0 -204 C54 -150 76 -30 50 80Z" fill={i % 2 ? '#357a69' : '#3f8f7a'} /><path d="M-28 70 C-42 -20 -30 -110 0 -152 C30 -110 42 -20 28 70Z" fill="#bfe6a8" opacity="0.5" /><circle cx="-14" cy="-152" r="5" fill="#ffd27a" /><circle cx="14" cy="-152" r="5" fill="#ffd27a" /><path d="M0 -200 l0 -24 m0 0 l-7 -11 m7 11 l7 -11" stroke="#c0392b" strokeWidth="4" fill="none" /></g>)}</g>
);
const Coils = () => (
  <g>{[[150, 420], [84, 370], [20, 320]].map(([y, rx], i) => <g key={i}><ellipse cx="0" cy={y} rx={rx} ry="58" fill="#2f6e5e" /><ellipse cx="0" cy={y - 12} rx={rx} ry="50" fill="#3f8f7a" /><path d={`M${-rx * 0.86} ${y + 10} Q0 ${y + 52} ${rx * 0.86} ${y + 10}`} fill="none" stroke="#bfe6a8" strokeWidth="10" opacity="0.5" />{[...Array(9)].map((_, j) => <path key={j} d={`M${-rx * 0.8 + j * rx * 0.2} ${y - 20 + Math.abs(j - 4) * -3} q10 14 20 0`} fill="none" stroke="#2f6e5e" strokeWidth="4" />)}</g>)}</g>
);
const VishnuShesha = ({k, closed, eye, hands = 'bless', open = 0, worry = 0}) => <g><g transform="translate(0 -500) scale(1.3)"><Hoods k={k} /></g><Coils /><g transform="translate(0 -300) scale(0.84)"><Deity k={k} pose="sit" closed={closed} eye={eye} hands={hands} open={open} worry={worry} /></g></g>;
const VSt = ({x, base = 862, s = 0.78, lean = 0, o = 1, ...p}) => <g transform={`translate(${x} ${base}) rotate(${lean}) translate(0 ${-582 * s}) scale(${s})`} opacity={o}><Deity {...p} /></g>;
const BLo = ({x, base = 862, s = 0.8, lean = 0, o = 1, ...p}) => <g transform={`translate(${x} ${base}) rotate(${lean}) translate(0 ${-394 * s}) scale(${s})`} opacity={o}><g transform="translate(0 316)"><LotusSeat w={300} /></g><Brahma {...p} /></g>;
const ShivaAt = ({x, base = 866, s = 0.9, k, eye = 0.78, o = 1}) => <g transform={`translate(${x - 240 * s} ${base - 818 * s}) scale(${s})`} opacity={o}><Shiva k={k} eye={eye} /></g>;
const Orb = ({x, y, r, col = '#ffd27a', k}) => <g><circle cx={x} cy={y} r={r * 2.6} fill="url(#fglow)" opacity="0.8" /><circle cx={x} cy={y} r={r} fill={col} /><circle cx={x} cy={y} r={r * 0.55} fill="#fffbe8" />{[...Array(8)].map((_, i) => <path key={i} transform={`rotate(${i * 45 + k * 4} ${x} ${y})`} d={`M${x} ${y - r * 1.2} l${r * 0.14} ${-r * 0.5} l${r * 0.14} ${r * 0.5}Z`} fill={col} />)}</g>;
const Flames = ({x0, x1, base, h, k, n = 14, seed = 'f'}) => (
  <g>{[...Array(n)].map((_, i) => { const x = x0 + (x1 - x0) * (i + R(seed + i) * 0.8) / n, w = 40 + R(seed + 'w' + i) * 50, hh = h * (0.55 + 0.45 * Math.abs(Math.sin(k / 6 + i * 1.9))), sw = Math.sin(k / 5 + i) * 18;
    const fl = (W, Hh, S) => `M${x - W} ${base} C${x - W * 1.25} ${base - Hh * 0.45} ${x + S - W * 0.15} ${base - Hh * 0.62} ${x + S} ${base - Hh} C${x + S + W * 0.25} ${base - Hh * 0.6} ${x + W * 1.25} ${base - Hh * 0.4} ${x + W} ${base}Z`; return <g key={i}><path d={fl(w, hh, sw)} fill={i % 2 ? '#ff7a18' : '#ff9a2a'} /><path d={fl(w * 0.55, hh * 0.62, sw * 0.5)} fill="#ffd45a" /><path d={fl(w * 0.25, hh * 0.3, sw * 0.2)} fill="#fff6d8" /></g>; })}</g>
);
const Diya = ({x, y, s = 1, on = 1, k, i = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-30" r="120" fill="url(#fglow)" opacity={0.6 * on} />
    <path d="M-52 0 Q-48 34 0 38 Q48 34 52 0 L66 -6 Q40 6 0 6 Q-40 6 -52 0Z" fill="#9a5a30" /><path d="M0 6 Q40 6 66 -6 L52 0 Q48 34 0 38Z" fill="#7a4220" /><ellipse cx="0" cy="0" rx="52" ry="9" fill="#c98a4a" /><ellipse cx="0" cy="0" rx="42" ry="6" fill="#e6b548" opacity="0.8" />
    <g opacity={on}><path d={`M-13 -4 Q${Math.sin(k / 4 + i) * 6} ${-78 - 6 * Math.sin(k / 3 + i)} 13 -4 Q0 6 -13 -4Z`} fill="#ffb93a" /><path d={`M-6 -6 Q${Math.sin(k / 4 + i) * 3} -46 6 -6Z`} fill="#fff6d8" /></g>
  </g>
);
const Hill = ({x, base, w, h, c1 = '#8a3b2a', c2 = '#5e2520', o = 1}) => (
  <g opacity={o}>
    <path d={`M${x - w / 2} ${base} C${x - w * 0.34} ${base - h * 0.3} ${x - w * 0.2} ${base - h * 0.96} ${x - w * 0.04} ${base - h} C${x + w * 0.04} ${base - h * 1.02} ${x + w * 0.1} ${base - h * 0.78} ${x + w * 0.2} ${base - h * 0.7} C${x + w * 0.3} ${base - h * 0.62} ${x + w * 0.4} ${base - h * 0.2} ${x + w / 2} ${base}Z`} fill={c1} />
    <path d={`M${x - w * 0.04} ${base - h} C${x + w * 0.04} ${base - h * 1.02} ${x + w * 0.1} ${base - h * 0.78} ${x + w * 0.2} ${base - h * 0.7} C${x + w * 0.3} ${base - h * 0.62} ${x + w * 0.4} ${base - h * 0.2} ${x + w / 2} ${base} L${x + w * 0.06} ${base} C${x + w * 0.1} ${base - h * 0.4} ${x} ${base - h * 0.7} ${x - w * 0.04} ${base - h}Z`} fill={c2} opacity="0.75" />
    {[[-0.22, 0.5], [-0.1, 0.72], [0.14, 0.5], [0.26, 0.3], [-0.3, 0.2]].map(([fx, fy], i) => <path key={i} d={`M${x + w * fx} ${base - h * fy} q${w * 0.03} ${h * 0.12} ${-w * 0.01} ${h * 0.22}`} fill="none" stroke={c2} strokeWidth="6" opacity="0.6" strokeLinecap="round" />)}
  </g>
);
const Strata = ({y0 = 860, n = 12, off = 0, x0 = -900, w = 3800}) => { const H = 380, tot = n * H; const cols = ['#553a26', '#473020', '#3d2a20', '#35261f', '#2e2220', '#281f21', '#231c22', '#1f1a22'];
  return <g>{[...Array(n)].map((_, i) => { const y = y0 + ((((i * H - off) % tot) + tot) % tot); return (
    <g key={i}><rect x={x0} y={y} width={w} height={H + 2} fill={cols[i % cols.length]} /><path d={`M${x0} ${y} ${[...Array(20)].map((__, j) => `q${w / 80} ${j % 2 ? 14 : -14} ${w / 40} 0`).join(' ')}`} fill="none" stroke="#000" strokeWidth="8" opacity="0.25" />
      {[...Array(10)].map((__, j) => <ellipse key={j} cx={x0 + R(`rx${i}${j}`) * w} cy={y + 60 + R(`ry${i}${j}`) * 260} rx={30 + R(`rw${i}${j}`) * 60} ry={14 + R(`rh${i}${j}`) * 22} fill="#000" opacity="0.2" />)}
      {[...Array(4)].map((__, j) => { const gx = x0 + R(`gx${i}${j}`) * w, gy = y + 80 + R(`gy${i}${j}`) * 220; return <path key={j} d={`M${gx} ${gy - 14} l11 14 l-11 14 l-11 -14Z`} fill={['#6fd3c0', '#e6b548', '#d77ad0', '#7aa8f0'][j]} opacity="0.75" />; })}
    </g>); })}</g>; };
const Field = ({k, z = 1, fx = 960, fy = 540, pil = 1, px = 960, pw = 240, glow = 1, shake = 0, children, over, tint = '#ff8a24'}) => (
  <AbsoluteFill style={{background: '#070b1f'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs />
      <rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} n={70} />
      <g transform={`translate(${Math.sin(k * 1.7) * 9 * shake} ${Math.cos(k * 2.3) * 7 * shake})`}>
        <Cam z={z} fx={fx} fy={fy}>
          <path d="M-900 860 L-900 800 Q-400 740 100 790 Q560 730 960 780 Q1400 730 1820 790 Q2300 750 2800 800 L2800 860Z" fill="#141a3a" />
          {pil > 0 && <FirePillar x={px} w={pw} k={k} y0={900 - 3600 * pil} y1={900} />}
          <rect x="-900" y="860" width="3700" height="900" fill="#0f0d1e" /><rect x="-900" y="860" width="3700" height="6" fill="#2a2440" />
          {pil > 0 && <ellipse cx={px} cy="884" rx="560" ry="48" fill="#ff8a24" opacity={0.32 * glow * Math.min(1, pil * 3)} />}
          {children}
        </Cam>
      </g>
      <rect width="1920" height="1080" fill={tint} opacity={pil > 0 ? 0.06 * glow : 0} />
      {over}
    </svg>
    <Dust k={k} n={22} /><Vig s={0.84} cy={48} /><Foot />
  </AbsoluteFill>
);
const OceanBg = ({k, children, z = 1, fx = 960, fy = 540, over}) => (
  <AbsoluteFill style={{background: '#06101f'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><defs><linearGradient id="cos2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1630" /><stop offset="0.6" stopColor="#1a3f6a" /><stop offset="1" stopColor="#2a7a8a" /></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#cos2)" /><Stars k={k} n={70} />
      <Cam z={z} fx={fx} fy={fy}>
        <circle cx="960" cy="420" r="640" fill="url(#fglow)" opacity="0.14" />
        {[...Array(3)].map((_, i) => <path key={i} d={`M-700 ${800 + i * 40} ${[...Array(18)].map((__, j) => `Q${-700 + j * 190 + 95 + Math.sin(k / 30 + i) * 30} ${770 + i * 40 + (j % 2 ? 22 : -22)} ${-700 + j * 190 + 190} ${800 + i * 40}`).join(' ')} L2800 1500 L-700 1500Z`} fill={['#2a6f86', '#235f78', '#1d516a'][i]} />)}
        {children}
        {[...Array(4)].map((_, i) => <path key={i} d={`M-700 ${920 + i * 44} ${[...Array(18)].map((__, j) => `Q${-700 + j * 190 + 95 - Math.sin(k / 26 + i) * 30} ${892 + i * 44 + (j % 2 ? 22 : -22)} ${-700 + j * 190 + 190} ${920 + i * 44}`).join(' ')} L2800 1500 L-700 1500Z`} fill={['#18465e', '#143c52', '#103246', '#0c283a'][i]} />)}
      </Cam>
      {over}
    </svg>
    <Dust k={k} n={26} /><Vig s={0.82} cy={46} /><Foot />
  </AbsoluteFill>
);

/* ============================================================ scenes 9-12 : the ocean */
const S9 = ({t, k, T, a, b}) => { const z = lin(t, a, b, 1.0, 1.08); const bx = 1420 + (1 - cl(t, T[1] - 0.6, T[1] + 1.4)) * 900;
  return <OceanBg k={k} z={z} fx={900} fy={520}><g transform="translate(600 800)"><VishnuShesha k={k} closed={1} /></g>{[0, 1, 2].map((i) => <text key={i} x={770 + i * 34} y={250 - i * 44 - ((k / 3 + i * 20) % 30)} fontSize={34 + i * 12} fontFamily="Cinzel" fill="#dbe8ff" opacity={0.5 - i * 0.1}>z</text>)}<BLo x={bx} base={900} s={0.72} k={k} /></OceanBg>; };
const S10 = ({t, k, T, a, b}) => { const z = lin(t, a, b, 1.3, 1.42);
  return <OceanBg k={k} z={z} fx={1180} fy={500}><g transform="translate(600 800)"><VishnuShesha k={k} closed={1} /></g><BLo x={1420} base={900} s={0.72} k={k} eye={0.9} />
    {T.map((tt, i) => { const p = lin(t, tt, tt + 0.9); return p > 0 && p < 1 ? <path key={i} d={`M${1180 - p * 160} 400 q-30 60 0 120`} fill="none" stroke={GOLD} strokeWidth={8 * (1 - p)} strokeLinecap="round" opacity={1 - p} /> : null; })}</OceanBg>; };
const S11 = ({t, k, T, a, b}) => { const wide = cl(t, T[4] - 0.8, T[4] + 0.8); const z = 1.4 - 0.4 * wide, fx = 640 + 320 * wide, fy = 470 + 60 * wide; const grow = cl(t, T[5] + 0.6, T[5] + 2.8);
  return <OceanBg k={k} z={z} fx={fx} fy={fy}><g transform="translate(600 800)"><VishnuShesha k={k} closed={t < T[0] + 0.5 ? 1 : 0} eye={0.4 * cl(t, T[1], T[1] + 0.5) * (1 - cl(t, T[2], T[2] + 0.5))} /></g>
    <path d="M600 640 C700 240 1300 200 1420 800" fill="none" stroke="#4f9a6a" strokeWidth="14" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - grow} />
    <path d="M600 640 C700 240 1300 200 1420 800" fill="none" stroke="#bfe6a8" strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - grow} opacity="0.7" />
    <circle cx="1420" cy="560" r={420 * grow} fill="url(#fglow)" opacity={0.5 * grow} /><BLo x={1420} base={900} s={0.72} k={k} eye={0.5} o={0.55 + 0.45 * wide} /></OceanBg>; };
const S12 = ({t, k, T, a, b}) => { const vOn = cl(t, T[1] - 0.2, T[1] + 0.2), bOn = 1 - vOn * (1 - cl(t, T[3], T[3] + 0.5)); const both = cl(t, T[3], T[3] + 0.5); const crack = cl(t, T[5], T[5] + 0.5); const z = lin(t, a, b, 1, 1.06);
  return (
    <AbsoluteFill style={{background: '#08060c'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs /><defs><linearGradient id="lh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d2148" /><stop offset="1" stopColor="#1f4a86" /></linearGradient><linearGradient id="rh" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a1420" /><stop offset="1" stopColor="#8a3b3a" /></linearGradient></defs>
        <rect width="960" height="1080" fill="url(#lh)" /><rect x="960" width="960" height="1080" fill="url(#rh)" />
        <circle cx="480" cy="480" r="520" fill="url(#fglow)" opacity="0.18" /><circle cx="1440" cy="480" r="520" fill="url(#fglow)" opacity="0.18" />
        <g transform={`translate(${470 - crack * 26} 600) scale(${2.9 * z})`}><path d="M-110 190 C-90 110 90 110 110 190 L130 260 L-130 260Z" fill={VSD} /><VFace eye={0.5 + 0.5 * both} /></g>
        <g transform={`translate(${1450 + crack * 26} 600) scale(${2.9 * z})`}><path d="M-110 190 C-90 110 90 110 110 190 L130 260 L-130 260Z" fill="#c9925e" /><g transform="translate(-74 2)"><SideHead dir={1} /></g><g transform="translate(74 2)"><SideHead dir={-1} /></g><Face eye={0.5 + 0.5 * both} /></g>
        <rect width="960" height="1080" fill="#05040c" opacity={0.55 * (1 - Math.max(vOn, both))} /><rect x="960" width="960" height="1080" fill="#05040c" opacity={0.55 * (1 - Math.max(bOn, both)) * (vOn > 0 ? 1 : 0)} />
        <rect x="952" width="16" height="1080" fill="#05040c" />
        <path d="M960 -20 L930 180 L990 300 L920 470 L1000 610 L940 760 L980 900 L950 1100" fill="none" stroke="#ffd98a" strokeWidth={12 * crack} strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - crack} />
        <path d="M960 -20 L930 180 L990 300 L920 470 L1000 610 L940 760 L980 900 L950 1100" fill="none" stroke="#fffbe8" strokeWidth={5 * crack} strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - crack} />
        <rect width="1920" height="1080" fill="#fff3d0" opacity={0.25 * pulse(t, T[5] + 0.3, 0.3)} />
      </svg>
      <Vig s={0.8} cy={46} /><Foot />
    </AbsoluteFill>); };

/* ============================================================ 13 : war */
const S13 = ({t, k, T, a, b}) => { const vin = cl(t, T[1] - 0.4, T[1] + 1.0), bin = cl(t, T[2] - 0.6, T[2] + 0.8); const arr = cl(t, T[3], T[3] + 0.3) * (1 - cl(t, T[5], T[5] + 1)); const orb = cl(t, T[4], T[4] + 2.4); const fire = cl(t, T[5], T[6] + 1.5); const sh = 0.4 * arr + 0.8 * fire;
  return (
    <AbsoluteFill style={{background: '#12060a'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs /><defs><linearGradient id="war" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#170a1c" /><stop offset="0.6" stopColor="#5a1c26" /><stop offset="1" stopColor="#b8482a" /></linearGradient></defs>
        <rect width="1920" height="1080" fill="url(#war)" /><Stars k={k} n={40} />
        <g transform={`translate(${Math.sin(k * 1.7) * 8 * sh} ${Math.cos(k * 2.3) * 6 * sh})`}>
          {[...Array(7)].map((_, i) => <Cloud key={i} x={R(`wx${i}`) * 2200 - 100 + k * 0.4} y={160 + R(`wy${i}`) * 520} s={0.9 + R(`wz${i}`)} o={0.25} col="#3a1622" />)}
          <path d="M-20 1080 L-20 900 Q200 850 420 890 Q700 840 960 880 Q1240 840 1500 890 Q1740 850 1940 900 L1940 1080Z" fill="#1c0a12" />
          {[150, 520, 1300, 1700].map((x, i) => <path key={i} d={`M${x - 26} 900 L${x - 26} 840 Q${x} 790 ${x + 26} 840 L${x + 26} 900Z`} fill="#1c0a12" />)}
          <g transform={`translate(${460 - (1 - vin) * 900} ${470 + Math.sin(k / 14) * 16})`}><g transform="scale(0.95)"><Garuda k={k} /></g><g transform="translate(0 -330) scale(0.42)"><Deity k={k} eye={0.8} /></g></g>
          <g transform={`translate(${1460 + (1 - bin) * 900} ${520 + Math.sin(k / 13 + 2) * 16})`}><g transform="scale(-1.25 1.25)"><Swan ph={k / 4.2} crown={false} /></g><g transform="translate(-10 -226) scale(0.4)"><Brahma k={k} eye={0.9} /></g></g>
          {arr > 0 && [...Array(18)].map((_, i) => { const dir = i % 2 ? 1 : -1; const p = ((k * (16 + R(`as${i}`) * 10) + R(`ap${i}`) * 1400) % 1100) / 1100; const x = dir > 0 ? 560 + p * 800 : 1360 - p * 800, y = 260 + R(`ay${i}`) * 380 + Math.sin(p * Math.PI) * -60; return <g key={i} opacity={arr * Math.sin(p * Math.PI)} transform={`translate(${x} ${y}) scale(${dir} 1)`}><path d="M-46 0 H30" stroke="#f3ecd8" strokeWidth="5" /><path d="M30 -9 L52 0 L30 9Z" fill={GOLD} /><path d="M-46 0 l-14 -9 M-46 0 l-14 9" stroke="#c0392b" strokeWidth="4" /></g>; })}
          {orb > 0 && <g><Orb x={760} y={230} r={24 + 60 * orb} k={k} col="#7ad0ff" /><Orb x={1160} y={230} r={24 + 60 * orb} k={k} col="#ffb03a" /></g>}
          {fire > 0 && <g opacity={Math.min(1, fire * 2)}><Flames x0={-40} x1={1960} base={1090} h={120 + 420 * fire} k={k} n={18} /><Flames x0={-40} x1={1960} base={1090} h={60 + 240 * fire} k={k + 40} n={14} seed="g" /></g>}
        </g>
        <rect width="1920" height="1080" fill="#ff5a18" opacity={0.22 * fire} />
      </svg>
      <Vig s={0.84} cy={46} /><Foot />
    </AbsoluteFill>); };

/* ============================================================ 14-15 : Kailasa */
const Kailasa = ({k, z = 1, fx = 960, fy = 540, children}) => (
  <AbsoluteFill style={{background: '#0a1024'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><defs><linearGradient id="ksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c1230" /><stop offset="0.7" stopColor="#3a4a86" /><stop offset="1" stopColor="#8a8fc0" /></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#ksky)" /><Stars k={k} n={80} />
      <Cam z={z} fx={fx} fy={fy}>
        <circle cx="420" cy="230" r="70" fill="#f4f0dc" /><circle cx="420" cy="230" r="260" fill="url(#fglow)" opacity="0.35" />
        {[[200, 520, 620], [760, 420, 760], [1500, 500, 700], [1900, 560, 520]].map(([x, top, w], i) => <g key={i}><path d={`M${x - w} 870 L${x} ${top} L${x + w} 870Z`} fill="#56609a" /><path d={`M${x} ${top} L${x + w} 870 L${x + w * 0.15} 870Z`} fill="#3d467c" /><path d={`M${x - w * 0.3} ${top + (870 - top) * 0.3} L${x} ${top} L${x + w * 0.3} ${top + (870 - top) * 0.3} L${x + w * 0.14} ${top + (870 - top) * 0.24} L${x} ${top + (870 - top) * 0.36} L${x - w * 0.14} ${top + (870 - top) * 0.24}Z`} fill="#eef2ff" /></g>)}
        <path d="M-600 870 Q200 820 960 860 Q1700 820 2500 870 L2500 1500 L-600 1500Z" fill="#cfd6f0" /><path d="M-600 930 Q400 890 1100 930 Q1800 900 2500 940 L2500 1500 L-600 1500Z" fill="#aab4de" />
        <ellipse cx="1340" cy="880" rx="330" ry="40" fill="#8a94c4" />
        {children}
        {[...Array(50)].map((_, i) => <circle key={i} cx={(R(`sx${i}`) * 2400 - 240 + k * (0.6 + R(`sv${i}`))) % 2400 - 240} cy={(R(`sy${i}`) * 1100 + k * (1.5 + R(`sw${i}`) * 1.5)) % 1100} r={2 + R(`sr${i}`) * 3} fill="#fff" opacity="0.6" />)}
      </Cam>
    </svg>
    <Vig s={0.8} cy={46} /><Foot />
  </AbsoluteFill>
);
const DEVAS = [['#f0c08a', '#c9925e', '#c8452c', '#8a2518'], ['#e2a070', '#b9764a', '#2e8b6a', '#1c5e46'], ['#f4d0a0', '#c9a06e', '#7a4ab0', '#52307c'], ['#e9b98a', '#c08a5a', '#e98a2c', '#b0601a']];
const S14 = ({t, k, T, a, b}) => { const run = cl(t, T[1] - 0.2, T[1] + 2.2); const z = lin(t, a, b, 1, 1.06);
  return <Kailasa k={k} z={z} fx={980}><ShivaAt x={1340} base={880} s={0.8} k={k} eye={0.5} />
    {DEVAS.map(([sk, skd, c1, c2], i) => { const x = 330 + i * 190 - (1 - run) * (1200 + i * 120); const tr = Math.sin(k * 0.9 + i) * 3 * (run < 1 ? 0.3 : 1); const kneel = cl(t, T[1] + 1.6 + i * 0.12, T[1] + 2.6 + i * 0.12);
      return <g key={i} transform={`translate(${x + tr} ${930 + (i % 2) * 34}) rotate(${kneel * 16})`}><g transform={`translate(0 ${-340 * 0.62}) scale(0.62)`}><Deity k={k} pose="sit" hands="fold" items={false} sk={sk} skd={skd} c1={c1} c2={c2} crown="pts" halo={false} garland={false} bow={kneel * 10} ph={i} eye={0.3} /></g></g>; })}</Kailasa>; };
const S15 = ({t, k, T, a, b}) => { const go = cl(t, T[1] + 0.2, b); const z = 1.36 - 0.2 * go;
  return <Kailasa k={k} z={z} fx={1200 + go * 260} fy={500}><circle cx={1340 + go * 620} cy="460" r="430" fill="url(#fglow)" opacity="0.45" /><ShivaAt x={1340 + go * 620} base={880} s={0.8} k={k} eye={0.78} />
    {DEVAS.map(([sk, skd, c1, c2], i) => <g key={i} transform={`translate(${330 + i * 190} ${930 + (i % 2) * 34}) rotate(${16 - 10 * cl(t, T[0] + 1, T[0] + 2.5)})`}><g transform={`translate(0 ${-340 * 0.62}) scale(0.62)`}><Deity k={k} pose="sit" hands="fold" items={false} sk={sk} skd={skd} c1={c1} c2={c2} crown="pts" halo={false} garland={false} bow={4} ph={i} /></g></g>)}</Kailasa>; };

/* ============================================================ 16-18 : the pillar appears */
const S16 = ({t, k, T, a, b}) => { const rise = cl(t, T[1] + 2.0, T[1] + 3.6); const pre = cl(t, T[1] + 0.9, T[1] + 2.0); const z = 1.08 - 0.3 * cl(t, T[2] - 0.3, T[3] + 1); const orb = 1 - 0.4 * rise;
  return <Field k={k} z={z} fy={540 - 120 * (1.08 - z)} pil={rise} glow={rise} shake={pre * (1 - cl(t, T[1] + 3.6, T[1] + 4.4))}
    over={<rect width="1920" height="1080" fill="#fff3d0" opacity={0.5 * pulse(t, T[1] + 2.2, 0.5)} />}>
    <ellipse cx="960" cy="870" rx={260 * pre} ry={22 * pre} fill="#ffb03a" opacity={0.8 * pre * (1 - rise)} />
    <VSt x={380} k={k} eye={0.9} /><BLo x={1540} k={k} eye={0.9} />
    <Orb x={470} y={200} r={54 * orb} k={k} col="#7ad0ff" /><Orb x={1450} y={220} r={54 * orb} k={k} col="#ffb03a" /></Field>; };
const S17 = ({t, k, T, a, b}) => { const down = cl(t, T[0] - 0.2, T[1] - 0.6), up = cl(t, T[1] - 0.2, b - 0.3); const fy = 600 + 2700 * down - 5600 * up;
  return (
    <AbsoluteFill style={{background: '#070b1f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs /><rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} n={90} dy={-fy * 0.1 + 400} />
        <Cam z={0.86} fx={960} fy={fy}>
          {[...Array(18)].map((_, i) => <Cloud key={i} x={R(`qx${i}`) * 2600 - 300} y={600 - i * 190} s={0.8 + R(`qz${i}`)} o={0.22} />)}
          {[-700, -1500, -2300].map((y, i) => <g key={i} transform={`translate(${i % 2 ? 1460 : 420} ${y})`}><ellipse cx="0" cy="40" rx="330" ry="46" fill="#b9c6ea" opacity="0.5" />{[-150, 0, 150].map((dx, j) => <g key={j}><rect x={dx - 40} y={-70 + Math.abs(j - 1) * 30} width="80" height={110 - Math.abs(j - 1) * 30} fill={GOLDD} /><path d={`M${dx - 46} ${-70 + Math.abs(j - 1) * 30} Q${dx} ${-170 + Math.abs(j - 1) * 30} ${dx + 46} ${-70 + Math.abs(j - 1) * 30}Z`} fill={GOLD} /></g>)}<circle cx="0" cy="-40" r="300" fill="url(#fglow)" opacity="0.25" /></g>)}
          <path d="M-900 860 L-900 800 Q-400 740 100 790 Q560 730 960 780 Q1400 730 1820 790 Q2300 750 2800 800 L2800 860Z" fill="#141a3a" />
          <Strata y0={860} n={10} />
          {[1500, 2300, 3100].map((y, i) => <g key={i} transform={`translate(${i % 2 ? 420 : 1480} ${y})`}><ellipse cx="0" cy="10" rx="340" ry="150" fill="#100c18" />{[-170, -60, 60, 170].map((dx, j) => <path key={j} d={`M${dx - 34} 110 L${dx - 34} ${20 - (j % 2) * 40} L${dx} ${-30 - (j % 2) * 40} L${dx + 34} ${20 - (j % 2) * 40} L${dx + 34} 110Z`} fill={['#4d3a75', '#2e6a66', '#6a3a55'][i]} />)}{[-170, -60, 60, 170].map((dx, j) => <rect key={j} x={dx - 6} y="50" width="12" height="18" fill="#ffd27a" opacity="0.8" />)}</g>)}
          <FirePillar x={960} w={230} k={k} y0={-5600} y1={4600} />
          <rect x="-900" y="856" width="3700" height="8" fill="#2a2440" />
        </Cam>
        <rect width="1920" height="1080" fill="#ff8a24" opacity="0.06" />
      </svg>
      <Vig s={0.84} cy={48} /><Foot />
    </AbsoluteFill>); };
const Chev = ({x, y, dir, k, o}) => <g opacity={o}>{[0, 1, 2].map((i) => { const p = ((k / 26 + i / 3) % 1); return <path key={i} d={`M${x - 34} ${y + dir * (p * 150 - 20)} l34 ${dir * 30} l34 ${-dir * 30}`} fill="none" stroke={GOLD} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={Math.sin(p * Math.PI)} />; })}</g>;
const S18 = ({t, k, T, a, b}) => { const fly = cl(t, T[0] + 0.2, T[0] + 1.6); const gone = cl(t, T[1] - 0.2, T[1] + 0.5); const look = cl(t, T[4], T[4] + 1) - cl(t, T[7], T[7] + 0.8); const z = 1 + 0.08 * cl(t, T[3], T[3] + 1);
  return <Field k={k} z={z} fy={540 - 180 * Math.max(0, look) + 0}>
    <VSt x={380} k={k} eye={0.3} hands={t > T[2] ? 'down' : 'bless'} /><BLo x={1540} k={k} eye={0.2} />
    <Orb x={470 + fly * 440} y={200 + fly * 180} r={54 * (1 - gone)} k={k} col="#7ad0ff" /><Orb x={1450 - fly * 440} y={220 + fly * 160} r={54 * (1 - gone)} k={k} col="#ffb03a" />
    <circle cx="960" cy="380" r={300 * pulse(t, T[1] + 0.2, 0.6)} fill="url(#fglow)" />
    <Chev x={380} y={930} dir={1} k={k} o={cl(t, T[10], T[10] + 0.4)} /><Chev x={1540} y={150} dir={-1} k={k} o={cl(t, T[11], T[11] + 0.4)} /></Field>; };

/* ============================================================ 19-21 : down and up */
const Under = ({k, off, px = 1420, dark = 0, children, top = 0}) => (
  <AbsoluteFill style={{background: '#1f1a22'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs />
      <g transform={`translate(0 ${top})`}><Strata y0={-380} n={8} off={off} x0={-100} w={2120} /></g>
      <FirePillar x={px} w={230} k={k} y0={-300} y1={1400} /><rect width="1920" height="1080" fill="#ff8a24" opacity="0.07" />
      {children}
      <rect width="1920" height="1080" fill="#05040a" opacity={dark} />
    </svg>
    <Vig s={0.88} cy={48} /><Foot />
  </AbsoluteFill>
);
const Dirt = ({x, y, k, n = 16, dig = 1}) => <g opacity={dig}>{[...Array(n)].map((_, i) => { const p = ((k * (1.2 + R(`dv${i}`)) + R(`dp${i}`) * 40) % 40) / 40; const ang = -2.4 + R(`da${i}`) * 1.6; return <circle key={i} cx={x + Math.cos(ang) * p * 300} cy={y + Math.sin(ang) * p * 260 + p * p * 120} r={5 + R(`dr${i}`) * 9} fill={i % 2 ? '#6a4a30' : '#3d2a20'} opacity={1 - p} />; })}</g>;
const S19 = ({t, k, T, a, b}) => { const morph = cl(t, T[0] + 0.6, T[0] + 1.5); const dig = cl(t, T[1] - 0.2, T[1] + 0.8); const off = Math.max(0, t - T[1]) * 300 * dig; const top = (1 - dig) * 420;
  return <Under k={k} off={off} top={top} dark={0.3 * cl(t, T[4], b)}>
    <g transform={`translate(0 ${top})`}><rect x="-100" y="-900" width="2120" height="520" fill="#0f1430" opacity={1 - dig} /></g>
    {morph < 1 && <g opacity={1 - morph}><VSt x={760} base={top + 30} s={0.6} k={k} /></g>}
    <circle cx="760" cy={500} r={360 * pulse(t, T[0] + 1.0, 0.7)} fill="url(#fglow)" />
    <g opacity={morph} transform={`translate(760 ${top * 0.4 + 470 + Math.sin(k / 3) * 6 * dig}) rotate(${20 + 38 * dig}) scale(0.92)`}><Varaha k={k} dig={0.3 + 0.7 * dig} /></g>
    <Dirt x={900} y={720} k={k} dig={dig} /></Under>; };
const S21 = ({t, k, T, a, b}) => { const slow = 1 - cl(t, T[0] + 0.5, T[1] + 1.2); const turn = cl(t, T[2] + 0.3, T[2] + 1.8); const off = 5000 + (t - a) * 300 * slow * 0.6 + (slow === 0 ? 0 : 0) - turn * (t - T[2]) * 160;
  return <Under k={k} off={off} dark={0.34 - 0.14 * turn}>
    <g transform={`translate(${760 - turn * 60} ${500 + Math.sin(k / 3) * 5 * slow - turn * 60}) rotate(${58 - 200 * turn}) scale(${0.92} ${turn > 0.5 ? -0.92 : 0.92})`}><Varaha k={k} dig={0.15 + 0.85 * slow + 0.5 * turn} /></g>
    <Dirt x={900} y={740} k={k} dig={slow} />
    {[0, 1, 2].map((i) => <path key={i} d={`M${640 + i * 30} ${330 - i * 20} q-10 20 0 30 q10 -10 0 -30Z`} fill="#9fd0ff" opacity={(1 - slow) * (1 - turn) * (0.5 + 0.5 * Math.sin(k / 6 + i))} />)}</Under>; };
const SkySet = ({k, climb = 0, px = 1560, pw = 260, z = 1, fx = 960, fy = 540, light = 0, dark = 0, children, over}) => (
  <AbsoluteFill style={{background: '#070b1f'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><rect width="1920" height="1080" fill="url(#nsky)" /><rect width="1920" height="1080" fill="#6fa0e0" opacity={light} /><g opacity={1 - light}><Stars k={k} dy={climb * 0.1} /></g>
      {over}
      <Cam z={z} fx={fx} fy={fy}>
        {[...Array(10)].map((_, i) => <Cloud key={i} x={R(`fx${i}`) * 2400 - 240} y={(((R(`fy${i}`) * 1700 + climb * (0.5 + R(`fs${i}`) * 0.6)) % 1700) + 1700) % 1700 - 300} s={0.8 + R(`fz${i}`)} o={0.16 + R(`fo${i}`) * 0.16 + light * 0.3} col={light > 0.4 ? '#eef2ff' : '#8fa0cf'} />)}
        <FirePillar x={px} w={pw} k={k} y0={-500} y1={1600} />
        {children}
      </Cam>
      <rect width="1920" height="1080" fill="#ff8a24" opacity="0.08" /><rect width="1920" height="1080" fill="#05040c" opacity={dark} />
    </svg>
    <Vig s={0.84} cy={48} /><Foot />
  </AbsoluteFill>
);
const S20 = ({t, k, T, a, b}) => { const yrs = Math.max(0, t - T[2]); const cyc = yrs * 1.1; const day = t > T[2] ? 0.5 - 0.5 * Math.cos(cyc * Math.PI * 2) : 0; const ang = (cyc % 1) * Math.PI; const morph = cl(t, T[0] + 0.5, T[0] + 1.4);
  return <SkySet k={k} climb={k * 9} light={day * 0.75} over={t > T[2] ? <g><circle cx={200 + (1 - Math.cos(ang)) * 760} cy={760 - Math.sin(ang) * 560} r="60" fill={Math.floor(cyc * 2) % 2 ? '#f4f0dc' : '#ffd86a'} /><circle cx={200 + (1 - Math.cos(ang)) * 760} cy={760 - Math.sin(ang) * 560} r="200" fill="url(#fglow)" opacity="0.5" /></g> : null}>
    <circle cx="700" cy="540" r={380 * pulse(t, T[0] + 0.9, 0.7)} fill="url(#fglow)" />
    {morph < 1 && <g opacity={1 - morph}><BLo x={700} base={760} s={0.6} k={k} /></g>}
    <g opacity={morph} transform={`translate(${700 + Math.sin(t * 0.9) * 14} ${560 + Math.sin(t * 1.7) * 10}) rotate(-36) scale(0.92)`}><Swan ph={t * 2.1 * Math.PI * 2} /></g></SkySet>; };
const S22 = ({t, k, T, a, b}) => { const fin = cl(t, T[1] - 0.6, T[1] + 1.6); const fy = -200 + 700 * fin + Math.sin(t * 1.3) * 16, fx = 1040 + Math.sin(t * 1.1) * 30; const fs = Math.max(pulse(t, (T[3] + T[4]) / 2, (T[4] - T[3]) / 2 + 0.6), pulse(t, T[4] + 1, 1.2)); const z = 1 + 0.16 * cl(t, T[2], T[2] + 1.5);
  return <SkySet k={k} climb={k * 1.6} px={1640} pw={280} z={z}>
    <g transform={`translate(560 ${640 + Math.sin(t * 1.5) * 12 + 30}) rotate(-10) scale(1.05)`}><Swan ph={t * 1.0 * Math.PI * 2} look={-10 + 14 * pulse(t, T[2] + 0.6, 1.2)} /></g>
    <circle cx={fx} cy={fy} r={190 + 60 * fs + 12 * Math.sin(k / 5) * fs} fill="url(#fglow)" opacity={0.35 + 0.5 * fs} />
    <g transform={`translate(${fx} ${fy}) rotate(${168 + Math.sin(t * 1.4) * 10 + fs * Math.sin(k / 3) * 3}) scale(${1 + 0.08 * fs})`}><Ketaki k={k} /></g></SkySet>; };
const BrahmaClose = ({k, z = 1, dark = 0, eye = 0, flower = 1, children}) => (
  <AbsoluteFill style={{background: '#070b1f'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} n={60} /><FirePillar x={1800} w={300} k={k} y0={-200} y1={1300} />
      <Cam z={z}>
        <circle cx="640" cy="470" r="520" fill="url(#fglow)" opacity="0.2" />
        <g transform="translate(640 520) scale(3.1)"><path d="M-78 150 C-70 100 70 100 78 150 L96 220 L-96 220Z" fill="#c9925e" /><g transform="translate(-74 2)"><SideHead dir={1} /></g><g transform="translate(74 2)"><SideHead dir={-1} /></g><Face blink={(k % 120) < 5 ? 1 : 0} eye={eye} />
          <g fill="#0a0d24" opacity={0.12 + 0.5 * dark}><path d="M0 -56.5 C-31 -56.5 -62 -41 -62 -10 C-62 40 -38 72 0 76Z" /><path d="M-60 18 C-62 80 -34 128 0 138 L0 76 C-38 72 -56 44 -60 18Z" /></g></g>
        {flower > 0 && <g opacity={flower}><circle cx="1270" cy="560" r={230 + 14 * Math.sin(k / 9)} fill="url(#fglow)" opacity={0.5 - 0.25 * dark} /><g transform={`translate(1270 ${640 + Math.sin(k / 21) * 14}) rotate(${Math.sin(k / 27) * 7}) scale(1.75)`}><Ketaki k={k} /></g></g>}
        {children}
      </Cam>
      <rect width="1920" height="1080" fill="#ff7a18" opacity="0.09" /><rect width="1920" height="1080" fill="#05040c" opacity={0.42 * dark} />
    </svg>
    <Vig s={0.86 + 0.1 * dark} cy={48} /><Foot />
  </AbsoluteFill>
);
const S23 = ({t, k, T, a, b}) => { const dark = cl(t, T[2], T[2] + 1.2); const th = cl(t, T[3] + 0.6, T[3] + 1.6);
  return <BrahmaClose k={k} z={lin(t, a, b, 1, 1.08)} dark={dark} eye={cl(t, T[2], T[2] + 0.8)} flower={1 - th}>
    <g opacity={th}>{[[1010, 640, 16], [1070, 590, 24], [1140, 540, 34]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#dfe6ff" opacity="0.5" />)}<ellipse cx="1340" cy="400" rx="330" ry="270" fill="#dfe6ff" opacity="0.16" /><ellipse cx="1340" cy="400" rx="330" ry="270" fill="none" stroke="#dfe6ff" strokeWidth="5" opacity="0.5" />
      <circle cx="1340" cy="380" r="230" fill="url(#fglow)" opacity="0.6" /><g transform="translate(1340 330) scale(0.5)"><Deity k={k} /></g><g transform="translate(1340 600)">{[-120, -60, 0, 60, 120].map((x, i) => <g key={i} transform={`translate(${x} ${Math.abs(i - 2) * -8})`}><path d="M-12 0 Q0 -30 12 0 Q0 8 -12 0Z" fill={i % 2 ? '#e98aa6' : '#ffd27a'} /></g>)}</g></g></BrahmaClose>; };
const S24 = ({t, k, T, a, b}) => { const yes = cl(t, T[4], T[4] + 0.6); const near = cl(t, T[1], T[1] + 1.5);
  return <SkySet k={k} climb={-k * 4 * near} px={1640} pw={280} z={lin(t, a, b, 1.05, 1.15)}>
    <g transform={`translate(600 ${560 + Math.sin(t * 1.5) * 12}) rotate(${-10 + 22 * near}) scale(1.05)`}><Swan ph={t * 1.3 * Math.PI * 2} look={-4} /></g>
    <circle cx={1060 - near * 60} cy={470} r={190 + 80 * yes + 14 * Math.sin(k / 5)} fill="url(#fglow)" opacity={0.35 + 0.5 * yes} />
    <g transform={`translate(${1060 - near * 60} ${470 + Math.sin(t * 1.3) * 14}) rotate(${168 + Math.sin(t * 1.4) * 8 + 14 * pulse(t, T[4] + 0.5, 0.4)}) scale(${1 + 0.1 * yes})`}><Ketaki k={k} /></g></SkySet>; };

/* ============================================================ 25-27 : the lie */
const FlowerAt = ({x, y, k, g = 0, s = 0.8, o = 1}) => <g opacity={o}><circle cx={x} cy={y - 40} r={130 + 70 * g} fill="url(#fglow)" opacity={0.3 + 0.5 * g} /><g transform={`translate(${x} ${y + Math.sin(k / 20) * 10}) rotate(${172 + Math.sin(k / 26) * 8}) scale(${s * (1 + 0.1 * g)})`}><Ketaki k={k} /></g></g>;
const S25 = ({t, k, T, a, b}) => { const come = cl(t, T[0] - 0.2, T[0] + 2.2); const pv = cl(t, T[1] - 0.3, T[1] + 1.0);
  return <Field k={k} z={1 + 0.3 * pv} fx={960 - 330 * pv} fy={540 - 40 * pv}>
    <VSt x={420} k={k} hands="down" bow={6} eye={0} /><BLo x={1500} base={862 - (1 - come) * 1100} k={k} eye={0.6} /><FlowerAt x={1250} y={470 - (1 - come) * 1100} k={k} /></Field>; };
const S26 = ({t, k, T, a, b}) => { const yes = Math.max(pulse(t, T[4] + 0.6, 0.9), pulse(t, T[5] + 0.3, 0.6));
  return <Field k={k} z={lin(t, a, b, 1.28, 1.36)} fx={1330} fy={480}>
    <VSt x={420} k={k} hands="down" bow={6} /><BLo x={1500} k={k} eye={0.8} bow={-7} /><FlowerAt x={1210} y={470} k={k} g={yes} />
    {[T[1], T[2], T[3]].map((tt, i) => { const p = lin(t, tt, tt + 0.9); return p > 0 && p < 1 ? <path key={i} d={`M${1290 - p * 150} 330 q-30 60 0 120`} fill="none" stroke={GOLD} strokeWidth={8 * (1 - p)} strokeLinecap="round" opacity={1 - p} /> : null; })}</Field>; };
const S27 = ({t, k, T, a, b}) => { const bw = cl(t, T[1], T[1] + 1.4); const om = cl(t, b - 2.2, b - 0.4);
  return <Field k={k} z={1.04} glow={1 + 1.6 * om} shake={0.25 * om}>
    <VSt x={520} k={k} hands="fold" lean={7 * bw} bow={18 * bw} items={false} /><BLo x={1480} k={k} eye={1} bow={-6} /><FlowerAt x={1200} y={470} k={k} g={0.3} />
    {[...Array(7)].map((_, i) => { const p = cl(t, T[1] + 0.8 + i * 0.12, T[1] + 1.8 + i * 0.12); return <g key={i} opacity={p} transform={`translate(${760 + p * (520 + i * 30)} ${700 - Math.sin(p * Math.PI) * 220 + p * 150})`}><path d="M-14 0 Q0 -34 14 0 Q0 10 -14 0Z" fill={i % 2 ? '#e98aa6' : '#ffd27a'} /></g>; })}</Field>; };

/* ============================================================ 28-30 : Shiva */
const Aura = ({k, o = 1, x = 960}) => <g opacity={o}><rect x={x - 420} y="-600" width="840" height="1500" fill="url(#pglow)" opacity="0.6" /><circle cx={x} cy="420" r={520 + 20 * Math.sin(k / 20)} fill="url(#fglow)" opacity="0.6" />{[...Array(14)].map((_, i) => <polygon key={i} points={`${x},400 ${x + Math.cos(i / 14 * 6.283 + k / 300) * 1400},${400 + Math.sin(i / 14 * 6.283 + k / 300) * 1400} ${x + Math.cos(i / 14 * 6.283 + 0.1 + k / 300) * 1400},${400 + Math.sin(i / 14 * 6.283 + 0.1 + k / 300) * 1400}`} fill="#fff0c8" opacity="0.06" />)}</g>;
const S28 = ({t, k, T, a, b}) => { const open = cl(t, T[1] - 0.2, T[1] + 1.4); const sh = cl(t, T[2] - 0.2, T[2] + 1.6); const tr = cl(t, T[0], T[1]) * (1 - open);
  return <Field k={k} z={1.04 + 0.1 * sh} fy={540 - 30 * sh} pil={1} glow={1.6 + open} shake={0.5 * tr + 0.3 * pulse(t, T[1] + 0.3, 0.6)}
    over={<rect width="1920" height="1080" fill="#fff8e0" opacity={0.7 * pulse(t, T[1] + 0.5, 0.7)} />}>
    <rect x={960 - 300 * open} y="-2700" width={600 * open} height="3600" fill="url(#pcore)" opacity={0.95 * (1 - sh)} />
    <Aura k={k} o={sh} />
    <VSt x={330} k={k} hands="fold" items={false} lean={14 * (1 - open)} eye={0.6 * open} /><BLo x={1590} k={k} eye={0.2} o={1} />
    <g opacity={sh} transform={`translate(0 ${(1 - sh) * 60})`}><ShivaAt x={960} s={0.86 + 0.08 * sh} k={k} eye={0.78} /></g></Field>; };
const ShivaField = ({k, z = 1, fx = 960, fy = 540, sx = 960, children, over, tint, eye = 0.78, ss = 0.94, front}) => (
  <Field k={k} z={z} fx={fx} fy={fy} pil={0} over={over}><Aura k={k} x={sx} />{children}<ShivaAt x={sx} s={ss} k={k} eye={eye} />{front}</Field>
);
const S29 = ({t, k, T, a, b}) => { const kn = cl(t, T[1] - 0.2, T[1] + 1.0); const z = 1.05 + 0.2 * cl(t, T[2], T[2] + 2);
  return <ShivaField k={k} z={z} fx={860} fy={560} front={<g transform={`translate(${610 + Math.sin(k * 1.3) * 3 * (1 - kn)} ${900}) rotate(${9 * kn})`}><g transform={`translate(0 ${-340 * 0.66}) scale(0.66)`}><Deity k={k} pose="sit" hands="fold" items={false} bow={12 * kn} /></g></g>}>
    <BLo x={1560} k={k} eye={0.2} o={0.6} /></ShivaField>; };
const Icon = ({x, y, p, kind, k}) => (
  <g transform={`translate(${x} ${y}) scale(${p * (1 + 0.15 * Math.sin(p * Math.PI))})`} opacity={p}>
    <circle r="96" fill="url(#fglow)" opacity="0.8" /><circle r="70" fill="#1a1630" stroke={GOLD} strokeWidth="5" />
    {kind === 0 && <g transform="translate(0 44) scale(0.2)"><Nagara x={60} base={0} w={230} h={520} c1="#e6b548" c2="#b98a2c" c3="#7a5a1c" glow={1} /></g>}
    {kind === 1 && <g><path d="M-34 44 L-34 -14 Q0 -58 34 -14 L34 44Z" fill="none" stroke={GOLD} strokeWidth="6" /><g transform="translate(0 16) scale(0.12)"><Deity halo={false} garland={false} /></g></g>}
    {kind === 2 && <g><path d="M-52 -30 Q0 6 52 -30" fill="none" stroke={GOLD} strokeWidth="4" />{[-36, -12, 12, 36].map((fx, i) => <path key={i} d={`M${fx - 9} ${-20 + (1 - Math.abs(fx) / 52) * 12} l9 20 l9 -20Z`} fill={['#e2572f', '#ffd27a', '#2e8b6a', '#e98aa6'][i]} />)}<g transform="translate(0 40) scale(0.5)"><Diya x={0} y={0} k={k} /></g></g>}
  </g>
);
const S30 = ({t, k, T, a, b}) => { const e4 = T[4], d = (b - 0.9 - e4);
  return <ShivaField k={k} z={lin(t, a, b, 1.06, 1.14)} fx={860} fy={520}>
    <VSt x={520} k={k} hands="fold" items={false} s={0.74} /><circle cx="520" cy="420" r={420 * cl(t, T[3], T[3] + 1.5)} fill="url(#fglow)" opacity="0.3" />
    <Icon x={300} y={250} p={cl(t, e4 + d * 0.22, e4 + d * 0.22 + 0.5)} kind={0} k={k} /><Icon x={520} y={150} p={cl(t, e4 + d * 0.5, e4 + d * 0.5 + 0.5)} kind={1} k={k} /><Icon x={740} y={250} p={cl(t, e4 + d * 0.76, e4 + d * 0.76 + 0.5)} kind={2} k={k} /></ShivaField>; };

/* ============================================================ 31-35 : Bhairava and Brahma */
const BhAt = ({x, base = 866, s = 0.8, o = 1, ...p}) => <g transform={`translate(${x} ${base - 584 * s}) scale(${s})`} opacity={o}><Bhairava {...p} /></g>;
const S31 = ({t, k, T, a, b}) => { const ang = cl(t, T[1], T[1] + 0.8); const out = cl(t, T[2] - 0.2, T[2] + 1.6); const form = cl(t, T[2] + 0.8, T[2] + 2.4); const z = 1.9 - 0.9 * out; const fx = 700 + 330 * out, fy = 300 + 240 * out;
  return <ShivaField k={k} z={z} fx={fx} fy={fy} sx={700} eye={0.78 + 0.22 * ang} over={<rect width="1920" height="1080" fill="#a01818" opacity={0.2 * ang} />}>
    <BLo x={1700} k={k} eye={0.1} s={0.66} />
    <path d="M700 268 C820 120 1100 100 1240 330" fill="none" stroke="#3a1420" strokeWidth={34 * form * (1 - cl(t, T[3], T[3] + 1))} strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - form} /><path d="M700 268 C820 120 1100 100 1240 330" fill="none" stroke="#ff7a18" strokeWidth={10 * form * (1 - cl(t, T[3], T[3] + 1))} strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - form} />
    <circle cx="700" cy="268" r={60 * ang * (1 - form)} fill="url(#fglow)" />
    <g transform={`translate(1240 866) scale(${0.3 + 0.7 * form}) translate(-1240 -866)`}><BhAt x={1240} k={k} o={form} sw={cl(t, T[3], T[3] + 1)} /></g></ShivaField>; };
const S32 = ({t, k, T, a, b}) => { const reach = cl(t, T[0] + 0.2, T[0] + 1.2); const five = cl(t, T[1] - 0.3, T[1] + 0.5) * (t < T[3] + 0.5 ? 1 : 0); const guilt = cl(t, T[2], T[2] + 0.8); const cut = pulse(t, T[3] + 0.5, 0.45); const z = 1.16;
  return <Field k={k} z={z} fx={1240} fy={500} pil={0} shake={0.5 * cut} over={<g><rect width="1920" height="1080" fill="#a01818" opacity="0.12" /><rect width="1920" height="1080" fill="#fff8e8" opacity={0.85 * cut} /></g>}>
    <Aura k={k} x={300} o={0.5} />
    <g transform={`translate(${1540} 866) rotate(${6 * reach})`}><g transform={`translate(0 ${-394 * 0.6}) scale(0.6)`}><g transform="translate(0 316)"><LotusSeat w={300} /></g><Brahma k={k} eye={0} fifth={five} bow={4 * reach} /></g></g>
    <circle cx="1540" cy={866 - 394 * 0.6 - 270 * 0.6} r={90 * guilt * five} fill="#e02a1c" opacity={0.45 * five} />
    <BhAt x={1060} k={k} s={0.98} sw={0.4 + 0.6 * cl(t, T[0] + 0.8, T[0] + 1.8) + 0.3 * pulse(t, T[3] + 0.3, 0.3)} reach={reach} />
    <circle cx="1540" cy="520" r={330 * cl(t, T[4], T[4] + 1)} fill="url(#fglow)" opacity="0.35" /></Field>; };
const S33 = ({t, k, T, a, b}) => { const fall = cl(t, T[0] + 0.6, T[0] + 1.8); const vin = cl(t, T[1] + 0.2, T[2] + 0.4); const plead = cl(t, T[4] - 0.3, T[4] + 0.5); const z = 1.12 - 0.12 * cl(t, T[1], T[1] + 1.5); const fx = 1240 - 280 * cl(t, T[1], T[1] + 1.5);
  return <ShivaField k={k} z={z} fx={fx} fy={520} sx={250} ss={0.84} over={<rect width="1920" height="1080" fill="#a01818" opacity={0.1 * (1 - vin)} />}>
    <g transform={`translate(${1540 + Math.sin(k * 1.4) * 4 * (1 - fall)} 866) rotate(${-24 * fall})`}><g transform={`translate(0 ${-394 * 0.6}) scale(0.6)`}><g transform="translate(0 316)"><LotusSeat w={300} /></g><Brahma k={k} bow={-14 * fall} /></g></g>
    <BhAt x={1100} k={k} s={0.98} sw={1 - 0.4 * plead} />
    <VSt x={680 - (1 - vin) * 900} k={k} s={0.72} hands={plead > 0.3 ? 'fold' : 'bless'} items={plead < 0.3} lean={-6 * plead} /></ShivaField>; };
const S34 = ({t, k, T, a, b}) => { const stop = cl(t, T[0], T[0] + 1.2); const firm = cl(t, T[2], T[2] + 0.8); const g1 = cl(t, T[4] + 0.6, T[4] + 1.6); const fx = 960 + 360 * firm; const lose = cl(t, T[4] + 1.8, b - 1.2);
  return <ShivaField k={k} z={1 + 0.14 * firm} fx={fx} fy={520} sx={250 + 500 * firm} ss={0.84}>
    <GhostTemple x={1300} s={0.9} o={g1 * (1 - lose) * 0.9} /><GhostTemple x={1780} s={0.9} o={g1 * (1 - lose) * 0.9} />
    {[1300, 1780].map((x, i) => <g key={i} opacity={lose * (1 - cl(t, b - 1.0, b - 0.4))}><path d={`M${x - 60} 360 L${x + 60} 520 M${x + 60} 360 L${x - 60} 520`} stroke="#e0523a" strokeWidth="14" strokeLinecap="round" /></g>)}
    <BLo x={1540} k={k} s={0.6} lean={-24 * (1 - cl(t, T[1], T[1] + 1))} bow={6 * firm} />
    <BhAt x={1100 - 0} k={k} s={0.98} sw={1 - stop} o={1 - 0.85 * cl(t, T[0] + 0.6, T[1] + 0.8)} />
    <VSt x={680 - 500 * firm} k={k} s={0.72} hands="fold" items={false} o={1 - firm} /></ShivaField>; };
const Altar = ({x, y, k, on}) => (
  <g transform={`translate(${x} ${y})`} opacity={on}>
    <circle cx="0" cy="-120" r="330" fill="url(#fglow)" opacity="0.7" />
    {[0, 1, 2].map((i) => <g key={i}><rect x={-170 + i * 30} y={-34 - i * 34} width={340 - i * 60} height="36" fill={['#9a4a2c', '#b55a34', '#c96a3c'][i]} />{[...Array(7 - i)].map((_, j) => <rect key={j} x={-166 + i * 30 + j * 48} y={-34 - i * 34} width="3" height="36" fill="#6a2f1c" />)}</g>)}
    <rect x="-110" y="-112" width="220" height="12" fill="#6a2f1c" /><Flames x0={-100} x1={100} base={-104} h={230} k={k} n={5} seed="y" />
    {[...Array(8)].map((_, i) => { const p = ((k * 1.4 + i * 30) % 240) / 240; return <circle key={i} cx={Math.sin(i * 2 + p * 5) * 60} cy={-320 - p * 360} r={3 + (1 - p) * 4} fill="#ffcf6a" opacity={1 - p} />; })}
  </g>
);
const S35 = ({t, k, T, a, b}) => { const bw = cl(t, T[0], T[0] + 1) * (1 - cl(t, T[4], T[4] + 1.2)); const kind = cl(t, T[3], T[3] + 1); const yaj = cl(t, T[4] + 0.6, T[4] + 2.2);
  return <ShivaField k={k} z={lin(t, a, b, 1.1, 1.18)} fx={1100} fy={540} sx={520} ss={0.86}>
    <circle cx="1480" cy="520" r={460 * kind} fill="url(#fglow)" opacity="0.35" /><Altar x={1060} y={870} k={k} on={yaj} />
    <BLo x={1480} k={k} s={0.72} bow={16 * bw} eye={0} lean={-4 * bw} /></ShivaField>; };

/* ============================================================ 36-37 : the flower, three results */
const Plate = ({x, y, k, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cx="0" cy="10" rx="170" ry="34" fill="#8a6a1c" /><ellipse cx="0" cy="0" rx="170" ry="34" fill={GOLD} /><ellipse cx="0" cy="0" rx="140" ry="24" fill={GOLDD} />
    {[[-90, -4, '#e2572f'], [-50, 6, '#ffd27a'], [-70, -14, '#fbf3df'], [-20, -8, '#e98aa6'], [10, 8, '#e2572f'], [-110, 6, '#ffd27a']].map(([fx, fy, c], i) => <g key={i} transform={`translate(${fx} ${fy})`}>{[0, 72, 144, 216, 288].map((r) => <ellipse key={r} transform={`rotate(${r})`} cx="0" cy="-9" rx="6" ry="10" fill={c} />)}<circle r="4" fill="#b98a2c" /></g>)}
    <path d="M40 -6 q14 -34 34 -4 q-16 -4 -34 4Z" fill="#3f9a5c" /><path d="M56 -2 q22 -30 40 0 q-18 -6 -40 0Z" fill="#4fae6a" /><g transform="translate(120 -4) scale(0.42)"><Diya x={0} y={0} k={k} /></g></g>
);
const S36 = ({t, k, T, a, b}) => { const guilt = cl(t, T[1], T[1] + 0.8); const plate = cl(t, T[2] + 0.4, T[2] + 1.2); const push = pulse(t, T[2] + 2.0, 0.6); const beg = cl(t, T[3], T[3] + 0.8) * (1 - cl(t, T[4], T[4] + 0.8)); const soft = cl(t, T[4], T[4] + 0.8); const gana = cl(t, T[5] + 0.2, T[5] + 1.0); const can = cl(t, T[6] + 0.4, T[6] + 1.4); const fin = cl(t, T[8], T[8] + 1);
  const fy = 430 - 110 * cl(t, T[2] + 1.6, T[2] + 2.4) + 160 * beg - 60 * fin, fx = 1240 + 90 * fin;
  return <ShivaField k={k} z={lin(t, a, b, 1.04, 1.1)} fx={980} fy={520} sx={620} ss={0.86} front={<g>
      <g opacity={can}><path d="M360 150 Q620 40 880 150" fill="none" stroke={GOLD} strokeWidth="12" /><path d="M360 150 Q620 90 880 150 L880 176 Q620 116 360 176Z" fill="#a8312a" />{[400, 510, 620, 730, 840].map((x, i) => <g key={i} transform={`translate(${x} ${178 - Math.sin((i / 4) * Math.PI) * 40}) rotate(${180 + Math.sin(k / 20 + i) * 5}) scale(${0.3 * cl(t, T[6] + 0.5 + i * 0.12, T[6] + 1.0 + i * 0.12)})`}><Ketaki k={k} /></g>)}</g>
      <g opacity={gana * (1 - cl(t, T[6], T[6] + 0.8) * 0.5)} transform="translate(1640 900)"><g transform="translate(0 -150) scale(0.44)"><Deity k={k} pose="sit" hands="fold" items={false} sk="#7a8a9a" skd="#566676" c1="#c8452c" c2="#8a2518" crown="pts" halo={false} garland={false} /></g><g transform="translate(10 -330) rotate(180) scale(0.22)"><Ketaki k={k} /></g></g>
    </g>}>
    <g opacity={plate}><Plate x={1250} y={840} k={k} /></g>
    <path d="M1040 700 Q1250 600 1460 700" fill="none" stroke="#e0523a" strokeWidth={12 * push} strokeLinecap="round" opacity={push} />
    <circle cx={fx} cy={fy - 40} r={200} fill="url(#fglow)" opacity={0.45 * (1 - guilt * 0.7) + 0.2 * soft} />
    <g transform={`translate(${fx + Math.sin(k * 1.2) * 4 * beg} ${fy + Math.sin(k / 20) * 10}) rotate(${172 + Math.sin(k / 26) * 8 + 30 * beg}) scale(1.05)`} style={{filter: `saturate(${1 - 0.7 * guilt + 0.5 * soft}) brightness(${1 - 0.3 * guilt + 0.2 * soft})`}}><Ketaki k={k} /></g>
    <g opacity={fin * 0.9}><circle cx={fx} cy={fy - 40} r="150" fill="none" stroke="#e0523a" strokeWidth="9" /><path d={`M${fx - 106} ${fy + 66} L${fx + 106} ${fy - 146}`} stroke="#e0523a" strokeWidth="9" /></g></ShivaField>; };
const Stage3 = ({k, children}) => (
  <AbsoluteFill style={{background: '#0a0818'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><defs><linearGradient id="st3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c0a1e" /><stop offset="1" stopColor="#2a1c3a" /></linearGradient><radialGradient id="doorGlow"><stop offset="0" stopColor="#ffc86a" stopOpacity="0.7" /><stop offset="0.5" stopColor="#ffb44a" stopOpacity="0.2" /><stop offset="1" stopColor="#ffb44a" stopOpacity="0" /></radialGradient></defs>
      <rect width="1920" height="1080" fill="url(#st3)" /><Stars k={k} n={50} /><rect y="880" width="1920" height="200" fill="#120e22" /><rect y="880" width="1920" height="5" fill="#3a2c52" />
      {children}
    </svg>
    <Dust k={k} n={24} /><Vig s={0.82} cy={48} /><Foot />
  </AbsoluteFill>
);
const Spot = ({x, on, children}) => <g opacity={0.3 + 0.7 * on}><polygon points={`${x - 60},0 ${x + 60},0 ${x + 300},900 ${x - 300},900`} fill="#fff0c8" opacity={0.1 * on} /><ellipse cx={x} cy="890" rx="290" ry="30" fill="#fff0c8" opacity={0.16 * on} />{children}</g>;
const MiniTemple = ({x, base = 884, s = 0.6, lit = 1}) => <g transform={`translate(${x} ${base}) scale(${s})`}><Nagara x={60} base={0} w={230} h={540} c1="#c9a15a" c2="#a37a3c" c3="#6b4a26" glow={lit} /></g>;
const S37 = ({t, k, T, a, b}) => { const o1 = cl(t, T[1] - 0.2, T[1] + 0.4), o2 = cl(t, T[3] - 0.2, T[3] + 0.4), o3 = cl(t, T[5] - 0.2, T[5] + 0.4); const win = cl(t, T[2], T[2] + 0.6), lose = cl(t, T[4], T[4] + 0.8), out = cl(t, T[6], T[6] + 0.8);
  return <Stage3 k={k}>
    <Spot x={360} on={o1}><MiniTemple x={420} lit={win} /><circle cx="470" cy="600" r={300 * win} fill="url(#fglow)" opacity="0.4" /><VSt x={250} base={884} s={0.5} k={k} hands="fold" items={false} /></Spot>
    <Spot x={960} on={o2}><GhostTemple x={1090} s={0.74} o={1 - 0.7 * lose} /><g transform="translate(0 84)"><path d="M1030 380 L1150 520 M1150 380 L1030 520" stroke="#e0523a" strokeWidth="13" strokeLinecap="round" opacity={lose} /></g><BLo x={850} base={884} s={0.5} k={k} bow={12 * lose} /></Spot>
    <Spot x={1560} on={o3}><Plate x={1600} y={850} k={k} s={0.8} /><g transform={`translate(${1500 - 40 * out} ${520 - 60 * out}) rotate(${172 + Math.sin(k / 26) * 8}) scale(0.8)`}><Ketaki k={k} /></g><path d="M1440 720 Q1600 640 1760 720" fill="none" stroke="#e0523a" strokeWidth="10" strokeLinecap="round" opacity={out} /></Spot>
  </Stage3>; };

/* ============================================================ 38-41 : Arunachala */
const S38 = ({t, k, T, a, b}) => { const small = cl(t, T[2] + 0.3, T[2] + 3.2); const hill = cl(t, T[3] + 0.2, T[3] + 2.0); const name = cl(t, T[4], T[4] + 1); const z = 1 - 0.12 * cl(t, T[1], T[1] + 2) + 0.14 * hill;
  return <Field k={k} z={z} fx={1000} fy={540 - 60 * (1 - small)} pil={0}>
    <g opacity={1 - hill}><FirePillar x={1300} w={240 + 200 * small} k={k} y0={900 - 3600 * (1 - small) - 520 * small} y1={900} /></g>
    <ellipse cx="1300" cy="884" rx="600" ry="50" fill="#ff8a24" opacity={0.3} />
    <circle cx="1300" cy="560" r={520 * hill} fill="url(#fglow)" opacity={0.5} />
    <Hill x={1300} base={866} w={1000} h={500} o={hill} c1={name > 0.5 ? '#9a3f2a' : '#b5522c'} />
    <g opacity={hill} transform="translate(1260 366)"><Flames x0={-30} x1={30} base={6} h={90} k={k} n={2} seed="p" /></g>
    {[...Array(9)].map((_, i) => <g key={i} opacity={cl(t, T[5] + i * 0.2, T[5] + 0.6 + i * 0.2)}><Diya x={900 + i * 100} y={900 + (i % 2) * 26} s={0.4} k={k} i={i} /></g>)}
    <Aura k={k} x={480} o={0.6} /><ShivaAt x={480} s={0.9} k={k} /></Field>; };
const HillScene = ({k, t, night = 0, flame = 0, moon = 0, z = 1, fy = 540, children, lamps = 0}) => (
  <AbsoluteFill style={{background: '#0a0c1e'}}>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
      <SkyDefs /><defs><linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#27345e" /><stop offset="0.55" stopColor="#c07a66" /><stop offset="0.85" stopColor="#f2c186" /></linearGradient>
        <radialGradient id="doorGlow"><stop offset="0" stopColor="#ffc86a" stopOpacity="0.7" /><stop offset="0.5" stopColor="#ffb44a" stopOpacity="0.2" /><stop offset="1" stopColor="#ffb44a" stopOpacity="0" /></radialGradient></defs>
      <rect width="1920" height="1080" fill="url(#hsky)" /><rect width="1920" height="1080" fill="url(#nsky)" opacity={night} /><g opacity={night}><Stars k={k} n={80} /></g>
      <Cam z={z} fy={fy}>
        <g opacity={moon}><circle cx="1500" cy={420 - moon * 200} r="64" fill="#fbf4dc" /><circle cx="1500" cy={420 - moon * 200} r="250" fill="url(#fglow)" opacity="0.45" /></g>
        <path d="M-400 800 Q0 640 400 720 Q800 650 1200 730 Q1700 650 2300 800Z" fill="#5a3a52" opacity="0.7" />
        <circle cx="900" cy="250" r={(420 + 30 * Math.sin(k / 9)) * flame} fill="url(#fglow)" opacity={0.9 * flame} />
        {flame > 0 && [...Array(12)].map((_, i) => <polygon key={i} points={`900,268 ${900 + Math.cos(i / 12 * 6.283 + k / 200) * 1500},${268 + Math.sin(i / 12 * 6.283 + k / 200) * 1500} ${900 + Math.cos(i / 12 * 6.283 + 0.08 + k / 200) * 1500},${268 + Math.sin(i / 12 * 6.283 + 0.08 + k / 200) * 1500}`} fill="#ffe0a0" opacity={0.07 * flame} />)}
        <Hill x={960} base={800} w={1700} h={540} c1="#8a3b2a" c2="#5e2520" /><Hill x={960} base={800} w={1700} h={540} c1="#120c1e" c2="#0a0814" o={night * 0.6} />
        <g opacity={flame} transform="translate(892 262)"><rect x="-16" y="-6" width="32" height="16" fill="#b98a2c" /><Flames x0={-22} x1={22} base={-4} h={110} k={k} n={2} seed="t" /></g>
        <rect x="-400" y="796" width="2800" height="500" fill="#1c1426" />
        {[[560, 0.34], [820, 0.46], [1100, 0.46], [1360, 0.34]].map(([x, s], i) => <g key={i} transform={`translate(${x} 800) scale(${s})`}><Gopuram x={0} base={0} w={250} h={590} c1="#e6dcc6" c2="#c9bb9e" c3="#8a7a5e" glow={0.4 + 0.6 * night} /></g>)}
        <g fill="#2a1e30">{[...Array(30)].map((_, i) => <rect key={i} x={-100 + i * 74} y={800 - 20 - R(`hh${i}`) * 36} width={50 + R(`hw${i}`) * 30} height="60" />)}</g>
        {[...Array(30)].map((_, i) => <rect key={i} x={-80 + i * 72 + R(`wl${i}`) * 20} y={792 - R(`wy${i}`) * 20} width="7" height="9" fill="#ffc86a" opacity={night * (0.5 + 0.4 * Math.sin(k / 15 + i * 2))} />)}
        <Palm x={130} y={830} s={1.2} k={k} /><Palm x={1800} y={830} s={1.3} k={k} i={3} />
        <rect x="-400" y="836" width="2800" height="460" fill="#140e1c" />
        {children}
      </Cam>
    </svg>
    <Dust k={k} n={24} /><Vig s={0.8} cy={50} /><Foot />
  </AbsoluteFill>
);
const S39 = ({t, k, T, a, b}) => <HillScene k={k} t={t} z={lin(t, a, b, 1.0, 1.08)} night={0.15} />;
const S40 = ({t, k, T, a, b}) => { const night = cl(t, a, T[0] + 3.5, 0.15, 1); const fl = cl(t, T[1] + 1.8, T[1] + 3.0); return <HillScene k={k} t={t} night={night} moon={cl(t, T[0] + 0.5, T[0] + 4.5)} flame={fl} z={1.08 - 0.16 * cl(t, T[2] - 0.5, b)} fy={540 - 40 * fl} />; };
const Walker = ({x, y, k, i}) => { const s = Math.sin(k / 5 + i * 1.7) * 14; return <g transform={`translate(${x} ${y})`} fill="#0c0812"><circle cx="0" cy="-92" r="13" /><path d="M-13 -78 L13 -78 L16 -26 L-16 -26Z" /><path d={`M-8 -28 L${-8 + s} 0`} stroke="#0c0812" strokeWidth="10" strokeLinecap="round" /><path d={`M8 -28 L${8 - s} 0`} stroke="#0c0812" strokeWidth="10" strokeLinecap="round" />{i % 3 === 0 && <g><circle cx="22" cy="-52" r="26" fill="url(#fglow)" /><circle cx="22" cy="-52" r="5" fill="#ffd27a" /></g>}</g>; };
const S41 = ({t, k, T, a, b}) => { const lamps = cl(t, T[1] - 0.2, T[1] + 0.4);
  return <HillScene k={k} t={t} night={1} moon={1} flame={1 + 0.15 * pulse(t, T[2] + 1, 1)} z={0.94}>
    <g opacity={1 - 0.6 * lamps}>{[...Array(14)].map((_, i) => <Walker key={i} x={((i * 190 + k * 2.2) % 2700) - 380} y={880 + (i % 3) * 14} k={k} i={i} />)}</g>
    <rect x="-400" y="880" width="2800" height="450" fill="#0c0812" opacity={lamps} />
    {[...Array(22)].map((_, i) => <g key={i} opacity={cl(t, T[1] + 0.3 + i * 0.14, T[1] + 0.7 + i * 0.14)}><Diya x={-20 + i * 96 + (i % 2) * 30} y={905 + (i % 2) * 46} s={0.5 + (i % 2) * 0.16} k={k} i={i} /></g>)}</HillScene>; };

/* ============================================================ 42-44 : the lesson */
const S42 = ({t, k, T, a, b}) => { const up = cl(t, T[1] - 0.2, T[1] + 0.4), dn = cl(t, T[2] - 0.2, T[2] + 0.4), both = cl(t, T[3], T[3] + 0.5); const hon = cl(t, T[4] - 0.2, T[4] + 1.2);
  return (
    <AbsoluteFill style={{background: '#070b1f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs /><rect width="1920" height="540" fill="url(#nsky)" /><Stars k={k} n={50} />
        {[...Array(5)].map((_, i) => <Cloud key={i} x={R(`ux${i}`) * 1900} y={((R(`uy${i}`) * 560 + k * 3) % 620) - 60} s={0.7 + R(`uz${i}`) * 0.5} o={0.2} />)}
        <g transform="translate(0 540)"><Strata y0={0} n={4} off={k * 4} x0={-100} w={2120} /></g>
        <FirePillar x={960} w={200} k={k} y0={-200} y1={1300} />
        <g transform={`translate(${560 + Math.sin(t) * 10} ${300 + Math.sin(t * 1.7) * 8}) rotate(-36) scale(0.62)`}><Swan ph={t * 2.1 * Math.PI * 2} /></g>
        <g transform={`translate(1380 ${790 + Math.sin(k / 3) * 4}) rotate(58) scale(0.5)`}><Varaha k={k} /></g>
        <rect width="1920" height="540" fill="#05040c" opacity={0.6 * (1 - Math.max(up, both)) * (t > T[1] - 0.2 ? 1 : 0)} /><rect y="540" width="1920" height="540" fill="#05040c" opacity={0.6 * (1 - Math.max(dn, both))} />
        <rect width="1920" height="1080" fill="#ff8a24" opacity="0.06" />
        <g opacity={hon}><rect width="1920" height="1080" fill="#0a0818" opacity="0.9" /><circle cx="960" cy="460" r={560 + 20 * Math.sin(k / 20)} fill="url(#fglow)" opacity="0.6" />{[...Array(14)].map((_, i) => <polygon key={i} points={`960,440 ${960 + Math.cos(i / 14 * 6.283 + k / 300) * 1400},${440 + Math.sin(i / 14 * 6.283 + k / 300) * 1400} ${960 + Math.cos(i / 14 * 6.283 + 0.1 + k / 300) * 1400},${440 + Math.sin(i / 14 * 6.283 + 0.1 + k / 300) * 1400}`} fill="#fff0c8" opacity="0.06" />)}<VSt x={960} base={930} s={0.9} k={k} hands="fold" items={false} /></g>
      </svg>
      <Vig s={0.84} cy={48} /><Foot />
    </AbsoluteFill>); };
const S43 = ({t, k, T, a, b}) => { const l = cl(t, T[0], T[0] + 0.5), r = cl(t, T[1] - 0.2, T[1] + 0.4); const lose = cl(t, T[0] + 1.2, T[0] + 2.4);
  return <Stage3 k={k}>
    <Spot x={520} on={l}><GhostTemple x={690} s={0.8} o={1 - 0.75 * lose} /><BLo x={400} base={884} s={0.56} k={k} bow={12 * lose} /></Spot>
    <Spot x={1400} on={r}><MiniTemple x={1500} s={0.68} lit={r} /><circle cx="1560" cy="560" r={340 * r} fill="url(#fglow)" opacity="0.45" /><VSt x={1290} base={884} s={0.56} k={k} hands="fold" items={false} /></Spot>
  </Stage3>; };
const S44 = ({t, k, T, a, b}) => { const lit = cl(t, T[0] + 0.8, T[0] + 1.6); const beam = cl(t, T[1], T[1] + 2.4); const om = cl(t, T[3] - 0.4, T[3] + 1.6);
  return (
    <AbsoluteFill style={{background: '#06050c'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs /><defs><linearGradient id="end" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#07060f" /><stop offset="1" stopColor="#1c1226" /></linearGradient></defs>
        <rect width="1920" height="1080" fill="url(#end)" /><g opacity={0.5 + 0.5 * om}><Stars k={k} n={70} /></g>
        <g opacity={om * 0.9}><Hill x={960} base={900} w={1900} h={470} c1="#3a1a22" c2="#22101a" /></g>
        <g opacity={beam}><FirePillar x={960} w={30 + 90 * beam} k={k} y0={840 - 2400 * beam} y1={840} /></g>
        <circle cx="960" cy="560" r={600 * om} fill="url(#fglow)" opacity={0.5 * om} />
        <g opacity={om * 0.85}><ShivaAt x={960} base={850} s={0.78} k={k} /></g>
        <rect y="900" width="1920" height="180" fill="#0c0812" />
        <Diya x={960} y={900} s={1.5} on={lit} k={k} />
        {[...Array(8)].map((_, i) => <g key={i} opacity={om * cl(t, T[3] + i * 0.15, T[3] + 0.5 + i * 0.15)}><Diya x={300 + i * 190 + (i > 3 ? 0 : -40)} y={980} s={0.6} k={k} i={i + 3} /></g>)}
      </svg>
      <Dust k={k} n={30} /><Vig s={0.8} cy={52} /><Foot />
    </AbsoluteFill>); };

const SC2 = [S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25, S26, S27, S28, S29, S30, S31, S32, S33, S34, S35, S36, S37, S38, S39, S40, S41, S42, S43, S44];
const ALLCAPS = [...CAPS, ...TL.caps];
export const Full = () => {
  const k = useCurrentFrame(); const t = k / 30; const B = TL.B; const n = B.length - 1;
  return (
    <AbsoluteFill style={{background: '#050406'}}>
      <Fonts />
      {[...Array(n)].map((_, i) => { const a = B[i], b = B[i + 1]; if (t < a - 0.05 || t > b + 0.05) return null; const last = i === n - 1; const o = Math.min(i === 0 ? cl(t, 0, 0.9) : cl(t, a, a + 0.5), 1 - cl(t, b - (last ? 2.2 : 0.5), b - (last ? 0.2 : 0)));
        const S = i < 8 ? SC[i] : SC2[i - 8]; return <AbsoluteFill key={i} style={{opacity: o}}><S t={t} k={k} T={TL.T[i]} a={a} b={b} /></AbsoluteFill>; })}
      <Caption t={t} caps={ALLCAPS} />
    </AbsoluteFill>
  );
};
export const FRAMES = Math.round(TL.dur * 30);

/* ============================================================ technique demo: lip movement, expressions, moving camera, no black cuts */
import AMP from './demo_amp.json';
const within = (t, iv) => iv.some(([a, b]) => t >= a && t <= b);
const DCAPS = [[0.55, 1.84, 'Get up, said Brahma.'], [2.21, 3.09, 'See who has come.'], [3.51, 4.34, 'I am your elder.'], [4.67, 6.69, 'You should rise and greet me.'], [6.9, 8.09, 'Vishnu opened his eyes.'], [8.53, 10.87, 'He was not pleased, but he spoke politely.'], [11.48, 12.43, 'Come, sit down.']];
export const Demo = () => {
  const k = useCurrentFrame(); const t = k / 30; const amp = AMP[Math.min(k, AMP.length - 1)] || 0;
  const bSpeak = within(t, [[0.5, 1.15], [2.15, 6.75]]) ? amp : 0, vSpeak = within(t, [[11.4, 12.5]]) ? amp : 0;
  const toB = cl(t, 0.2, 1.3), whip = cl(t, 6.75, 7.35); const z = 1 + 0.42 * toB + 0.06 * whip + lin(t, 1.3, 6.7, 0, 0.05);
  const fx = 960 + 300 * toB - 640 * whip + lin(t, 7.4, 13, 0, -20), fy = 540 - 60 * toB + 20 * whip;
  const blur = Math.sin(Math.PI * lin(t, 6.75, 7.35)) * 26; const out = cl(t, 13.0, 13.9);
  return (
    <AbsoluteFill style={{background: '#06101f'}}>
      <Fonts />
      <AbsoluteFill style={{transform: `translateY(${-out * 1080}px)`}}>
        <AbsoluteFill style={{filter: blur > 0.5 ? `blur(${blur * 0.25}px)` : 'none', transform: `scaleX(${1 + blur * 0.004})`}}>
          <OceanBg k={k} z={z} fx={fx} fy={fy}><g transform="translate(600 800)"><VishnuShesha k={k} closed={t < 7.1 ? 1 : 0} eye={0.55 * cl(t, 8.3, 8.9) * (1 - cl(t, 10.6, 11.3))} worry={0} open={vSpeak} /></g>
            <BLo x={1420} base={900} s={0.72} k={k} eye={0.5 + 0.4 * cl(t, 2.1, 2.6)} open={bSpeak} bow={-3 * bSpeak} /></OceanBg>
        </AbsoluteFill>
      </AbsoluteFill>
      {out > 0 && <AbsoluteFill style={{transform: `translateY(${(1 - out) * 1080}px)`}}><Kailasa k={k} z={1.1} fx={1100}><ShivaAt x={1340} base={880} s={0.8} k={k} eye={0.6} /></Kailasa></AbsoluteFill>}
      <Caption t={t} caps={DCAPS} />
    </AbsoluteFill>
  );
};
