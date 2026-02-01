"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function windmills(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "2n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick", "kick", null, null, null, null, "kick", "kick",
     null, null, null, null, null, null, null, null,
    ],
    "8n"
  ).start(0);

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "1n"
  ).start("2n");
  Tone.Transport.start();
}

export default windmills;