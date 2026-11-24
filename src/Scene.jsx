import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile, random, Easing} from 'remotion';

const C = {wall: '#4b3b2b', wall2: '#261d15', pil: '#cdb680', pilS: '#9a8453', pilD: '#6f5d38', floor: '#3b2e21', cream: '#f5e8c6', gold: '#e6b548', goldD: '#b98a2c',
  skin: '#5f8cc4', skinD: '#44699c', hair: '#17151d', tiger: '#d0902f', tigerD: '#a86f1f', stripe: '#4a2a0c', bead: '#8a4a22', snake: '#3f9a5c', snakeL: '#bfe6a8'};
const ez = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.7, 0.2, 1)};
const Fonts = () => <style>{`@font-face{font-family:Cinzel;src:url(${staticFile('Cinzel[wght].ttf')});font-weight:400 900}`}</style>;

/* ---------------------------------------------------------------- Shiva */
export const Shiva = ({k, eye}) => {
  const sw = 5 * Math.sin(k / 28), sw2 = 4 * Math.sin(k / 19 + 1), br = 1 + 0.007 * Math.sin(k / 20);
  const bl = (k % 140) > 133 ? 0.15 : 1;
  const open = eye ?? interpolate(k, [150, 175], [0.38, 0.78], ez);
  const beads = (cx, cy, rx, ry, a0, a1, n, r) => [...Array(n)].map((_, i) => { const a = a0 + (a1 - a0) * i / (n - 1); return <circle key={i} cx={cx + Math.cos(a) * rx} cy={cy + Math.sin(a) * ry} r={r} fill={C.bead} />; });
  const Body = (
    <g>
      {/* legs */}
      <path d="M196 592 L190 772 L228 772 L238 592 Z" fill={C.skin} /><path d="M304 592 L310 772 L272 772 L262 592 Z" fill={C.skin} />
      <path d="M190 606 H238 V628 H190Z M262 606 H310 V628 H262Z" fill="#000" opacity="0.16" />
      <path d="M186 772 L230 772 L234 802 L158 802 Q164 782 186 772 Z" fill={C.skin} /><path d="M314 772 L270 772 L266 802 L342 802 Q336 782 314 772 Z" fill={C.skin} />
      <rect x="187" y="748" width="44" height="12" rx="6" fill={C.gold} /><rect x="269" y="748" width="44" height="12" rx="6" fill={C.gold} />
      {/* tiger-skin wrap */}
      <path d={`M190 388 L310 388 L330 470 L${320 + sw * 0.4} 606 L262 616 L254 506 L246 506 L238 616 L${180 + sw * 0.4} 606 L170 470 Z`} fill={C.tiger} />
      <path d="M238 396 L262 396 L258 520 L250 566 L242 520 Z" fill={C.tigerD} />
      <path d={`M306 396 L346 474 L${330 + sw} 540 L314 478 Z`} fill={C.tigerD} />
      {[[196, 430], [186, 470], [192, 512], [188, 556], [202, 590], [286, 426], [300, 466], [292, 510], [300, 552], [284, 592]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q12 -12 26 -2 q-12 0 -18 12 Z`} fill={C.stripe} />)}
      <rect x="184" y="376" width="132" height="24" rx="9" fill={C.gold} /><rect x="184" y="390" width="132" height="10" rx="5" fill={C.goldD} />
      <circle cx="250" cy="388" r="13" fill={C.goldD} /><circle cx="250" cy="388" r="7" fill="#d9412b" />
      {/* torso */}
      <path d="M150 214 Q250 194 350 214 Q354 264 330 314 Q312 352 306 384 L194 384 Q188 352 170 314 Q146 264 150 214 Z" fill={C.skin} />
      <path d="M190 284 Q222 304 250 288 Q278 304 310 284" stroke={C.skinD} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M250 298 V372 M226 330 Q250 338 274 330 M230 356 Q250 362 270 356" stroke={C.skinD} strokeWidth="2.4" fill="none" opacity="0.55" />
      {/* arm holding the trident */}
      <path d="M152 214 Q120 220 112 262 L106 336 Q118 354 142 344 L160 270 Q168 240 170 222 Z" fill={C.skin} />
      <path d="M106 332 L96 414 Q108 430 128 424 L142 342 Z" fill={C.skin} />
      <rect x="88" y="410" width="42" height="38" rx="14" fill={C.skin} /><path d="M92 424 H126 M92 434 H126" stroke={C.skinD} strokeWidth="2" opacity="0.6" />
      <g>{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={112 + i * 11} cy={300 - i * 1.5} r="7" fill={C.bead} />)}</g>
      <rect x="94" y="396" width="40" height="11" rx="5.5" fill={C.gold} />
      {/* blessing arm */}
      <path d="M348 214 Q380 220 388 262 L394 332 Q380 350 358 340 L340 270 Q332 240 330 222 Z" fill={C.skin} />
      <path d="M356 334 Q378 354 398 332 L416 250 L384 242 Z" fill={C.skin} />
      <path d="M380 252 L420 252 Q428 212 420 172 Q400 158 382 172 Q374 212 380 252 Z" fill="#6f9bd0" />
      <path d="M382 236 Q362 222 366 198 Q380 202 388 218 Z" fill="#6f9bd0" />
      <path d="M392 176 V214 M402 172 V214 M412 176 V214" stroke={C.skinD} strokeWidth="2" opacity="0.6" /><circle cx="400" cy="232" r="7" fill="#d9412b" opacity="0.85" />
      <g>{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={344 + i * 11} cy={294 + i * 1.5} r="7" fill={C.bead} />)}</g>
      <rect x="380" y="246" width="40" height="11" rx="5.5" fill={C.gold} transform="rotate(12 400 252)" />
      {/* neck */}
      <path d="M228 166 L272 166 L278 214 Q250 228 222 214 Z" fill={C.skin} /><ellipse cx="250" cy="198" rx="22" ry="14" fill="#3c5d94" opacity="0.8" />
      <path d="M226 172 Q250 190 274 172 L272 166 H228Z" fill="#000" opacity="0.2" />
      {/* long mala + snake */}
      {beads(250, 222, 46, 104, Math.PI * 0.06, Math.PI * 0.94, 17, 6.4)}
      <path d="M212 210 Q250 242 290 210" stroke={C.snake} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M212 210 Q250 242 290 210" stroke={C.snakeL} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d={`M290 210 Q312 194 304 170 Q${298 + sw2 * 0.6} 152 ${310 + sw2} 142`} stroke={C.snake} strokeWidth="13" fill="none" strokeLinecap="round" />
      <g transform={`translate(${sw2} 0)`}><ellipse cx="312" cy="134" rx="16" ry="21" fill={C.snake} /><ellipse cx="312" cy="138" rx="8" ry="13" fill={C.snakeL} opacity="0.75" /><circle cx="306" cy="124" r="2.4" fill="#111" /><circle cx="318" cy="124" r="2.4" fill="#111" /></g>
      {/* head */}
      <ellipse cx="204" cy="120" rx="8" ry="14" fill={C.skin} /><ellipse cx="296" cy="120" rx="8" ry="14" fill={C.skin} />
      <circle cx="204" cy="142" r="9" fill={C.gold} /><circle cx="296" cy="142" r="9" fill={C.gold} />
      <path d="M206 96 Q206 60 250 58 Q294 60 294 96 L292 132 Q288 162 250 180 Q212 162 208 132 Z" fill={C.skin} />
      <path d="M202 108 Q196 50 250 46 Q304 50 298 108 Q284 76 250 74 Q216 76 202 108 Z" fill={C.hair} />
      <path d="M222 58 Q210 4 250 -8 Q290 4 278 58 Z" fill={C.hair} /><path d="M230 40 Q250 30 270 40 M226 22 Q250 12 274 22" stroke="#34303f" strokeWidth="3" fill="none" />
      <ellipse cx="250" cy="57" rx="33" ry="8" fill={C.bead} />{[0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={223 + i * 9} cy="57" r="4.2" fill="#a86030" />)}
      <path d="M284 4 a26 26 0 1 0 14 40 a20 20 0 1 1 -14 -40Z" fill="#fff6d6" />
      {[80, 87, 94].map((y) => <rect key={y} x="226" y={y} width="48" height="3" rx="1.5" fill="#eef2fb" opacity="0.7" />)}
      <path d="M250 76 Q257 87 250 98 Q243 87 250 76Z" fill="#fff0c0" /><circle cx="250" cy="87" r="2.6" fill="#b3261e" />
      <path d="M216 106 Q232 96 246 106" stroke={C.hair} strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M254 106 Q268 96 284 106" stroke={C.hair} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {[232, 268].map((x) => (
        <g key={x} transform={`translate(${x} 120) scale(1 ${open * bl}) translate(${-x} -120)`}>
          <path d={`M${x - 14} 120 Q${x} 109 ${x + 14} 120 Q${x} 129 ${x - 14} 120Z`} fill="#f1f3f7" /><circle cx={x} cy="120" r="5.4" fill="#15131b" /><circle cx={x + 1.6} cy="118.4" r="1.5" fill="#fff" />
        </g>))}
      <path d="M218 119 Q232 108 246 119" stroke={C.hair} strokeWidth="3.2" fill="none" strokeLinecap="round" /><path d="M254 119 Q268 108 282 119" stroke={C.hair} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M250 114 L250 140 Q246 146 240 143" stroke={C.skinD} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M237 156 Q250 163 263 156" stroke="#2c456e" strokeWidth="3.2" fill="none" strokeLinecap="round" /><path d="M244 165 Q250 168 256 165" stroke="#2c456e" strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  );
  return (
    <svg viewBox="0 -50 500 920" width="480" height="883" style={{overflow: 'visible'}}>
      <defs>
        <filter id="rim" x="-15%" y="-10%" width="130%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="3" result="d" /><feFlood floodColor={C.cream} /><feComposite in2="d" operator="in" result="o" /><feMerge><feMergeNode in="o" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="dk"><feColorMatrix type="matrix" values="0.72 0 0 0 0  0 0.70 0 0 0  0 0 0.80 0 0  0 0 0 1 0" /></filter>
        <clipPath id="hf"><rect x="250" y="-60" width="300" height="960" /></clipPath>
      </defs>
      <g transform={`translate(250 802) scale(1 ${br}) translate(-250 -802)`}>
        {/* behind: cloth, hair, trident */}
        <g filter="url(#rim)">
          <path d={`M316 212 C 388 262 ${404 + sw} 392 ${380 + sw * 1.6} 548 L ${346 + sw * 1.6} 528 C 360 410 342 302 300 240 Z`} fill="#eadcb6" />
          <path d={`M346 300 C 372 380 ${368 + sw} 460 ${362 + sw * 1.6} 536`} stroke="#c9b98a" strokeWidth="3" fill="none" />
          <path d={`M200 110 C 150 180 ${134 + sw} 280 ${148 + sw} 372 C 172 350 184 300 190 262 L 208 206 Z`} fill={C.hair} />
          <path d={`M300 110 C 350 180 ${366 + sw} 280 ${352 + sw} 372 C 328 350 316 300 310 262 L 292 206 Z`} fill={C.hair} />
          <rect x="106" y="60" width="10" height="770" rx="5" fill="#dcc88c" />
          <path d="M111 -44 L126 62 H96 Z M62 8 Q56 100 111 108 Q166 100 160 8 L144 20 Q146 82 111 88 Q76 82 78 20 Z" fill="#ecd9a0" />
          <path d="M92 124 L130 124 L118 146 L130 168 L92 168 L104 146 Z" fill="#8a4a22" /><path d="M92 124 H130 M92 168 H130" stroke="#e6b548" strokeWidth="4" />
          <path d={`M118 146 C 150 150 ${160 + sw2} 176 ${150 + sw2 * 1.5} 214 L ${138 + sw2 * 1.5} 208 C 146 180 138 162 118 156 Z`} fill="#c0352b" />
        </g>
        <g filter="url(#rim)">{Body}<g clipPath="url(#hf)" filter="url(#dk)">{Body}</g></g>
      </g>
    </svg>
  );
};

/* ---------------------------------------------------------------- set */
const Arch = ({x, w, top, k, hills}) => (
  <g transform={`translate(${x},0)`}>
    <path d={`M-18 800 V${top} a${w / 2 + 18} ${w / 2 + 18} 0 0 1 ${w + 36} 0 V800 Z`} fill={C.pilD} />
    <path d={`M0 800 V${top} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V800 Z`} fill={C.pil} />
    <path d={`M18 800 V${top + 4} a${w / 2 - 18} ${w / 2 - 18} 0 0 1 ${w - 36} 0 V800 Z`} fill="url(#night)" />
    <clipPath id={`ac${x}`}><path d={`M18 800 V${top + 4} a${w / 2 - 18} ${w / 2 - 18} 0 0 1 ${w - 36} 0 V800 Z`} /></clipPath>
    <g clipPath={`url(#ac${x})`}>
      {[...Array(18)].map((_, i) => <circle key={i} cx={24 + random(`s${x}${i}`) * (w - 48)} cy={top - 90 + random(`t${x}${i}`) * 330} r={1.3 + random(`r${x}${i}`) * 1.7} fill="#eef0ff" opacity={0.3 + 0.55 * Math.abs(Math.sin(k / 24 + i * 1.7))} />)}
      {hills && <><path d={`M0 800 L${w * 0.3} 560 L${w * 0.52} 660 L${w * 0.78} 520 L${w + 10} 700 V800Z`} fill="#3d5384" /><path d={`M${w * 0.3} 560 l-26 42 l22 -8 l14 20 l12 -22 l24 12 Z M${w * 0.78} 520 l-30 50 l24 -10 l16 22 l14 -24 l26 16 Z`} fill="#dfe8fb" />
        <path d={`M-10 800 L${w * 0.2} 690 L${w * 0.55} 740 L${w * 0.8} 680 L${w + 10} 760 V800Z`} fill="#2a3a63" /></>}
    </g>
  </g>
);
const Pillar = ({x}) => (
  <g transform={`translate(${x},0)`}>
    <rect x="0" y="150" width="104" height="660" fill={C.pil} /><rect x="64" y="150" width="40" height="660" fill={C.pilS} />
    {[230, 520, 700].map((y) => <g key={y}><rect x="-6" y={y} width="116" height="16" fill={C.pilS} /><rect x="-6" y={y + 16} width="116" height="5" fill={C.pilD} /></g>)}
    {[...Array(5)].map((_, i) => <path key={i} d={`M${14 + i * 19} 300 v170`} stroke={C.pilS} strokeWidth="4" opacity="0.6" />)}
    <path d="M-30 110 H134 L116 150 H-12 Z" fill={C.pil} /><path d="M-40 84 H144 V112 H-40 Z" fill={C.pilS} /><path d="M-22 800 H126 L138 842 H-34 Z" fill={C.pilS} /><rect x="-40" y="842" width="184" height="22" fill={C.pilD} />
  </g>
);
const Stand = ({x, k}) => (
  <g transform={`translate(${x},0)`}>
    <circle cx="0" cy="560" r="230" fill="url(#lampGlow)" opacity={0.8 + 0.12 * Math.sin(k / 3.3 + x)} />
    <rect x="-7" y="610" width="14" height="250" fill={C.goldD} /><path d="M-46 860 H46 L34 880 H-34Z" fill={C.goldD} /><ellipse cx="0" cy="860" rx="46" ry="8" fill={C.gold} />
    {[[0, 600, 1.15], [-44, 660, 0.85], [44, 660, 0.85], [-30, 730, 0.7], [30, 730, 0.7]].map(([dx, y, s], i) => { const f = 1 + 0.14 * Math.sin(k / 2.9 + i * 2.1 + x) + 0.06 * Math.sin(k / 1.6 + i); return (
      <g key={i} transform={`translate(${dx},${y}) scale(${s})`}>
        <path d="M-30 0 h60 q-6 22 -30 22 q-24 0 -30 -22Z" fill={C.goldD} /><ellipse cx="0" cy="0" rx="30" ry="6" fill={C.gold} />
        <path d={`M0 ${-56 * f} C 18 -28 13 -6 0 -4 C -13 -6 -18 -28 0 ${-56 * f}Z`} fill="#f59a2a" /><path d={`M0 ${-36 * f} C 8 -20 6 -8 0 -6 C -6 -8 -8 -20 0 ${-36 * f}Z`} fill="#fff0b0" />
      </g>); })}
    <path d="M-44 660 Q0 640 44 660 M-30 730 Q0 716 30 730" stroke={C.goldD} strokeWidth="6" fill="none" />
  </g>
);
const Bell = ({x, len, k, i}) => { const a = 4 * Math.sin(k / 23 + i * 1.9); return (
  <g transform={`translate(${x},112) rotate(${a})`}><line x1="0" y1="0" x2="0" y2={len} stroke={C.goldD} strokeWidth="4" /><path d={`M-22 ${len + 44} Q-22 ${len} 0 ${len} Q22 ${len} 22 ${len + 44} Z`} fill={C.gold} /><rect x="-27" y={len + 42} width="54" height="8" rx="4" fill={C.goldD} /><circle cx="0" cy={len + 56} r="6" fill={C.goldD} /></g>); };

const WORDS = 'Who guards the city of Kashi ?'.split(' ');
const Caption = ({k}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 64, textAlign: 'center', fontFamily: 'Cinzel', fontWeight: 700, fontSize: 54, letterSpacing: 2, fontVariant: 'small-caps', textShadow: '0 3px 14px rgba(0,0,0,.95)'}}>
    {WORDS.map((w, i) => { const t0 = 96 + i * 13; const o = interpolate(k, [t0 - 6, t0], [0, 1], ez); return <span key={i} style={{color: k >= t0 + 12 ? C.cream : C.gold, opacity: o, marginRight: 16, display: 'inline-block', transform: `translateY(${(1 - o) * 10}px)`}}>{w}</span>; })}
  </div>
);

export const Scene = () => {
  const k = useCurrentFrame();
  const push = interpolate(k, [0, 300], [1.0, 1.085]);
  const inn = interpolate(k, [0, 26], [0, 1], ez);
  const rise = spring({frame: k - 14, fps: 30, config: {damping: 200}});
  const halo = 0.85 + 0.15 * Math.sin(k / 26);
  return (
    <AbsoluteFill style={{background: '#0e0a07'}}>
      <Fonts />
      <AbsoluteFill style={{opacity: inn}}>
        <AbsoluteFill style={{transform: `scale(${1 + (push - 1) * 0.45})`}}>
          <svg viewBox="0 0 1920 1080" width="1920" height="1080">
            <defs>
              <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.wall2} /><stop offset="0.55" stopColor={C.wall} /><stop offset="1" stopColor="#5d4832" /></linearGradient>
              <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#101830" /><stop offset="1" stopColor="#30426f" /></linearGradient>
              <radialGradient id="lampGlow"><stop offset="0" stopColor="#ffb44a" stopOpacity="0.5" /><stop offset="0.5" stopColor="#ffb44a" stopOpacity="0.14" /><stop offset="1" stopColor="#ffb44a" stopOpacity="0" /></radialGradient>
              <radialGradient id="halo"><stop offset="0" stopColor="#fbe9b4" stopOpacity="0.85" /><stop offset="0.45" stopColor="#f2d48a" stopOpacity="0.3" /><stop offset="1" stopColor="#f2d48a" stopOpacity="0" /></radialGradient>
              <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff0c4" stopOpacity="0.34" /><stop offset="1" stopColor="#fff0c4" stopOpacity="0" /></linearGradient>
              <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9a66a" stopOpacity="0" /><stop offset="1" stopColor="#c9a66a" stopOpacity="0.22" /></linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#wall)" />
            {[...Array(22)].map((_, i) => <path key={i} d={`M${i * 92 - 20} 40 l30 -22 l30 22 l-30 22 Z`} fill={C.pilD} opacity="0.55" />)}
            <rect y="72" width="1920" height="8" fill={C.pilD} opacity="0.7" />
            <Arch x={110} w={300} top={380} k={k} hills /><Arch x={770} w={380} top={330} k={k} /><Arch x={1510} w={300} top={380} k={k} hills />
            <circle cx="960" cy="330" r={470 * halo} fill="url(#halo)" />
            <circle cx="960" cy="238" r="150" fill="none" stroke="#f6e2a6" strokeWidth="5" opacity="0.55" /><circle cx="960" cy="238" r="166" fill="none" stroke="#f6e2a6" strokeWidth="2" opacity="0.35" />
            <rect y="800" width="1920" height="280" fill={C.floor} /><rect y="800" width="1920" height="9" fill="#6e583c" />
            {[...Array(11)].map((_, i) => <line key={i} x1={960 + (i - 5) * 130} y1="809" x2={960 + (i - 5) * 470} y2="1080" stroke="#2a2018" strokeWidth="3" />)}
            {[850, 910, 990].map((y) => <line key={y} x1="0" y1={y} x2="1920" y2={y} stroke="#2a2018" strokeWidth="3" />)}
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{transform: `scale(${push})`}}>
          <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
            <Pillar x={488} /><Pillar x={1328} />
            {[[640, 150], [760, 90], [1160, 90], [1280, 150]].map(([x, l], i) => <Bell key={i} x={x} len={l} k={k} i={i} />)}
            <Stand x={300} k={k} /><Stand x={1620} k={k} />
            {/* lotus pedestal */}
            <ellipse cx="960" cy="930" rx="250" ry="26" fill="#000" opacity="0.35" />
            {[-200, -120, -40, 40, 120, 200].map((dx, i) => <path key={i} d={`M${960 + dx - 52} 902 Q${960 + dx} 846 ${960 + dx + 52} 902 Q${960 + dx} 936 ${960 + dx - 52} 902Z`} fill={i % 2 ? '#c96f8f' : '#d98aa6'} />)}
            <ellipse cx="960" cy="884" rx="230" ry="20" fill="#e9b7c6" /><ellipse cx="960" cy="882" rx="210" ry="14" fill="#c98a9e" />
          </svg>
          <div style={{position: 'absolute', left: 720, top: 66 + (1 - rise) * 36, opacity: rise}}><Shiva k={k} /></div>
          <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute'}}>
            <polygon points="800,0 1120,0 1420,1080 500,1080" fill="url(#ray)" opacity={0.55 + 0.1 * Math.sin(k / 31)} /><polygon points="900,0 1020,0 1150,1080 770,1080" fill="url(#ray)" opacity="0.5" />
            <rect y="700" width="1920" height="380" fill="url(#fog)" />
            {[...Array(54)].map((_, i) => { const x = random(`x${i}`) * 1920 + Math.sin(k / 40 + i) * 14; const y = (random(`y${i}`) * 1080 - k * (0.25 + random(`v${i}`) * 0.55) + 2160) % 1080; return <circle key={i} cx={x} cy={y} r={1.3 + random(`q${i}`) * 2.3} fill="#f8e8ba" opacity={0.14 + random(`o${i}`) * 0.4} />; })}
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{transform: `scale(${1 + (push - 1) * 2.4})`, background: 'linear-gradient(to right, #0b0705 0%, rgba(11,7,5,0) 9%, rgba(11,7,5,0) 91%, #0b0705 100%)'}} />
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 44%, rgba(0,0,0,0) 40%, rgba(8,5,3,.86) 100%)'}} />
        <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 74%, rgba(0,0,0,.72) 100%)'}} />
      </AbsoluteFill>
      <Caption k={k} />
    </AbsoluteFill>
  );
};
