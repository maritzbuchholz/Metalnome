"use strict";
import * as Tone from "tone";
import timeKeeper from "./utils/timekeeper";
import players from "./utils/players";

function faceripper(metalnomeBoolean) {
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

  const drum = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    [
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", null  , "snare", null, "kick", "kick",
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", "kick", "snare", null, null  , null  ,
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", null  , "snare", null, "kick", "kick",
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    "kick", "kick", "kick", "kick", "snare", null, "kick", null  ,
    ],
    "16n"
  ).start(0);
  Tone.Transport.start();
}

export default faceripper;