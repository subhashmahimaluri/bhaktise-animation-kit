# Bhaktise animation kit

Everything used to make "Arunachala, The Pillar of Fire" (8:46, 44 scenes), plus the changes agreed for the next video.
Run `npm install`, then `npm run bundle` and `npm run demo` to render the 15-second technique test (Remotion 4, Node 22, Chrome). The demo needs no audio file.

`src/timeline.json` is the Arunachala timeline. To re-render that full video you also need its mixed audio at `src/audio.wav`, which `tools/timeline.py` produces from the voice-over and BGM (kept out of git).

## What is in the kit

| Path | What it is |
|---|---|
| `src/Aru.jsx` | Scenes 1-8 and the shared parts: caption, dust, vignette, Brahma, swan, fire pillar, ketaki flower, temples, clouds |
| `src/Aru2.jsx` | Scenes 9-44 and the cast: Vishnu/any deity (`Deity`), Shesha, Garuda, Varaha, Bhairava, devas, hill, lamps, altar; stage sets (`Field`, `OceanBg`, `Kailasa`, `SkySet`, `HillScene`, `Stage3`); the 15-second technique test (`Demo`) |
| `src/Scene.jsx` | The Shiva figure (two-tone shading, cream rim) |
| `tools/align.py` | Voice-over + script -> sentence timings |
| `tools/timeline.py` | Sentence timings + scene list -> `timeline.json` (scene boundaries, captions, quoted-speech spans, per-frame mouth envelope) and the mixed audio (voice, scene gaps, ducked BGM) |
| `render_full.sh` | Renders in 8 parts so a failed part can be redone alone, joins them and adds the audio |
| `examples/` | The 15-second technique test and the Arunachala script as recorded |
| `docs/` | The `bhaktise-story-video` skill text |

## Pipeline

1. Script (English, plus ElevenLabs copy with names in Devanagari). He records the voice in ElevenLabs.
2. `python3 tools/align.py voice.wav script.txt sents.json`
3. Decide scenes: one background per scene, 5-20 s each; list the first sentence of every scene.
4. `python3 tools/timeline.py sents.json voice.wav bgm.mp3 "0,2,4,..." src/` (1.2 s lead, 1.0 s extra pause at each scene change, voice cut only inside silences).
5. Write scenes against `timeline.json` (`T[i]` = sentence start times of scene i). Never hard-code seconds.
6. Still frame of every scene -> contact sheet -> fix -> `npx remotion bundle` -> render in parts -> concat -> mux audio with `-c:v copy`.
7. Render speed here: about 6 frames/s (2 CPUs); scenes with the Shiva figure about 4 frames/s. A 9-minute video is about 55 minutes.

## Rules for the next video (his feedback on Arunachala)

1. **No black between scenes.** Scene changes are camera moves, not fades: pan, tilt, push, or a directional push where the old scene slides out as the new one slides in. A dissolve is allowed only between two views of the same place. Keep the 1.5 s music-only pause, but the camera keeps moving through it.
2. **Faces act.** Every speaking or reacting character gets an expression for the line: brows (`eye` = stern, `worry` = worried), eyes (closed, wide), mouth curve. Change expression on the word that causes it.
3. **Mouths move on quoted speech.** `timeline.json` gives `speech` spans and `amp` per frame; pass `open={amp}` to the speaker only, during their own quote. Narration never moves a mouth.
4. **One continuous world per sequence.** Build a wide set and move the camera inside it rather than rebuilding a new flat stage each scene.
5. **Bodies pose.** Add at least one pose change per character per sequence (arm raise, lean, turn). Avoid the single stiff front pose.

Tested in `Demo` (15 s): mouth envelope on Brahma and Vishnu, stern expression, eased camera push, fast pan with motion blur, vertical push between two scenes with no black. Not yet tested over a full video.

## Reference look (First 100 Stories short, FaithvsFact)

- Three tones per shape (base, shade, highlight), blush on cheeks, eye highlights.
- Close-ups for emotion, wide shots for place; cut between them by zoom-dissolve inside the same place.
- Crowds and armies as repeated silhouettes with small lights; big moon; flags moving.
- Captions: 2-4 words at a time, bold, key word in yellow. Ours are full sentences in Cinzel; phrase captions are the next thing to try.

## Fixed house rules

- 1920x1080, 30 fps; 8 minutes or more; question in the first 10 seconds; source named in the first minute.
- Simple English a child can follow; one story line; one-line lesson; no modern examples.
- Pan-India: no Telugu or Tamil framing in title or opening; north-Indian and diaspora audience.
- Captions burned in. BGM: `bhakthise_videos/bgm-raw/devotional-bgm.mp3` at the level in `timeline.py` (do not raise).
- Spend only on ElevenLabs voice and music. No paid packs.
- Title from YouTube search suggestions (suggestqueries, `ds=yt`), most-searched phrase first.
- After writing script files to his folder, re-read them there and check the word count before he records.
