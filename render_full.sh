#!/bin/bash
# Renders the "Full" composition in 8 parts (a failed part can be redone alone), joins them and adds src/audio.wav.
# usage: bash render_full.sh [output.mp4]     In a workspace without its own Chrome add: --browser-executable=/usr/bin/google-chrome
set -e
cd "$(dirname "$0")"; OUT=${1:-out/full.mp4}; mkdir -p out/parts
[ -d build ] || npx remotion bundle src/index.jsx --out-dir build
N=$(python3 -c "import json;print(round(json.load(open('src/timeline.json'))['dur']*30))"); P=8; S=$(( (N + P - 1) / P ))
: > out/list.txt
for i in $(seq 0 $((P-1))); do a=$((i*S)); b=$(( (i+1)*S - 1 )); [ $b -ge $N ] && b=$((N-1)); f=out/parts/p$i.mp4
  [ -f $f ] || { npx remotion render build Full out/parts/tmp_p$i.mp4 --frames=$a-$b --concurrency=2 --crf=18 --jpeg-quality=90 --log=error $REMOTION_EXTRA && mv out/parts/tmp_p$i.mp4 $f; }
  echo "file 'parts/p$i.mp4'" >> out/list.txt; echo "part $i done $(date +%T)"
done
ffmpeg -v error -y -f concat -safe 0 -i out/list.txt -c copy out/video.mp4
ffmpeg -v error -y -i out/video.mp4 -i src/audio.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart "$OUT"
echo "wrote $OUT"
