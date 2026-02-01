"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function blastBeat(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["crash"   , "closedhh", "closedhh", "closedhh",
     "closedhh", "closedhh", "closedhh", "closedhh"],
    "8n"
  ).start(0);

  const drums = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick", "snare"],
    "16n"
  ).start(0);
  Tone.Transport.start();
}

export default blastBeat;