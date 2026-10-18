"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function quads(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const division = document.getElementById("division");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);
  
  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare", "snare", null, null, "snare", "snare", null, null],
    `${division.value}n`
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    [null, null, "kick", "kick", null, null, "kick", "kick"],
    `${division.value}n`
  ).start(0);

  Tone.Transport.start();
}

export default quads;