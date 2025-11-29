"use strict"

const bpm = document.getElementById("bpm");
const start = document.querySelector(".metronome__start");
const synth = new Tone.Synth().toDestination(); //create a synth and connect it to the main output (your speakers)

start.addEventListener("click", async (event) => {
    event.preventDefault();
    await Tone.start();
    console.log(bpm.value);
    synth.triggerAttackRelease("D4", "16n");
});