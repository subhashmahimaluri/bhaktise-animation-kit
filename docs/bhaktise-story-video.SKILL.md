---
name: "bhaktise-story-video"
description: "Make a Bhaktise animated story video or preview (script, ElevenLabs text, Remotion animation, audio mix, YouTube title and metadata) in the house style. Use for any Bhaktise/Bhaktito story video request."
---

# Bhaktise story video

The user runs the Bhaktise YouTube channel (English devotional stories; viewers mostly in north India and abroad). Claude writes the script and builds the whole video; he records the voice-over in ElevenLabs. His only spend is ElevenLabs voice and music, so never propose paid packs or tools.

## Where things are

- Project folder on his computer: `sushmitha-publications` (reach it through the device tools). One folder per video, e.g. `arunachala_jyoti/`.
- Animation kit: `bhakthise_videos/animation_kit/bhaktise_remotion_kit.tar.gz` with a `README.md`. Stage it, unpack it in the workspace, `npm install`, and build on it. Do not start from an empty project.
- BGM: `bhakthise_videos/bgm-raw/devotional-bgm.mp3`.
- The kit holds the cast (Shiva, Vishnu and a generic `Deity`, Brahma, Bhairava, Shesha, Garuda, Varaha, swan, devas), stage sets, captions, and `tools/align.py` and `tools/timeline.py`.

## Order of work

1. **Script.** Write the English script, an ElevenLabs copy, and a Telugu reference. Save all three to the video's folder, then read them back from his folder and check the word count before telling him to record. A stale copy reached him once and he recorded the wrong draft.
2. **Voice.** He records it and saves it in the folder (usually `voiceover.wav`). Look in the folder before asking where it is.
3. **Timings.** `python3 tools/align.py voice.wav script.txt sents.json`.
4. **Scenes.** One background per scene, 5 to 20 seconds each. List the first sentence index of every scene and run `python3 tools/timeline.py sents.json voice.wav bgm.mp3 "0,2,4,..." src/`. It writes `timeline.json` and the final mixed audio.
5. **Preview.** Build the first minute, send it, and wait for his go-ahead before the full build.
6. **Full build.** Write scenes against `timeline.json`, never against hard-coded seconds. Render one still per scene, look at every one on a contact sheet, fix, then render in parts, concat, and mux audio with `-c:v copy`.
7. **Deliver.** Send the mp4 and also save it into the video's folder. Say plainly what was checked and what was not (Claude cannot hear audio or watch motion).
8. **YouTube.** When he gives the link, set title, description with chapters from the scene boundaries, and tags in YouTube Studio through the built-in browser.

## Script rules

- Open with a question in the first 10 seconds. Name the source (which Purana, which section) in the first minute, and only claim what that source says.
- 8 minutes or more of voice (about 1,400 English words), so mid-roll ads apply.
- Simple English a child can follow. One story line, no piled side stories, a one-line lesson, no modern examples such as cinema or cricket.
- Pan-India framing. No Telugu or Tamil framing in the opening or title; regional festivals are mentioned once, late, as where the story ends.
- Evergreen: no "today is" lines.
- ElevenLabs copy: narration only, no image guidance. Names in Devanagari with an audible final "a" (शिवा, ब्रह्मा, भैरवा). Common English words such as Vedas, Puranas, Diwali, tulsi stay in English letters. No Telugu plural or case endings.

## Picture rules

- 1920x1080, 30 fps. One subject per frame. Muted palette per scene. Vignette, dust, light rays, depth layers.
- **No black between scenes.** Scene changes are camera moves: pan, tilt, push, or a directional push where the old scene slides out while the new one slides in. Dissolve only between two views of the same place.
- **Pauses.** Keep about 1.5 seconds without narration at each scene change (the timeline tool adds it). The camera keeps moving and the music carries.
- **Faces act.** Each speaking or reacting character gets an expression for the line (brows, eyes, mouth), changing on the word that causes it.
- **Mouths move on quoted speech only.** Use the `speech` spans and per-frame `amp` from `timeline.json`; open the mouth of the speaker during their own quote. Narration never moves a mouth.
- **One continuous world per sequence.** Build a wide set and move the camera inside it.
- **Bodies pose.** At least one pose change per character per sequence.
- Shading: three tones per shape where possible (base, shade, highlight), cheek blush, eye highlights.
- Not for this channel: 3D stick-figure cartoon styles. He rejected them as kids' animation.
- Captions burned in. English, synced to the sentence timings.

## Audio

- BGM stays low: the gain in `tools/timeline.py` is the level he approved after asking twice for it to be lowered. Do not raise it.
- Cut the voice only inside silences.

## YouTube metadata

- Find search phrases first: open `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=en&gl=IN&q=<seed>` in the built-in browser for 15 to 20 seed phrases. Put the phrase with the most suggested variants first in the title.
- Title for north-Indian and diaspora viewers. No regional festival name in the lead.
- Description: the search phrase in the first line, the source, chapters, "Subscribe to Bhaktise". Check the channel name; Bhaktito is a different channel.
- Never describe the video as 3D.
- Tags up to 500 characters; replace weak tags rather than exceeding the limit.

## Working with him

- He dislikes repeated confirmation questions. Decide, do, and report. The one fixed checkpoint is the one-minute preview.
- Lead with the result. Be direct about weak scenes and anything unverified.
- More agents do not speed up rendering; the limit is the workspace's two processors (about 55 minutes for 9 minutes of video).

## Before sending any video

- Every scene seen as a still.
- Duration, resolution and audio stream confirmed with ffprobe.
- No scene change fades through black.
- Captions match the recording he actually made.