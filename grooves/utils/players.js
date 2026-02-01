"use strict";
import * as Tone from "tone";

const players = new Tone.Players({
    "kick": "./assets/samplers/kick.wav",
    "snare": "./assets/samplers/snare.wav",
    "openhh": "./assets/samplers/openhh.wav",
    "closedhh": "./assets/samplers/closedhh.wav",
    "crash": "./assets/samplers/crash.wav",
}).toDestination();

export default players;