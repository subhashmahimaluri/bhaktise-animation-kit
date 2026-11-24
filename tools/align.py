"""Sentence timings for a voice-over.  usage: python3 align.py voice.wav script.txt sents.json
Needs: ffmpeg, pocketsphinx (pip).  Output: {"sents": [[start, end, text], ...], "sil": [[s, e], ...]} in voice seconds."""
import wave, re, json, subprocess, difflib, bisect, sys
from pocketsphinx import Decoder
voice, script, out = sys.argv[1:4]
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', voice, '-ar', '16000', '-ac', '1', '_a16.wav'], check=True)
w = wave.open('_a16.wav'); n = w.getnframes(); sr = 16000; rec = []; pos = 0; chunk = 60 * sr
while pos < n:
    w.setpos(pos); data = w.readframes(min(chunk, n - pos))
    d = Decoder(samprate=16000); d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    for s in d.seg():
        wd = re.sub(r'\(\d+\)', '', s.word).lower()
        if wd.startswith('<') or wd.startswith('['): continue
        rec.append((pos / sr + s.start_frame / 100.0, pos / sr + s.end_frame / 100.0, wd))
    pos += chunk
DUR = n / sr
txt = open(script, encoding='utf-8').read()
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'"))
sents = []; sw = []
for p in [p.strip() for p in txt.split('\n\n') if p.strip()]:
    for s in re.findall(r'[^.?!…]+(?:[.?!…]+["”\']?|$)', p):
        s = s.strip()
        if not norm(s): continue
        sents.append(s)
        for wd in s.split():
            if norm(wd): sw.append((len(sents) - 1, wd))
A = [norm(x) for _, x in sw]; B = [r[2] for r in rec]
anch = {}
for a, b, m in difflib.SequenceMatcher(None, A, B, autojunk=False).get_matching_blocks():
    for k in range(m):
        if m >= 2 or len(A[a + k]) >= 5: anch[a + k] = (rec[b + k][0], rec[b + k][1])
print('words', len(A), 'anchored', len(anch))
keys = sorted(anch); ts = [0] * len(A); te = [0] * len(A)
for i in range(len(A)):
    if i in anch: ts[i], te[i] = anch[i]; continue
    j = bisect.bisect_left(keys, i); lo = keys[j - 1] if j > 0 else None; hi = keys[j] if j < len(keys) else None
    t0, i0 = (anch[lo][1], lo) if lo is not None else (0.0, -1); t1, i1 = (anch[hi][0], hi) if hi is not None else (DUR, len(A))
    ts[i] = t0 + (t1 - t0) * max(0, (i - i0 - 0.5) / (i1 - i0)); te[i] = t0 + (t1 - t0) * min(1, (i - i0 + 0.5) / (i1 - i0))
o = subprocess.run(['ffmpeg', '-hide_banner', '-i', '_a16.wav', '-af', 'silencedetect=noise=-35dB:d=0.25', '-f', 'null', '-'], capture_output=True, text=True).stderr
S = list(zip([float(x) for x in re.findall(r'silence_start: ([0-9.]+)', o)], [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', o)]))
starts = sorted([e for _, e in S] + [0.0]); ends = sorted([s for s, _ in S])
def snap(x, arr, tol):
    j = bisect.bisect_left(arr, x); c = [arr[k] for k in (j - 1, j) if 0 <= k < len(arr)]
    b = min(c, key=lambda v: abs(v - x)) if c else x
    return b if abs(b - x) <= tol else x
res = []
for si, s in enumerate(sents):
    idx = [i for i, (q, _) in enumerate(sw) if q == si]
    res.append([round(snap(ts[idx[0]], starts, 0.45), 2), round(snap(te[idx[-1]], ends, 0.45), 2), s])
for i in range(1, len(res)):
    if res[i][0] < res[i - 1][1]: m = (res[i][0] + res[i - 1][1]) / 2; res[i][0] = res[i - 1][1] = round(m, 2)
json.dump({'sents': res, 'sil': S, 'dur': DUR}, open(out, 'w'))
for i, (a, b, s) in enumerate(res): print(i, a, b, s[:70])
