import * as Tone from "tone";

import CONFIG from "../../config";

const synth: Tone.PolySynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "sine",
  },
}).toDestination();

const sounds:Array<string> = [];
const notes:Array<string> = ["C", "D", "E", "G", "A"];

for (let i = 0; i < CONFIG.SCREEN_SIZE; i++) {
  const currentNote = notes[i% notes.length];
  const currentOctave = Math.floor(i / notes.length) + 4;
  sounds.push(`${currentNote}${currentOctave}`);
}

sounds.reverse();

export { synth, sounds };
