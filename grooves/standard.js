"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";

function standard(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const division = document.getElementById("division");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, `${division.value*2}n`, time);
    },
    ["A4", "G#4", "G#4", "G#4", "G#4", "G#4", "G#4", "G#4"],
    `${division.value}n`
  ).start(0);
  Tone.Transport.start();
}

export default standard;