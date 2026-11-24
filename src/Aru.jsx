import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, staticFile, random, Easing} from 'remotion';

const ez = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0.1, 0.25, 1)};
const cl = (t, a, b, x = 0, y = 1) => interpolate(t, [a, b], [x, y], ez);
const Fonts = () => <style>{`@font-face{font-family:Cinzel;src:url(${staticFile('Cinzel[wght].ttf')});font-weight:400 900}`}</style>;
const CREAM = '#f5e8c6', GOLD = '#e6b548', GOLDD = '#b98a2c';
const R = (s) => random(s);

/* scene boundaries (video seconds) */
const B = [0, 8.43, 14.07, 20.03, 27.13, 47.05, 56.52, 64.1, 71.5];
const CAPS = [
  [1.23, 4.5, 'Almost every town in India has a temple for Shiva.'], [4.99, 7.6, 'Almost every town has a temple for Vishnu.'],
  [9.25, 11.5, 'But Brahma created the whole world.'], [11.91, 13.3, 'So where are his temples?'],
  [14.82, 16.0, 'There are only a handful.'], [16.56, 19.3, 'The best known is in Pushkar, in Rajasthan.'],
  [20.79, 21.3, 'Why?'], [21.82, 23.6, 'The Shiva Purana gives the answer.'], [24.14, 26.2, 'And the answer begins with a swan.'],
  [28.03, 31.6, 'High above the world, a white swan was flying upward.'], [32.13, 34.3, 'That swan was Brahma himself.'],
  [34.79, 37.2, 'He had been flying for a very long time.'], [37.57, 39.8, 'Beside him rose a pillar of fire.'], [40.23, 42.3, 'Up, and up, and up.'],
  [42.78, 44.1, 'His wings were tired.'], [44.56, 46.3, 'But he still could not see the top.'],
  [47.84, 50.2, 'Then he saw something falling past him.'], [50.69, 51.4, 'A flower.'], [51.86, 55.85, 'A sweet-smelling ketaki flower, drifting slowly down.'],
  [57.19, 58.7, 'And Brahma had an idea.'], [59.39, 63.26, 'What happens when the creator himself tells one small lie?'],
  [64.94, 67.5, 'To understand, we must go back to the beginning.'], [68.1, 69.55, 'It began with a quarrel.'],
];

const Caption = ({t, caps = CAPS}) => {
  const c = caps.find(([a, b]) => t >= a - 0.12 && t <= b + 0.35);
  if (!c) return null;
  const [a, b, txt] = c; const ws = txt.split(' '); const o = Math.min(cl(t, a - 0.12, a + 0.1), 1 - cl(t, b + 0.15, b + 0.35));
  const tot = ws.reduce((s, w) => s + w.length + 1, 0); let acc = 0;
  return (
    <div style={{position: 'absolute', left: 140, right: 140, bottom: 58, textAlign: 'center', fontFamily: 'Cinzel', fontWeight: 700, fontSize: 50, lineHeight: 1.25, letterSpacing: 1.5, textShadow: '0 3px 6px rgba(0,0,0,1), 0 0 22px rgba(0,0,0,.9)', opacity: o}}>
      {ws.map((w, i) => { const t0 = a + (b - a) * (acc / tot); acc += w.length + 1; return <span key={i} style={{color: t >= t0 ? CREAM : 'rgba(245,232,198,.42)', marginRight: 15, display: 'inline-block'}}>{w}</span>; })}
    </div>
  );
};

const Dust = ({k, n = 40, col = '#f8e8ba'}) => (
  <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
    {[...Array(n)].map((_, i) => { const x = R(`x${i}`) * 1920 + Math.sin(k / 40 + i) * 14; const y = (R(`y${i}`) * 1080 - k * (0.2 + R(`v${i}`) * 0.5) + 21600) % 1080; return <circle key={i} cx={x} cy={y} r={1.2 + R(`q${i}`) * 2.2} fill={col} opacity={0.1 + R(`o${i}`) * 0.35} />; })}
  </svg>
);
const Vig = ({s = 0.86, cy = 46}) => <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% ${cy}%, rgba(0,0,0,0) 42%, rgba(6,4,6,${s}) 100%)`}} />;
const Foot = () => <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 72%, rgba(0,0,0,.74) 100%)'}} />;

/* ------------------------------------------------------------ temples */
const Nagara = ({x, base, w, h, c1, c2, c3, glow, door = '#ffb648'}) => {
  const top = base - h * 0.34, tt = base - h;
  const tower = `M${x - w / 2} ${top} C${x - w / 2} ${top - h * 0.36} ${x - w * 0.3} ${tt + h * 0.1} ${x - w * 0.13} ${tt} L${x + w * 0.13} ${tt} C${x + w * 0.3} ${tt + h * 0.1} ${x + w / 2} ${top - h * 0.36} ${x + w / 2} ${top}Z`;
  const id = `ng${x}`;
  return (
    <g>
      <clipPath id={id}><path d={tower} /></clipPath>
      {/* front hall */}
      <path d={`M${x - w * 1.25} ${base} L${x - w * 1.25} ${base - h * 0.24} L${x - w * 0.86} ${base - h * 0.46} L${x - w * 0.47} ${base - h * 0.24} L${x - w * 0.47} ${base}Z`} fill={c2} />
      <rect x={x - w * 1.3} y={base - h * 0.25} width={w * 0.88} height={h * 0.03} fill={c1} />
      <rect x={x - w * 0.88} y={base - h * 0.5} width={w * 0.04} height={h * 0.06} fill={GOLD} />
      {[0, 1, 2].map((i) => <rect key={i} x={x - w * 1.16 + i * w * 0.26} y={base - h * 0.2} width={w * 0.07} height={h * 0.2} fill={c3} />)}
      {/* sanctum body */}
      <rect x={x - w / 2} y={top} width={w} height={h * 0.34} fill={c1} />
      <path d={tower} fill={c1} />
      <g clipPath={`url(#${id})`}>
        {[...Array(11)].map((_, i) => <rect key={i} x={x - w} y={top - (i + 1) * h * 0.058} width={w * 2} height={h * 0.012} fill={c3} opacity="0.75" />)}
        <rect x={x - w * 0.09} y={tt} width={w * 0.18} height={h * 0.66} fill={c2} opacity="0.55" />
        <rect x={x} y={tt} width={w} height={h} fill="#000" opacity="0.22" />
      </g>
      <rect x={x} y={top} width={w / 2} height={h * 0.34} fill="#000" opacity="0.22" />
      <rect x={x - w * 0.56} y={top - h * 0.012} width={w * 1.12} height={h * 0.028} fill={c2} />
      <ellipse cx={x} cy={tt - h * 0.022} rx={w * 0.19} ry={h * 0.03} fill={c2} /><ellipse cx={x} cy={tt - h * 0.022} rx={w * 0.19} ry={h * 0.012} fill={c3} />
      <path d={`M${x - w * 0.05} ${tt - h * 0.05} Q${x} ${tt - h * 0.13} ${x + w * 0.05} ${tt - h * 0.05}Z`} fill={GOLD} /><rect x={x - 2.5} y={tt - h * 0.17} width="5" height={h * 0.08} fill={GOLD} />
      {/* door */}
      <ellipse cx={x} cy={base - h * 0.1} rx={w * 0.9} ry={h * 0.3} fill="url(#doorGlow)" opacity={glow} />
      <path d={`M${x - w * 0.17} ${base} L${x - w * 0.17} ${base - h * 0.17} Q${x} ${base - h * 0.27} ${x + w * 0.17} ${base - h * 0.17} L${x + w * 0.17} ${base}Z`} fill={door} opacity={0.35 + 0.65 * glow} />
      <path d={`M${x - w * 0.17} ${base} L${x - w * 0.17} ${base - h * 0.17} Q${x} ${base - h * 0.27} ${x + w * 0.17} ${base - h * 0.17} L${x + w * 0.17} ${base}Z`} fill="none" stroke={c3} strokeWidth="6" />
      <rect x={x - w * 0.66} y={base - 4} width={w * 1.32} height={h * 0.035} fill={c2} /><rect x={x - w * 1.36} y={base + h * 0.028} width={w * 2.1} height={h * 0.03} fill={c3} />
    </g>
  );
};
const Gopuram = ({x, base, w, h, c1, c2, c3, glow}) => {
  const n = 6, th = h * 0.8 / n; const tiers = [];
  for (let i = 0; i < n; i++) { const wb = w * (1 - i * 0.105), wt = w * (1 - (i + 1) * 0.105), y = base - h * 0.12 - i * th; tiers.push([wb, wt, y]); }
  const topY = base - h * 0.12 - n * th, tw = w * (1 - n * 0.105);
  return (
    <g>
      <rect x={x - w * 1.5} y={base - h * 0.15} width={w * 3} height={h * 0.15} fill={c2} /><rect x={x - w * 1.5} y={base - h * 0.17} width={w * 3} height={h * 0.025} fill={c1} />
      {[...Array(12)].map((_, i) => <rect key={i} x={x - w * 1.46 + i * w * 0.25} y={base - h * 0.2} width={w * 0.1} height={h * 0.035} fill={c1} />)}
      <rect x={x - w / 2} y={base - h * 0.12} width={w} height={h * 0.12} fill={c1} />
      {tiers.map(([wb, wt, y], i) => (
        <g key={i}>
          <path d={`M${x - wb / 2} ${y} L${x - wt / 2} ${y - th} L${x + wt / 2} ${y - th} L${x + wb / 2} ${y}Z`} fill={i % 2 ? c1 : c2} />
          <path d={`M${x} ${y} L${x} ${y - th} L${x + wt / 2} ${y - th} L${x + wb / 2} ${y}Z`} fill="#000" opacity="0.2" />
          <rect x={x - wb / 2 - 5} y={y - 6} width={wb + 10} height="8" fill={c3} />
          {[...Array(7 - i)].map((_, j) => { const cx = x - wt * 0.38 + j * (wt * 0.76 / Math.max(1, 6 - i)); return <path key={j} d={`M${cx - 9} ${y - 10} L${cx - 9} ${y - th * 0.55} Q${cx} ${y - th * 0.8} ${cx + 9} ${y - th * 0.55} L${cx + 9} ${y - 10}Z`} fill={c3} opacity="0.8" />; })}
        </g>
      ))}
      <path d={`M${x - tw * 0.62} ${topY} Q${x - tw * 0.62} ${topY - th * 1.15} ${x} ${topY - th * 1.15} Q${x + tw * 0.62} ${topY - th * 1.15} ${x + tw * 0.62} ${topY}Z`} fill={c2} />
      <path d={`M${x} ${topY} L${x} ${topY - th * 1.15} Q${x + tw * 0.62} ${topY - th * 1.15} ${x + tw * 0.62} ${topY}Z`} fill="#000" opacity="0.2" />
      {[-0.4, -0.2, 0, 0.2, 0.4].map((f, i) => <path key={i} d={`M${x + tw * f - 5} ${topY - th * 1.1} Q${x + tw * f} ${topY - th * 1.55} ${x + tw * f + 5} ${topY - th * 1.1}Z`} fill={GOLD} />)}
      <ellipse cx={x} cy={base - h * 0.08} rx={w * 0.9} ry={h * 0.26} fill="url(#doorGlow)" opacity={glow} />
      <path d={`M${x - w * 0.13} ${base} L${x - w * 0.13} ${base - h * 0.15} Q${x} ${base - h * 0.22} ${x + w * 0.13} ${base - h * 0.15} L${x + w * 0.13} ${base}Z`} fill="#ffb648" opacity={0.35 + 0.65 * glow} />
      <rect x={x - w * 1.56} y={base} width={w * 3.12} height={h * 0.03} fill={c3} />
    </g>
  );
};
const Palm = ({x, y, s = 1, k, i = 0}) => { const a = 2.5 * Math.sin(k / 37 + i); return (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#15101c">
    <path d="M-6 0 Q4 -120 -4 -230 L6 -230 Q16 -120 8 0Z" />
    <g transform={`translate(0 -230) rotate(${a})`}>{[-150, -110, -60, -20, 30, 70].map((r, j) => <path key={j} transform={`rotate(${r + 40})`} d="M0 0 Q60 -34 120 -6 Q60 -14 0 8Z" />)}</g>
  </g>); };

const S1 = ({t, k}) => {
  const g1 = cl(t, 1.1, 2.2) * (1 - cl(t, 4.6, 5.4) * 0.6), g2 = cl(t, 4.9, 6.0);
  const push = interpolate(t, [0, 8.6], [1.0, 1.07]);
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1a3a" /><stop offset="0.45" stopColor="#5a3558" /><stop offset="0.72" stopColor="#c8664a" /><stop offset="0.86" stopColor="#f0a85a" /></linearGradient>
          <radialGradient id="sun"><stop offset="0" stopColor="#ffe3a0" stopOpacity="0.95" /><stop offset="0.25" stopColor="#ffc56a" stopOpacity="0.5" /><stop offset="1" stopColor="#ffc56a" stopOpacity="0" /></radialGradient>
          <radialGradient id="doorGlow"><stop offset="0" stopColor="#ffc86a" stopOpacity="0.7" /><stop offset="0.5" stopColor="#ffb44a" stopOpacity="0.2" /><stop offset="1" stopColor="#ffb44a" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#dusk)" />
        {[...Array(40)].map((_, i) => <circle key={i} cx={R(`sx${i}`) * 1920} cy={R(`sy${i}`) * 420} r={1 + R(`sr${i}`) * 1.6} fill="#fff4d8" opacity={0.25 + 0.4 * Math.abs(Math.sin(k / 20 + i))} />)}
        <circle cx="960" cy="800" r="520" fill="url(#sun)" /><circle cx="960" cy="800" r="74" fill="#ffe9b0" />
        <g transform={`translate(${-k * 0.12} 0)`} fill="#f4b27a" opacity="0.4">{[[300, 300, 190], [900, 220, 240], [1500, 330, 200], [2000, 260, 180]].map(([x, y, w], i) => <g key={i}><ellipse cx={x} cy={y} rx={w} ry="16" /><ellipse cx={x + 70} cy={y - 14} rx={w * 0.55} ry="13" /></g>)}</g>
        <path d="M0 800 L0 700 Q200 630 420 690 Q640 620 860 700 Q1100 640 1320 690 Q1560 620 1920 700 L1920 800Z" fill="#6d3f55" opacity="0.8" />
        {/* far town */}
        <g fill="#3a2440">{[...Array(34)].map((_, i) => { const w = 40 + R(`tw${i}`) * 50, h = 40 + R(`th${i}`) * 80; return <rect key={i} x={i * 58 - 10} y={800 - h} width={w} height={h} />; })}
          {[180, 640, 1250, 1700].map((x, i) => <path key={i} d={`M${x - 22} 800 L${x - 22} 720 Q${x} 640 ${x + 22} 720 L${x + 22} 800Z`} />)}</g>
        {[...Array(26)].map((_, i) => <rect key={i} x={30 + i * 74 + R(`lx${i}`) * 20} y={760 - R(`ly${i}`) * 40} width="7" height="9" fill="#ffc86a" opacity={0.5 + 0.4 * Math.sin(k / 15 + i * 2)} />)}
      </svg>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 75%'}}>
        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
          <rect y="838" width="1920" height="242" fill="#241726" />
          <g><Nagara x={600} base={840} w={230} h={560} c1="#b98d6a" c2="#8f6548" c3="#5e3f30" glow={g1} /></g>
          <g transform={`translate(600 ${840 - 560 * 1.17})`}><rect x="-2" y="-40" width="4" height="60" fill={GOLD} /><path d={`M2 -40 Q${34 + 6 * Math.sin(k / 9)} -34 ${58 + 5 * Math.sin(k / 7)} -24 Q${30 + 5 * Math.sin(k / 8)} -18 2 -14Z`} fill="#e2572f" /></g>
          <g><Gopuram x={1340} base={840} w={250} h={590} c1="#c9a57a" c2="#a57c58" c3="#6b4a36" glow={g2} /></g>
          <rect y="838" width="1920" height="8" fill="#4a3040" />
          <Palm x={170} y={850} s={1.25} k={k} /><Palm x={1000} y={846} s={0.8} k={k} i={2} /><Palm x={1760} y={850} s={1.3} k={k} i={4} />
          {[[440, 880], [520, 900], [680, 890], [760, 905], [1200, 890], [1290, 905], [1400, 895], [1490, 905]].map(([x, y], i) => { const on = i < 4 ? g1 : g2; return <g key={i} opacity={on}><ellipse cx={x} cy={y + 6} rx="12" ry="4" fill="#7a4a2a" /><path d={`M${x - 4} ${y + 2} Q${x + Math.sin(k / 4 + i) * 2} ${y - 16} ${x + 4} ${y + 2}Z`} fill="#ffd27a" /><circle cx={x} cy={y} r="26" fill="url(#doorGlow)" /></g>; })}
          {/* birds */}
          {[0, 1, 2, 3].map((i) => { const bx = 700 + i * 60 + k * 0.9, by = 300 + i * 22 - k * 0.1, f = Math.sin(k / 4 + i) * 9; return <path key={i} d={`M${bx - 16} ${by - f} Q${bx - 6} ${by - 6} ${bx} ${by} Q${bx + 6} ${by - 6} ${bx + 16} ${by - f}`} fill="none" stroke="#1a1224" strokeWidth="3" strokeLinecap="round" />; })}
        </svg>
      </AbsoluteFill>
      <Dust k={k} n={26} /><Vig s={0.8} cy={60} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ Brahma */
const SKIN = '#eebf8c', SKIND = '#c9925e', BEARD = '#f3efe6', BEARDD = '#cfc8ba', RED = '#b93a26', REDD = '#8a2518';
const Crown = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M-62 0 L-56 -78 L-30 -52 L0 -112 L30 -52 L56 -78 L62 0Z" fill={GOLD} /><path d="M0 0 L0 -112 L30 -52 L56 -78 L62 0Z" fill={GOLDD} opacity="0.55" />
    <rect x="-64" y="-12" width="128" height="18" rx="6" fill={GOLDD} /><circle cx="0" cy="-48" r="9" fill="#c0392b" /><circle cx="-36" cy="-30" r="5" fill="#2e8b6a" /><circle cx="36" cy="-30" r="5" fill="#2e8b6a" /><circle cx="0" cy="-114" r="7" fill="#fbe9b4" />
  </g>
);
const SideHead = ({dir}) => (
  <g transform={`scale(${dir} 1)`}>
    <path d="M10 -70 C-30 -72 -52 -40 -52 -4 L-66 14 L-52 20 C-50 44 -30 60 10 60Z" fill={SKIND} />
    <path d="M-52 22 C-56 70 -30 104 6 112 L10 40 C-20 44 -40 36 -52 22Z" fill={BEARDD} />
    <path d="M-40 -8 q10 -7 20 0" fill="none" stroke="#3a2416" strokeWidth="4" strokeLinecap="round" /><path d="M-44 -22 q12 -8 26 -2" fill="none" stroke="#e8e2d6" strokeWidth="5" strokeLinecap="round" />
    <g transform="translate(-14 -66) rotate(-8)"><Crown s={0.72} /></g>
  </g>
);
const Face = ({blink = 0, eye = 0, open = 0, worry = 0}) => (
  <g>
    <ellipse cx="-66" cy="6" rx="12" ry="22" fill={SKIND} /><ellipse cx="66" cy="6" rx="12" ry="22" fill={SKIND} /><circle cx="-68" cy="34" r="9" fill={GOLD} /><circle cx="68" cy="34" r="9" fill={GOLD} />
    <path d="M-62 -10 C-62 -72 62 -72 62 -10 C62 40 38 72 0 76 C-38 72 -62 40 -62 -10Z" fill={SKIN} />
    <path d="M0 -58 C62 -72 62 -10 62 -10 C62 40 38 72 0 76Z" fill={SKIND} opacity="0.45" />
    <path d="M-60 18 C-62 80 -34 128 0 138 C34 128 62 80 60 18 C40 46 20 52 0 50 C-20 52 -40 46 -60 18Z" fill={BEARD} /><path d="M0 50 C20 52 40 46 60 18 C62 80 34 128 0 138Z" fill={BEARDD} opacity="0.7" />
    <path d="M-34 40 C-20 28 -6 30 0 38 C6 30 20 28 34 40 C20 42 8 44 0 42 C-8 44 -20 42 -34 40Z" fill="#fbf9f3" />
    {open > 0.06 ? <g><ellipse cx="0" cy={50 + open * 4} rx={11 + 3 * open} ry={2 + 10 * open} fill="#4a1414" /><ellipse cx="0" cy={55 + open * 9} rx={7 + 2 * open} ry={1 + 4 * open} fill="#c0564a" /></g> : <path d={`M-10 46 q10 ${7 - worry * 10} 20 0`} fill="none" stroke="#a8573f" strokeWidth="4" strokeLinecap="round" />}
    <path d="M-6 -12 L-10 22 Q0 28 10 22 L6 -12" fill={SKIND} opacity="0.5" />
    {[-1, 1].map((d) => (
      <g key={d} transform={`translate(${d * 28} -6)`}>
        <path d={`M-16 0 Q0 ${-12 * (1 - blink) + eye * 5} 16 0 Q0 ${9 * (1 - blink)} -16 0Z`} fill="#fffaf0" /><circle cx={eye * d * 0 + eye * 4} cy="-1" r={6 * (1 - blink)} fill="#2a1a12" />
        <path d={`M-18 -1 Q0 ${-14 * (1 - blink) + eye * 6} 18 -1`} fill="none" stroke="#2a1a12" strokeWidth="3" strokeLinecap="round" />
        <path d={`M-19 ${-17 + eye * 4 * d + worry * (d > 0 ? -8 : 6)} Q0 ${-27 + eye * 6} 19 ${-17 - eye * 5 * d + worry * (d > 0 ? 6 : -8)}`} fill="none" stroke="#efe9dc" strokeWidth="6" strokeLinecap="round" />
      </g>
    ))}
    <path d="M-5 -46 L0 -30 L5 -46Z" fill="#c0392b" /><path d="M-22 -40 h44 M-20 -48 h40" stroke="#fbf3df" strokeWidth="3" opacity="0.8" />
    <g transform="translate(0 -56)"><Crown /></g>
  </g>
);
const Arm = ({d, w = 38}) => <g><path d={d} fill="none" stroke={SKIND} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" /><path d={d} fill="none" stroke={SKIN} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></g>;
const Bangle = ({x, y, r = 0}) => <g transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-24" y="-7" width="48" height="14" rx="6" fill={GOLD} /><rect x="-24" y="-1" width="48" height="4" fill={GOLDD} /></g>;
const Brahma = ({k, eye = 0, bow = 0, fifth = 0, open = 0, worry = 0}) => {
  const br = Math.sin(k / 22) * 4; const bl = ((k + 40) % 130) < 5 ? 1 : 0;
  return (
    <g>
      <circle cx="0" cy="-150" r="210" fill="none" stroke="#fbe9b4" strokeWidth="5" opacity="0.5" /><circle cx="0" cy="-150" r="226" fill="none" stroke="#fbe9b4" strokeWidth="2" opacity="0.3" />
      {/* back arms */}
      <Arm d={`M-84 ${20 + br} L-196 ${-6 + br} L-214 ${-128 + br}`} /><Arm d={`M84 ${20 + br} L196 ${-6 + br} L214 ${-128 + br}`} />
      <Bangle x={-207} y={-84 + br} r={8} /><Bangle x={207} y={-84 + br} r={-8} />
      {/* book */}
      <g transform={`translate(-222 ${-176 + br}) rotate(-12)`}><rect x="-48" y="-34" width="96" height="62" rx="5" fill="#6b3a1e" /><rect x="-42" y="-28" width="84" height="50" fill="#f1e2bb" /><path d="M-34 -16 h68 M-34 -4 h68 M-34 8 h52" stroke="#9a7a4a" strokeWidth="3" /><rect x="-6" y="-34" width="12" height="62" fill="#a8312a" /></g>
      <ellipse cx="-214" cy={-140 + br} rx="24" ry="20" fill={SKIN} />
      {/* rosary */}
      <g transform={`translate(214 ${-150 + br})`}><ellipse cx="0" cy="12" rx="24" ry="20" fill={SKIN} />{[...Array(16)].map((_, i) => { const a = (i / 16) * Math.PI * 2; return <circle key={i} cx={Math.sin(a) * 30 + 6} cy={-44 + Math.cos(a) * 44 + 10} r="6.5" fill={i % 4 ? '#7a3b1c' : GOLD} />; })}</g>
      {/* legs */}
      <path d="M-236 300 C-250 214 -110 196 0 208 C110 196 250 214 236 300 C150 344 -150 344 -236 300Z" fill={RED} />
      <path d="M0 208 C110 196 250 214 236 300 C150 344 60 342 0 340Z" fill={REDD} opacity="0.6" />
      <path d="M-200 292 C-90 250 60 252 150 300" fill="none" stroke={GOLD} strokeWidth="9" /><path d="M210 284 C120 250 -40 258 -120 310" fill="none" stroke={GOLDD} strokeWidth="7" opacity="0.8" />
      <ellipse cx="-150" cy="306" rx="46" ry="20" fill={SKIN} /><ellipse cx="156" cy="304" rx="46" ry="20" fill={SKIND} />
      {/* torso */}
      <path d={`M-96 214 C-112 120 -108 50 -86 ${4 + br} L86 ${4 + br} C108 50 112 120 96 214Z`} fill={SKIN} />
      <path d={`M0 ${4 + br} L86 ${4 + br} C108 50 112 120 96 214 L0 214Z`} fill={SKIND} opacity="0.45" />
      <path d="M-98 176 C-40 196 40 196 98 176 L100 222 C40 236 -40 236 -100 222Z" fill={GOLD} /><rect x="-18" y="178" width="36" height="46" rx="8" fill={GOLDD} /><circle cx="0" cy="200" r="9" fill="#c0392b" />
      <path d={`M-62 ${10 + br} Q0 ${96 + br} 62 ${10 + br}`} fill="none" stroke={GOLD} strokeWidth="10" /><path d={`M-44 ${12 + br} Q0 ${62 + br} 44 ${12 + br}`} fill="none" stroke={GOLDD} strokeWidth="7" /><circle cx="0" cy={56 + br} r="12" fill="#2e8b6a" stroke={GOLD} strokeWidth="4" />
      <path d={`M-70 ${12 + br} C-20 90 40 150 84 190`} fill="none" stroke="#fbf6e6" strokeWidth="5" />
      {/* upper cloth */}
      <path d={`M-92 ${10 + br} C-130 60 -120 130 -150 180 L-126 190 C-100 140 -96 80 -70 ${22 + br}Z`} fill="#e9c36a" opacity="0.95" />
      {/* front arms */}
      <Arm d={`M-90 ${30 + br} L-150 ${126 + br} L-176 ${214}`} /><Arm d={`M90 ${30 + br} L156 ${120 + br} L150 ${36 + br}`} />
      <Bangle x={-166} y={182} r={-18} /><Bangle x={152} y={70 + br} r={0} /><Bangle x={-116} y={72 + br} r={-58} /><Bangle x={120} y={70 + br} r={56} />
      {/* kamandalu */}
      <g transform="translate(-186 262)"><path d="M-34 -6 C-44 40 -24 62 0 62 C24 62 44 40 34 -6Z" fill="#b97a34" /><path d="M0 -6 L34 -6 C44 40 24 62 0 62Z" fill="#8c5a22" opacity="0.7" /><rect x="-20" y="-20" width="40" height="16" rx="5" fill="#8c5a22" /><path d="M30 10 Q60 0 62 -22" fill="none" stroke="#8c5a22" strokeWidth="9" strokeLinecap="round" /><path d="M-22 -22 Q0 -66 22 -22" fill="none" stroke={GOLDD} strokeWidth="6" /></g>
      <ellipse cx="-180" cy="222" rx="24" ry="20" fill={SKIN} />
      {/* blessing hand */}
      <g transform={`translate(150 ${8 + br})`}><path d="M-26 20 C-30 -10 -26 -44 -22 -56 L22 -56 C26 -44 30 -10 26 20Z" fill={SKIN} />{[-17, -6, 5, 16].map((x, i) => <rect key={i} x={x - 5} y={-92 + Math.abs(i - 1.5) * 7} width="11" height="44" rx="5.5" fill={SKIN} stroke={SKIND} strokeWidth="1.5" />)}<rect x="-40" y="-36" width="16" height="34" rx="8" fill={SKIN} transform="rotate(-24 -32 -20)" /><circle cx="0" cy="-18" r="9" fill="#c0392b" opacity="0.8" /></g>
      {/* heads */}
      <g transform={`translate(0 ${-92 + br}) rotate(${bow} 0 80)`}>
        <path d="M-40 60 L-46 100 L46 100 L40 60Z" fill={SKIND} />
        {fifth > 0 && <g transform="translate(0 -178) scale(0.6)" opacity={fifth}><Face /></g>}
        <g transform="translate(-74 2)"><SideHead dir={1} /></g><g transform="translate(74 2)"><SideHead dir={-1} /></g>
        <Face blink={bl} eye={eye} open={open} worry={worry} />
      </g>
    </g>
  );
};
const LotusSeat = ({w = 300}) => (
  <g>
    <ellipse cx="0" cy="54" rx={w * 1.1} ry="24" fill="#000" opacity="0.3" />
    {[-0.8, -0.48, -0.16, 0.16, 0.48, 0.8].map((f, i) => <path key={i} d={`M${f * w - 62} 26 Q${f * w} -40 ${f * w + 62} 26 Q${f * w} 64 ${f * w - 62} 26Z`} fill={i % 2 ? '#c96f8f' : '#d98aa6'} />)}
    {[-0.64, -0.32, 0, 0.32, 0.64].map((f, i) => <path key={i} d={`M${f * w - 56} 40 Q${f * w} -10 ${f * w + 56} 40 Q${f * w} 76 ${f * w - 56} 40Z`} fill={i % 2 ? '#e3a0b6' : '#edb9c9'} />)}
    <ellipse cx="0" cy="6" rx={w * 0.9} ry="18" fill="#e9b7c6" /><ellipse cx="0" cy="4" rx={w * 0.82} ry="12" fill="#c98a9e" />
  </g>
);
const GhostTemple = ({x, s, o}) => (
  <g transform={`translate(${x} 800) scale(${s})`} opacity={o} fill="none" stroke="#fbe9c9" strokeWidth={4 / s} strokeDasharray="14 12" strokeLinecap="round">
    <path d="M-110 0 L-110 -150 C-110 -300 -60 -400 -26 -440 L26 -440 C60 -400 110 -300 110 -150 L110 0Z" /><path d="M-36 0 L-36 -70 Q0 -110 36 -70 L36 0" /><path d="M0 -440 L0 -500" /><path d="M-150 0 L150 0" />
  </g>
);
const S2 = ({t, k}) => {
  const q = cl(t, 11.7, 12.5), fade = 1 - cl(t, 12.9, 13.9) * 0.75;
  const push = interpolate(t, [8.4, 14.1], [1.0, 1.06]);
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b2a55" /><stop offset="0.5" stopColor="#a8617a" /><stop offset="0.78" stopColor="#f0b98a" /><stop offset="1" stopColor="#7a5a78" /></linearGradient>
          <radialGradient id="bhalo"><stop offset="0" stopColor="#fff2c8" stopOpacity="0.9" /><stop offset="0.4" stopColor="#f8d59a" stopOpacity="0.35" /><stop offset="1" stopColor="#f8d59a" stopOpacity="0" /></radialGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a6a8e" /><stop offset="1" stopColor="#2c2244" /></linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#dawn)" />
        {[...Array(12)].map((_, i) => <polygon key={i} points={`960,430 ${960 + Math.cos((i / 12) * Math.PI * 2 + k / 400) * 1500},${430 + Math.sin((i / 12) * Math.PI * 2 + k / 400) * 1500} ${960 + Math.cos((i / 12) * Math.PI * 2 + 0.13 + k / 400) * 1500},${430 + Math.sin((i / 12) * Math.PI * 2 + 0.13 + k / 400) * 1500}`} fill="#fff0c8" opacity="0.07" />)}
        <circle cx="960" cy="430" r={560 + 20 * Math.sin(k / 26)} fill="url(#bhalo)" />
        <GhostTemple x={330} s={1.0} o={q * fade * 0.9} /><GhostTemple x={1590} s={1.0} o={cl(t, 12.0, 12.8) * fade * 0.9} /><GhostTemple x={560} s={0.62} o={cl(t, 12.2, 13.0) * fade * 0.6} /><GhostTemple x={1360} s={0.62} o={cl(t, 12.3, 13.1) * fade * 0.6} />
        <rect y="800" width="1920" height="280" fill="url(#water)" />
        {[...Array(9)].map((_, i) => <ellipse key={i} cx={960 + Math.sin(k / 50 + i) * 30} cy={830 + i * 28} rx={520 - i * 20} ry="3" fill="#fbe0b8" opacity={0.22 - i * 0.02} />)}
        {[[240, 900], [420, 960], [1500, 950], [1700, 890]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y + Math.sin(k / 30 + i) * 3})`}><ellipse cx="0" cy="6" rx="60" ry="12" fill="#3f6a56" /><path d="M-22 4 Q0 -34 22 4 Q0 14 -22 4Z" fill="#e3a0b6" /><path d="M-10 4 Q0 -44 10 4Z" fill="#f3c7d4" /></g>)}
      </svg>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 60%'}}>
        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
          <g transform="translate(960 846)"><LotusSeat w={330} /></g>
          <g transform="translate(960 536) scale(0.98)"><Brahma k={k} /></g>
        </svg>
      </AbsoluteFill>
      <Dust k={k} n={36} /><Vig s={0.78} cy={44} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ Pushkar */
const S3 = ({t, k}) => {
  const push = interpolate(t, [14, 20.1], [1.0, 1.08]); const g = cl(t, 16.4, 17.6);
  const Temple = ({refl}) => (
    <g opacity={refl ? 0.32 : 1}>
      <rect x="-190" y="-150" width="380" height="150" fill="#efe6d6" /><rect x="0" y="-150" width="190" height="150" fill="#cfc2ae" />
      <rect x="-210" y="-164" width="420" height="18" fill="#d9ccb6" />
      {[-150, -90, 90, 150].map((x, i) => <path key={i} d={`M${x - 20} -40 L${x - 20} -100 Q${x} -124 ${x + 20} -100 L${x + 20} -40Z`} fill="#8a6f66" />)}
      <path d="M-34 0 L-34 -92 Q0 -128 34 -92 L34 0Z" fill="#ffb648" opacity={0.5 + 0.5 * g} />
      <path d="M-78 -164 C-78 -290 -40 -372 -18 -404 L18 -404 C40 -372 78 -290 78 -164Z" fill="#c9482f" /><path d="M0 -164 L0 -404 L18 -404 C40 -372 78 -290 78 -164Z" fill="#9a3020" />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${-74 + i * 5} ${-200 - i * 40} L${74 - i * 5} ${-200 - i * 40}`} stroke="#7a2416" strokeWidth="4" />)}
      <ellipse cx="0" cy="-410" rx="26" ry="9" fill="#9a3020" /><path d="M-8 -416 Q0 -446 8 -416Z" fill={GOLD} /><rect x="-2" y="-470" width="4" height="30" fill={GOLD} />
      {!refl && <path d={`M2 -470 Q${26 + 5 * Math.sin(k / 8)} -464 ${44 + 4 * Math.sin(k / 6)} -456 Q${22 + 4 * Math.sin(k / 7)} -452 2 -448Z`} fill="#f2a53a" />}
      {[-150, 150].map((x) => <g key={x}><rect x={x - 32} y="-206" width="64" height="44" fill="#efe6d6" /><path d={`M${x - 38} -206 Q${x} -262 ${x + 38} -206Z`} fill="#d9ccb6" /><rect x={x - 2} y="-270" width="4" height="20" fill={GOLD} /></g>)}
    </g>
  );
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="psky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#27345e" /><stop offset="0.55" stopColor="#c07a66" /><stop offset="0.8" stopColor="#f2c186" /></linearGradient>
          <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d89a78" /><stop offset="0.35" stopColor="#6c6a94" /><stop offset="1" stopColor="#1f2342" /></linearGradient>
          <radialGradient id="doorGlow3"><stop offset="0" stopColor="#ffd88a" stopOpacity="0.75" /><stop offset="1" stopColor="#ffb44a" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#psky)" />
        <circle cx="1420" cy="330" r="60" fill="#ffe9b8" opacity="0.9" /><circle cx="1420" cy="330" r="200" fill="url(#doorGlow3)" opacity="0.6" />
        <path d="M0 640 L0 520 Q160 430 330 500 Q520 400 700 490 Q900 420 1080 500 Q1300 410 1500 490 Q1700 430 1920 510 L1920 640Z" fill="#8a5d6a" />
        <path d="M0 640 L0 570 Q260 500 480 560 Q760 500 1000 570 Q1300 510 1560 570 Q1760 530 1920 580 L1920 640Z" fill="#6b4658" />
        <rect y="636" width="1920" height="444" fill="url(#lake)" />
      </svg>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 58%'}}>
        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
          {/* ghats */}
          {[0, 1, 2, 3].map((i) => <rect key={i} x={380 - i * 40} y={600 + i * 12} width={1160 + i * 80} height="13" fill={['#e6d9c2', '#d6c7ae', '#c4b398', '#b09f86'][i]} />)}
          {[[480, 0.5], [1420, 0.5]].map(([x, s], i) => <g key={i} transform={`translate(${x} 600) scale(${s})`}><rect x="-120" y="-130" width="240" height="130" fill="#d8cbb6" /><path d="M-60 -130 Q0 -220 60 -130Z" fill="#c2b29a" /><rect x="-16" y="-70" width="32" height="70" fill="#7b6258" /></g>)}
          <ellipse cx="960" cy="520" rx="420" ry="260" fill="url(#doorGlow3)" opacity={0.25 + 0.5 * g} />
          <g transform="translate(960 600)"><Temple /></g>
          <g transform={`translate(960 652) scale(1 -0.7) skewX(${Math.sin(k / 30) * 0.6})`}><Temple refl /></g>
          {[...Array(10)].map((_, i) => <ellipse key={i} cx={960 + Math.sin(k / 45 + i * 1.3) * 26} cy={680 + i * 34} rx={300 - i * 10} ry="2.5" fill="#fbe0b8" opacity={0.3 - i * 0.022} />)}
          {[...Array(14)].map((_, i) => { const x = 300 + R(`dx${i}`) * 1320 + Math.sin(k / 60 + i) * 10, y = 700 + R(`dy${i}`) * 250; return <g key={i} opacity={cl(t, 14.4 + i * 0.12, 15.2 + i * 0.12)}><ellipse cx={x} cy={y + 5} rx="13" ry="4" fill="#7a4a2a" /><path d={`M${x - 4} ${y + 2} Q${x + Math.sin(k / 4 + i) * 2} ${y - 15} ${x + 4} ${y + 2}Z`} fill="#ffd27a" /><circle cx={x} cy={y} r="24" fill="url(#doorGlow3)" opacity="0.6" /></g>; })}
        </svg>
      </AbsoluteFill>
      <Dust k={k} n={24} /><Vig s={0.8} cy={52} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ swan */
const Wing = ({col, sh}) => (
  <g>
    <path d="M0 0 C-30 -110 -130 -200 -270 -236 C-244 -200 -236 -178 -248 -156 C-212 -158 -200 -138 -210 -116 C-174 -120 -158 -100 -166 -80 C-128 -86 -106 -64 -96 -34 C-64 -12 -22 10 0 0Z" fill={col} />
    <path d="M0 0 C-22 10 -64 -12 -96 -34 C-106 -64 -128 -86 -166 -80 C-120 -70 -70 -40 0 0Z" fill={sh} />
    <path d="M-60 -60 C-110 -120 -170 -170 -236 -208 M-40 -30 C-90 -70 -140 -100 -196 -120" stroke={sh} strokeWidth="4" fill="none" />
  </g>
);
const Swan = ({ph, crown = true, look = 0}) => {
  const w = (p) => { const v = Math.sin(p); return v >= 0 ? 0.35 + 0.65 * v : -0.25 + 0.5 * v; }; const sy = w(ph); const sy2 = w(ph - 0.4);
  return (
    <g>
      <g transform={`translate(26 -34) scale(1.25 ${sy2 * 1.25})`}><Wing col="#c9cfdf" sh="#a9b0c6" /></g>
      <path d="M-112 14 L-196 -14 L-162 14 L-208 28 L-152 38 L-186 60 L-100 46Z" fill="#e7eaf2" />
      <path d="M-124 10 C-114 -42 -20 -62 62 -42 C112 -30 134 0 122 26 C100 62 -10 72 -82 52 C-112 44 -132 32 -124 10Z" fill="#fbfcff" />
      <path d="M-124 14 C-110 44 -10 62 60 52 C100 46 124 34 122 26 C100 62 -10 72 -82 52 C-112 44 -130 30 -124 14Z" fill="#cfd6e6" />
      <g transform={`rotate(${look} 96 -8)`}>
        <path d="M92 -4 C150 -30 172 -90 142 -130 C126 -150 132 -176 156 -182" fill="none" stroke="#cfd6e6" strokeWidth="40" strokeLinecap="round" />
        <path d="M90 -8 C146 -34 166 -92 138 -132 C122 -152 128 -178 154 -184" fill="none" stroke="#fbfcff" strokeWidth="32" strokeLinecap="round" />
        <ellipse cx="166" cy="-186" rx="31" ry="23" fill="#fbfcff" />
        <path d="M190 -196 L244 -178 L192 -168Z" fill="#f08a2c" /><path d="M192 -180 L244 -178 L192 -168Z" fill="#c9661a" /><path d="M184 -200 Q196 -196 194 -184 L184 -186Z" fill="#1c1a22" />
        <circle cx="174" cy="-192" r="4.5" fill="#1c1a22" />
        {crown && <g transform="translate(160 -206) rotate(-14) scale(0.36)"><Crown /></g>}
      </g>
      <g transform={`translate(8 -30) scale(1.25 ${sy * 1.25})`}><Wing col="#fbfcff" sh="#d5dbea" /></g>
    </g>
  );
};
const Cloud = ({x, y, s = 1, o = 0.5, col = '#8fa0cf'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={col} opacity={o}>
    <ellipse cx="0" cy="0" rx="220" ry="34" /><ellipse cx="-90" cy="-22" rx="110" ry="34" /><ellipse cx="40" cy="-36" rx="130" ry="44" /><ellipse cx="150" cy="-12" rx="90" ry="28" />
  </g>
);
const FirePillar = ({x, w, k, y0, y1}) => {
  const H = y1 - y0; const n = Math.ceil(H / 110);
  return (
    <g>
      <rect x={x - w * 2.6} y={y0} width={w * 5.2} height={H} fill="url(#pglow)" />
      {[...Array(n * 2)].map((_, j) => { const i = Math.floor(j / 2), s = j % 2 ? 1 : -1; const y = y1 - (((i * 110 + (j % 2) * 55 + k * 7) % H) + H) % H; const a = 34 + 22 * Math.sin(k / 5 + j * 1.7); const e = x + s * w / 2;
        return <path key={j} d={`M${e - s * 8} ${y + 70} Q${e + s * a} ${y + 10} ${e + s * a * 0.35} ${y - 80} Q${e + s * 4} ${y - 30} ${e - s * 8} ${y - 50}Z`} fill={j % 3 ? '#ff8a1e' : '#ffb03a'} />; })}
      <rect x={x - w / 2} y={y0} width={w} height={H} fill="url(#pcore)" />
      {[...Array(n)].map((_, i) => { const y = y1 - (((i * 110 + k * 11 + R(`ps${i}`) * 300) % H) + H) % H; const dx = (R(`pd${i}`) - 0.5) * w * 0.7; return <rect key={i} x={x + dx - 3} y={y} width="6" height={70 + R(`pl${i}`) * 80} rx="3" fill="#fffbe6" opacity="0.5" />; })}
    </g>
  );
};
const SkyDefs = () => (
  <defs>
    <linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b1f" /><stop offset="0.6" stopColor="#152352" /><stop offset="1" stopColor="#2c3f7a" /></linearGradient>
    <linearGradient id="pglow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ff7a18" stopOpacity="0" /><stop offset="0.5" stopColor="#ff8a24" stopOpacity="0.55" /><stop offset="1" stopColor="#ff7a18" stopOpacity="0" /></linearGradient>
    <linearGradient id="pcore" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ff6a10" /><stop offset="0.22" stopColor="#ffb02e" /><stop offset="0.5" stopColor="#fff3c4" /><stop offset="0.78" stopColor="#ffb02e" /><stop offset="1" stopColor="#ff6a10" /></linearGradient>
    <radialGradient id="fglow"><stop offset="0" stopColor="#fff3c0" stopOpacity="0.8" /><stop offset="1" stopColor="#fff3c0" stopOpacity="0" /></radialGradient>
  </defs>
);
const Stars = ({k, n = 90, dy = 0}) => <g>{[...Array(n)].map((_, i) => <circle key={i} cx={R(`ax${i}`) * 1920} cy={(R(`ay${i}`) * 1080 + dy * (0.3 + R(`az${i}`) * 0.5)) % 1080} r={0.8 + R(`ar${i}`) * 1.9} fill="#eef2ff" opacity={0.25 + 0.5 * Math.abs(Math.sin(k / 18 + i * 1.3))} />)}</g>;

const S5 = ({t, k}) => {
  const ph = (t < 42.8 ? 2.1 * t : 2.1 * 42.8 + 1.15 * (t - 42.8)) * Math.PI * 2;
  const pan = cl(t, 37.3, 39.4);
  const z = 1.3 - 0.28 * pan - 0.14 * cl(t, 40.15, 40.75) - 0.14 * cl(t, 40.98, 41.5) - 0.16 * cl(t, 41.55, 42.2);
  const tilt = cl(t, 44.4, 46.9);
  const fx = 700 + 520 * pan, fy = 560 - 1150 * tilt;
  const climb = k * 9;
  const swx = 700 + Math.sin(t * 0.9) * 14, swy = 560 + Math.sin(t * 1.7) * 10 + cl(t, 42.8, 44.4) * 46 + 0.5 * tilt * 160;
  const inn = cl(t, 27.1, 28.4);
  return (
    <AbsoluteFill style={{background: '#070b1f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs />
        <rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} dy={climb * 0.12 + tilt * 500} />
        <g transform={`translate(960 540) scale(${z}) translate(${-fx} ${-fy})`}>
          {[...Array(16)].map((_, i) => { const span = 5200; const y = ((R(`cy${i}`) * span + climb * (0.5 + R(`cs${i}`) * 0.5)) % span) - 2600 + 560; return <Cloud key={i} x={R(`cx${i}`) * 4400 - 1500} y={y} s={0.7 + R(`cz${i}`) * 0.9} o={0.16 + R(`co${i}`) * 0.2} />; })}
          <FirePillar x={1600} w={250} k={k} y0={-3400} y1={3400} />
          <ellipse cx={swx + 40} cy={swy - 40} rx="420" ry="300" fill="url(#fglow)" opacity={0.16 + 0.1 * pan} />
          <g transform={`translate(${swx} ${swy + (1 - inn) * 260}) rotate(-36) scale(0.92)`}><Swan ph={ph} /></g>
          {[...Array(12)].map((_, i) => { const span = 5200; const y = ((R(`dy${i}`) * span + climb * (1.2 + R(`ds${i}`))) % span) - 2600 + 560; return <Cloud key={i} x={R(`dx${i}`) * 4400 - 1500} y={y} s={1.1 + R(`dz${i}`) * 1.0} o={0.1 + R(`do${i}`) * 0.12} col="#b9c6ea" />; })}
          {[...Array(40)].map((_, i) => { const y = 3400 - ((i * 170 + k * 13) % 6800); const x = 1600 + (R(`ex${i}`) - 0.5) * 760 + Math.sin(k / 14 + i) * 20; return <circle key={i} cx={x} cy={y} r={2.5 + R(`er${i}`) * 3.5} fill="#ffcf6a" opacity={0.35 + R(`eo${i}`) * 0.5} />; })}
        </g>
        <rect width="1920" height="1080" fill="#ff8a24" opacity={0.05 + 0.07 * pan + 0.02 * Math.sin(k / 6)} />
      </svg>
      <Vig s={0.82} cy={48} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ ketaki */
const Ketaki = ({k = 0}) => (
  <g>
    {[-64, -40, -18, 18, 40, 64].map((a, i) => <path key={i} transform={`rotate(${a + Math.sin(k / 16 + i) * 2})`} d="M0 0 C-22 -40 -20 -120 0 -190 C20 -120 22 -40 0 0Z" fill={i % 2 ? '#f7ecc2' : '#efe0a6'} stroke="#cdb96e" strokeWidth="2" />)}
    {[-28, 0, 28].map((a, i) => <path key={i} transform={`rotate(${a})`} d="M0 0 C-16 -40 -14 -100 0 -150 C14 -100 16 -40 0 0Z" fill="#fff8dc" />)}
    {[-28, 0, 28].map((a, i) => <path key={i} transform={`rotate(${a})`} d="M0 -8 L0 -140" stroke="#d9c77e" strokeWidth="2.5" />)}
    <path d="M-12 0 C-12 -50 12 -50 12 0 C8 14 -8 14 -12 0Z" fill="#e8c95a" />
    <path d="M-5 10 Q-2 44 6 70" stroke="#6f8a4a" strokeWidth="9" fill="none" strokeLinecap="round" />
  </g>
);
const S6 = ({t, k}) => {
  const ph = 1.2 * t * Math.PI * 2; const f = cl(t, 47.6, 56.4);
  const fy = -160 + 760 * f, fx = 1030 + Math.sin(t * 1.6) * 70, fr = Math.sin(t * 1.6 + 1) * 24 + 160;
  const z = 1 + 0.22 * cl(t, 50.4, 52.4); const look = -8 - 16 * cl(t, 47.8, 48.8) + 22 * cl(t, 52.5, 55.5);
  return (
    <AbsoluteFill style={{background: '#070b1f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs />
        <rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} dy={k * 0.5} />
        <g transform={`translate(960 540) scale(${z}) translate(-960 -540)`}>
          {[...Array(8)].map((_, i) => <Cloud key={i} x={R(`fx${i}`) * 2200 - 140} y={((R(`fy${i}`) * 1500 + k * 1.6) % 1500) - 200} s={0.8 + R(`fz${i}`)} o={0.14 + R(`fo${i}`) * 0.16} />)}
          <FirePillar x={1640} w={280} k={k} y0={-300} y1={1400} />
          <g transform={`translate(560 ${620 + Math.sin(t * 1.5) * 12}) rotate(-14) scale(1.05)`}><Swan ph={ph} look={look} /></g>
          <circle cx={fx} cy={fy} r={170 + 14 * Math.sin(k / 9)} fill="url(#fglow)" opacity={0.35 + 0.4 * cl(t, 50.5, 51.2)} />
          <g transform={`translate(${fx} ${fy}) rotate(${fr}) scale(0.95)`}><Ketaki k={k} /></g>
          {[...Array(10)].map((_, i) => { const yy = fy - 60 - i * 34, o = Math.max(0, 0.6 - i * 0.06); return <circle key={i} cx={1030 + Math.sin((t - i * 0.07) * 1.6) * 70 + (R(`tr${i}`) - 0.5) * 30} cy={yy} r={3.2 - i * 0.2} fill="#fff3c0" opacity={o * Math.abs(Math.sin(k / 5 + i))} />; })}
        </g>
        <rect width="1920" height="1080" fill="#ff8a24" opacity={0.1 + 0.02 * Math.sin(k / 6)} />
      </svg>
      <Vig s={0.84} cy={48} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ the idea */
const S7 = ({t, k}) => {
  const dark = cl(t, 59.2, 62.6); const eye = cl(t, 57.2, 58.4); const z = interpolate(t, [56.4, 64.2], [1.0, 1.1]);
  const bl = (k % 120) < 5 ? 1 : 0;
  return (
    <AbsoluteFill style={{background: '#070b1f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <SkyDefs />
        <rect width="1920" height="1080" fill="url(#nsky)" /><Stars k={k} n={60} />
        <FirePillar x={1800} w={300} k={k} y0={-200} y1={1300} />
        <g transform={`translate(960 540) scale(${z}) translate(-960 -540)`}>
          <circle cx="640" cy="470" r="520" fill="url(#fglow)" opacity="0.2" />
          <g transform="translate(640 520) scale(3.1)">
            <path d="M-78 150 C-70 100 70 100 78 150 L96 220 L-96 220Z" fill={SKIND} /><path d="M-60 104 Q0 170 60 104" fill="none" stroke={GOLD} strokeWidth="9" />
            <g transform="translate(-74 2)"><SideHead dir={1} /></g><g transform="translate(74 2)"><SideHead dir={-1} /></g>
            <Face blink={bl} eye={eye} />
            <g fill="#0a0d24" opacity={0.12 + 0.5 * dark}><path d="M0 -56.5 C-31 -56.5 -62 -41 -62 -10 C-62 40 -38 72 0 76Z" /><path d="M-60 18 C-62 80 -34 128 0 138 L0 76 C-38 72 -56 44 -60 18Z" /></g>
          </g>
          <circle cx="1270" cy="560" r={230 + 14 * Math.sin(k / 9)} fill="url(#fglow)" opacity={0.5 - 0.25 * dark} />
          <g transform={`translate(1270 ${640 + Math.sin(t * 1.4) * 14}) rotate(${Math.sin(t * 1.1) * 7}) scale(1.75)`}><Ketaki k={k} /></g>
        </g>
        <rect width="1920" height="1080" fill="#ff7a18" opacity="0.09" />
        <rect width="1920" height="1080" fill="#05040c" opacity={0.42 * dark} />
      </svg>
      <Vig s={0.86 + 0.1 * dark} cy={48} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ manuscript */
const S4 = ({t, k}) => {
  const z = interpolate(t, [20, 27.2], [1.0, 1.14]); const draw = cl(t, 24.0, 26.0); const fl = 0.9 + 0.1 * Math.sin(k / 3.1) * Math.sin(k / 7.3);
  const swanPath = 'M-150 30 C-150 -10 -70 -30 0 -20 C50 -14 80 6 74 30 C60 58 -40 62 -100 50 C-130 44 -150 44 -150 30 M56 4 C100 -14 116 -60 96 -90 C84 -108 90 -128 112 -130 C134 -130 138 -112 126 -106 L160 -98 L124 -92 M-20 -22 C-50 -90 -110 -130 -190 -140 C-160 -110 -150 -80 -120 -60 C-90 -40 -60 -26 -20 -22 M-150 34 L-200 20 L-176 40 L-204 52 L-150 48';
  return (
    <AbsoluteFill style={{background: '#120c08'}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '50% 62%'}}>
        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
          <defs>
            <linearGradient id="lib" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#160e09" /><stop offset="1" stopColor="#3a281a" /></linearGradient>
            <radialGradient id="lamp4"><stop offset="0" stopColor="#ffc35c" stopOpacity="0.75" /><stop offset="0.45" stopColor="#ffa940" stopOpacity="0.2" /><stop offset="1" stopColor="#ffa940" stopOpacity="0" /></radialGradient>
            <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ecd9a4" /><stop offset="1" stopColor="#cdb47a" /></linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#lib)" />
          {[150, 400, 650].map((y, r) => <g key={r}><rect x="0" y={y + 150} width="1920" height="16" fill="#2a1b11" />{[...Array(30)].map((_, i) => { const hh = 90 + R(`bh${r}${i}`) * 50; const sk = (i >= 11 && i <= 18); return sk && r > 0 ? null : <rect key={i} x={20 + i * 64} y={y + 150 - hh} width={30 + R(`bw${r}${i}`) * 22} height={hh} rx="3" fill={['#5a2f1c', '#6a4424', '#3f3a2a', '#73331f', '#4d3a55'][Math.floor(R(`bc${r}${i}`) * 5)]} opacity="0.6" />; })}</g>)}
          <circle cx="1330" cy="560" r={620 * fl} fill="url(#lamp4)" />
          <rect y="820" width="1920" height="260" fill="#2b1c11" /><rect y="820" width="1920" height="10" fill="#4a3220" />
          {/* stand */}
          <path d="M620 830 L760 700 L1160 700 L1300 830Z" fill="#5b3a1f" /><path d="M960 830 L960 700 L1160 700 L1300 830Z" fill="#432a15" />
          <path d="M700 838 L1220 838 L1250 880 L670 880Z" fill="#3a2412" />
          {/* manuscript */}
          <g transform="translate(960 640)">
            <path d="M-420 60 L-400 -150 L400 -150 L420 60Z" fill="#8a6b3a" /><path d="M-408 46 L-390 -138 L390 -138 L408 46Z" fill="url(#leaf)" />
            <rect x="-398" y="-52" width="796" height="5" fill="#b89a5c" opacity="0.7" />
            <circle cx="-190" cy="-48" r="9" fill="#6b4a22" /><circle cx="190" cy="-48" r="9" fill="#6b4a22" />
            {[...Array(4)].map((_, i) => <path key={i} d={`M-360 ${-116 + i * 18} H-120 M120 ${-116 + i * 18} H360`} stroke="#6a4a22" strokeWidth="4" strokeDasharray="26 7 40 9 18 6" opacity="0.6" />)}
            {[...Array(4)].map((_, i) => <path key={i} d={`M-366 ${-30 + i * 18} H-126 M126 ${-30 + i * 18} H366`} stroke="#6a4a22" strokeWidth="4" strokeDasharray="34 8 20 6 44 9" opacity="0.6" />)}
            <g transform="translate(14 -34) scale(0.52)">
              <path d={swanPath} fill="none" stroke="#fff0b0" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} opacity={0.35 * draw} />
              <path d={swanPath} fill="none" stroke="#8a3d16" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} />
            </g>
            <path d="M-420 60 L420 60 L428 82 L-428 82Z" fill="#6f5326" />
          </g>
          {/* lamp */}
          <g transform="translate(1330 760)"><path d="M-70 60 L-46 20 L46 20 L70 60Z" fill="#b98a2c" /><rect x="-12" y="-40" width="24" height="60" fill="#a57a22" /><path d="M-58 -40 Q0 -4 58 -40 L44 -56 L-44 -56Z" fill="#d7a53a" /><path d={`M-13 -56 Q${Math.sin(k / 4) * 5} ${-130 * fl} 13 -56 Q0 -46 -13 -56Z`} fill="#ffd27a" /><path d={`M-6 -58 Q${Math.sin(k / 4) * 3} ${-98 * fl} 6 -58Z`} fill="#fff6d8" /></g>
          <circle cx="1330" cy="690" r={150 * fl} fill="url(#lamp4)" />
        </svg>
      </AbsoluteFill>
      <Dust k={k} n={30} /><Vig s={0.9} cy={58} /><Foot />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ the quarrel */
const VishnuSil = () => { const D = '#0c1b40'; return (
  <g fill={D}>
    <path d="M-92 -262 L-170 -330 L-214 -430" fill="none" stroke={D} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" /><path d="M72 -262 L150 -330 L176 -420" fill="none" stroke={D} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-96 -250 L-150 -130 L-118 -30" fill="none" stroke={D} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" /><path d="M76 -250 L140 -150 L214 -196" fill="none" stroke={D} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-112 -276 C-80 -296 60 -296 92 -276 C104 -200 70 -110 64 -30 L-84 -30 C-90 -110 -124 -200 -112 -276Z" />
    <path d="M-88 -34 C-104 80 -112 220 -120 340 L-14 340 L-10 60 L-6 340 L100 340 C92 220 84 80 68 -34Z" />
    <path d="M-120 -250 C-190 -120 -170 60 -210 200 L-180 210 C-150 80 -150 -100 -96 -236Z" opacity="0.9" />
    <rect x="-26" y="-320" width="32" height="40" /><ellipse cx="-10" cy="-366" rx="54" ry="64" /><ellipse cx="-66" cy="-362" rx="10" ry="18" /><ellipse cx="46" cy="-362" rx="10" ry="18" />
    <path d="M-62 -404 C-60 -470 -40 -520 -10 -566 C20 -520 40 -470 42 -404Z" /><path d="M-66 -398 C-40 -416 20 -416 46 -398 L46 -384 C20 -400 -40 -400 -66 -384Z" fill={GOLD} />
    <path d="M-10 -566 L-10 -590" stroke={GOLD} strokeWidth="6" /><path d="M-44 -430 Q-10 -450 24 -430 M-34 -470 Q-10 -486 14 -470" fill="none" stroke={GOLD} strokeWidth="5" />
    <circle cx="-66" cy="-340" r="8" fill={GOLD} /><circle cx="46" cy="-340" r="8" fill={GOLD} />
    <circle cx="-218" cy="-478" r="50" fill="none" stroke={GOLD} strokeWidth="10" /><circle cx="-218" cy="-478" r="30" fill="none" stroke={GOLD} strokeWidth="4" /><circle cx="-218" cy="-478" r="10" fill={GOLD} />
    {[...Array(8)].map((_, i) => <path key={i} transform={`rotate(${i * 45} -218 -478)`} d="M-218 -536 l7 12 h-14Z" fill={GOLD} />)}
    <path d="M160 -424 C150 -470 196 -496 214 -462 C226 -436 204 -410 184 -420 C196 -430 196 -446 184 -448Z" fill="#efe7d2" />
    <path d="M-84 -276 Q-10 -206 64 -276" fill="none" stroke={GOLD} strokeWidth="7" /><path d="M-60 -280 Q-10 -240 40 -280" fill="none" stroke={GOLD} strokeWidth="5" />
    <path d="M-88 -40 Q-10 -18 68 -40 L68 -22 Q-10 0 -88 -22Z" fill={GOLD} />
    <path d="M-104 100 Q-10 130 84 100 M-112 220 Q-10 250 92 220" fill="none" stroke={GOLD} strokeWidth="4" opacity="0.6" />
    <path d="M-140 -70 l-22 10 M132 -150 l10 -20" stroke={GOLD} strokeWidth="9" strokeLinecap="round" />
  </g>); };
const S8 = ({t, k}) => {
  const inn = cl(t, 64.2, 66.2); const crack = cl(t, 68.0, 68.5); const flash = Math.max(0, 1 - Math.abs(t - 68.25) / 0.35);
  const sep = crack * 46;
  return (
    <AbsoluteFill style={{background: '#06101f'}}>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="cos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#081428" /><stop offset="0.6" stopColor="#14365a" /><stop offset="1" stopColor="#1d5a6e" /></linearGradient>
          <radialGradient id="mid"><stop offset="0" stopColor="#ffe6a8" stopOpacity="0.8" /><stop offset="1" stopColor="#ffe6a8" stopOpacity="0" /></radialGradient>
          <linearGradient id="pglow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ff7a18" stopOpacity="0" /><stop offset="0.5" stopColor="#ff8a24" stopOpacity="0.55" /><stop offset="1" stopColor="#ff7a18" stopOpacity="0" /></linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#cos)" /><Stars k={k} n={70} />
        <ellipse cx="960" cy="520" rx="700" ry="520" fill="url(#mid)" opacity={0.18 + 0.5 * flash} />
        {[...Array(7)].map((_, i) => <path key={i} d={`M-100 ${800 + i * 40} ${[...Array(12)].map((__, j) => `Q${j * 190 - 5 + Math.sin(k / 30 + i) * 30} ${770 + i * 40 + (j % 2 ? 22 : -22)} ${j * 190 + 90} ${800 + i * 40}`).join(' ')} L2100 1080 L-100 1080Z`} fill={['#1b4d66', '#17425c', '#143a54', '#11324b', '#0e2b42', '#0c2539', '#0a2032'][i]} />)}
        <g transform={`translate(${520 - sep - (1 - inn) * 200} 780) scale(0.95)`} opacity={inn}><VishnuSil /></g>
        <g transform={`translate(${1400 + sep + (1 - inn) * 200} 520) scale(0.86)`} opacity={inn} style={{filter: `brightness(${0.42 + 0.5 * flash}) saturate(0.8)`}}><g transform="translate(0 316)"><LotusSeat w={300} /></g><Brahma k={k} /></g>
        
        <path d="M960 -20 L930 180 L990 300 L920 470 L1000 610 L940 760 L980 900 L950 1100" fill="none" stroke="#ffd98a" strokeWidth={10 * crack} strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - crack} />
        <path d="M960 -20 L930 180 L990 300 L920 470 L1000 610 L940 760 L980 900 L950 1100" fill="none" stroke="#fffbe8" strokeWidth={4 * crack} strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - crack} />
        <rect x="660" y="0" width="600" height="1080" fill="url(#pglow)" opacity={0.5 * crack} />
        <rect width="1920" height="1080" fill="#fff3d0" opacity={0.3 * flash} />
      </svg>
      <Dust k={k} n={30} /><Vig s={0.84} cy={48} /><Foot />
    </AbsoluteFill>
  );
};

const SC = [S1, S2, S3, S4, S5, S6, S7, S8];
export const Aru = () => {
  const k = useCurrentFrame(); const t = k / 30;
  return (
    <AbsoluteFill style={{background: '#050406'}}>
      <Fonts />
      {SC.map((S, i) => { const a = B[i], b = B[i + 1]; if (t < a - 0.05 || t > b + 0.05) return null; const o = Math.min(i === 0 ? cl(t, 0, 0.9) : cl(t, a, a + 0.5), 1 - cl(t, b - (i === 7 ? 1.4 : 0.5), b)); return <AbsoluteFill key={i} style={{opacity: o}}><S t={t} k={k} /></AbsoluteFill>; })}
      <Caption t={t} />
    </AbsoluteFill>
  );
};

export {cl, ez, R, CREAM, GOLD, GOLDD, CAPS, Caption, Fonts, Dust, Vig, Foot, Crown, Face, SideHead, Arm, Bangle, Brahma, LotusSeat, GhostTemple, Swan, Cloud, FirePillar, SkyDefs, Stars, Ketaki, Nagara, Gopuram, Palm, SC, SKIN, SKIND};
