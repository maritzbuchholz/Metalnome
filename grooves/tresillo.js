"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function tresillo(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);
  // const seq = new Tone.Sequence(
  //   (time, note) => {
  //     synth.triggerAttackRelease(note, "16n", time);
  //   },
  //   ["G#4", null, "G#4", "G#4", null, null, "G#4", null],
  //   "8n"
  // ).start(0);
  
  const closedhh = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh", null, "closedhh", null, "closedhh", null, "closedhh", null],
    "8n"
  ).start(0);

  
  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    [null, null, null, null, "snare", null, null, null],
    "8n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick", null, null, "kick", null, null, "kick", null],
    "16n"
  ).start(0);

  Tone.Transport.start();
}

export default tresillo;