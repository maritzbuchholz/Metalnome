"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function slipknot(metalnomeBoolean) {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper(metalnomeBoolean);

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "4n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick"],
    "16n"
  ).start(0);

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "2n"
  ).start("4n");
  Tone.Transport.start();
}

export default slipknot;