"""Scene timeline + final audio.  usage: python3 timeline.py sents.json voice.wav bgm.mp3 "0,2,4,..." out_dir
The 4th argument lists the index of the FIRST sentence of every scene (first must be 0).
Adds LEAD s before the voice and GAP s of music-only pause at every scene change; cuts the voice only inside silences.
Writes out_dir/timeline.json {B: scene boundaries, T: sentence starts per scene, caps: caption chunks, speech: quoted-speech spans, amp: mouth envelope per frame, dur}
and out_dir/audio.wav (voice + ducked, looped BGM at the approved level)."""
import json, math, sys, subprocess, numpy as np
sents_f, voice, bgm, firsts, outd = sys.argv[1:6]
LEAD, GAP, TAIL, FPS = 1.2, 1.0, 3.6, 30
D = json.load(open(sents_f)); S = D['sents']; SIL = D['sil']; VEND = D.get('dur') or S[-1][1] + 0.2
first = [int(x) for x in firsts.split(',')]; assert first[0] == 0
cuts = [0.0]
for f in first[1:]:
    a = S[f][0]; c = [(s, e) for s, e in SIL if abs(e - a) < 1.2 or (s <= a <= e)]
    if c:
        s, e = min(c, key=lambda q: abs(q[1] - a)); cuts.append(round((s + e) / 2, 3)); S[f][0] = round(e, 2)
        if S[f - 1][1] > s: S[f - 1][1] = round(s, 2)
    else: cuts.append(round((S[f - 1][1] + a) / 2, 3)); print('WARNING no silence before sentence', f)
cuts.append(VEND); n = len(cuts) - 1; off = [LEAD + i * GAP for i in range(n)]
B = [0] + [round(cuts[i] + off[i] - GAP / 2, 3) for i in range(1, n)]; END = round(VEND + off[-1] + TAIL, 2); B.append(END)
def chunks(txt, a, b):
    txt = txt.replace('"', '').replace('...', '…').strip()
    if len(txt) <= 64: return [[a, b, txt]]
    k = math.ceil(len(txt) / 56); tgt = len(txt) / k; out = []; cur = []
    for w in txt.split(' '):
        cur.append(w); L = len(' '.join(cur))
        if len(out) < k - 1 and (L >= tgt or (L >= tgt * 0.72 and w[-1] in ',;')): out.append(' '.join(cur)); cur = []
    if cur: out.append(' '.join(cur))
    tot = sum(len(o) for o in out); r = []; p = a
    for o in out: d = (b - a) * len(o) / tot; r.append([round(p, 2), round(p + d - 0.04, 2), o]); p += d
    return r
T = []; caps = []; speech = []; inq = False
for j in range(n):
    lo = first[j]; hi = first[j + 1] if j + 1 < n else len(S)
    T.append([round(S[i][0] + off[j], 2) for i in range(lo, hi)])
    for i in range(lo, hi):
        a, b, txt = S[i][0] + off[j], S[i][1] + off[j], S[i][2]
        caps += chunks(txt, round(a, 2), round(b, 2))
        q = txt.count('"') + txt.count('“') + txt.count('”')
        if inq or q: speech.append([round(a, 2), round(b, 2), i])   # sentences inside quoted speech -> mouth movement; assign the speaker per scene
        if q % 2: inq = not inq
SR = 48000; N = int(END * SR)
def load(f, ch): return np.frombuffer(subprocess.check_output(['ffmpeg', '-v', 'error', '-i', f, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-']), np.float32).reshape(-1, ch).copy()
vo = load(voice, 1)[:, 0]; v = np.zeros(N, np.float32); fd = int(0.012 * SR)
for i in range(n):
    seg = vo[int(cuts[i] * SR):int(cuts[i + 1] * SR)].copy(); seg[:fd] *= np.linspace(0, 1, fd); seg[-fd:] *= np.linspace(1, 0, fd)
    p = int((cuts[i] + off[i]) * SR); v[p:p + len(seg)] += seg
hopf = SR // FPS; nf = N // hopf; r = np.sqrt((v[:nf * hopf].reshape(nf, hopf) ** 2).mean(1))
amp = np.clip((r - 0.012) / (np.percentile(r[r > 0.012], 92) - 0.012), 0, 1) ** 0.7; amp = np.convolve(amp, [0.25, 0.5, 0.25], 'same')
json.dump({'B': B, 'T': T, 'caps': caps, 'speech': speech, 'amp': [round(float(x), 2) for x in amp], 'dur': END}, open(outd + '/timeline.json', 'w'))
music = load(bgm, 2); music *= 0.10 / max(np.sqrt(np.mean(music * music)), 1e-8)
act = np.flatnonzero(np.max(np.abs(music), axis=1) > 0.0003); music = music[max(0, act[0] - SR // 10):min(len(music), act[-1] + SR // 10)]
xf = 4 * SR; bed = np.zeros((N, 2), np.float32); pos = 0
while pos < N:
    take = min(len(music), N - pos); part = music[:take].copy()
    if pos > 0: k = min(xf, take); part[:k] *= np.linspace(0, 1, k)[:, None]
    if take == len(music): part[-xf:] *= np.linspace(1, 0, xf)[:, None]
    bed[pos:pos + take] += part; pos += len(music) - xf
hop = 480; small = v[:N // hop * hop].reshape(-1, hop); rms = np.sqrt((small * small).mean(1)); rms = np.convolve(rms, np.ones(12) / 12, 'same')
sp = (rms > 0.012).astype(np.float32); g = np.exp(-0.5 * (np.arange(-36, 37) / 9.0) ** 2); g /= g.sum(); sp = np.convolve(sp, g, 'same')
gain = np.interp(np.arange(N), np.arange(len(sp)) * hop, 0.085 - 0.057 * sp).astype(np.float32)   # approved level: music about 28 dB under the voice, 21 dB in pauses
tail = np.arange(N) > int((VEND + off[-1]) * SR); gain[tail] = np.maximum(gain[tail], np.linspace(0.085, 0.14, tail.sum()))
gain[:int(0.6 * SR)] *= np.linspace(0, 1, int(0.6 * SR)); gain[-int(2.0 * SR):] *= np.linspace(1, 0, int(2.0 * SR))
bed *= gain[:, None]; mix = bed + v[:, None]; mix *= min(1.0, 0.97 / float(np.max(np.abs(mix))))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s16le', outd + '/audio.wav'], input=mix.astype(np.float32).tobytes(), check=True)
print('scenes', n, 'length %d:%02d' % (END // 60, END % 60), 'frames', round(END * FPS))
