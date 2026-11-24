import {registerRoot, Composition} from 'remotion';
import React from 'react';
import {Scene} from './Scene.jsx';
import {Full, FRAMES, Demo} from './Aru2.jsx';
const Root = () => <><Composition id="Test" component={Scene} durationInFrames={300} fps={30} width={1920} height={1080} /><Composition id="Full" component={Full} durationInFrames={FRAMES} fps={30} width={1920} height={1080} /><Composition id="Demo" component={Demo} durationInFrames={468} fps={30} width={1920} height={1080} /></>;
registerRoot(Root);
