"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";

function standard(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    },
    ["G#4", null, null, "G#4", null, null, "G#4", null],
    "8n"
  ).start(0);
  Tone.Transport.start();
}

export default standard;