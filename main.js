"use strict"

const start = document.querySelector(".metronome__start");

function startBasic () {
    const bpm = document.getElementById("bpm");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = bpm.value;
    const metroLoop = new Tone.Loop(
        (time) => {
            synth.triggerAttackRelease("C4", "8n", time);
            console.log("click");
        },"4n"
    ).start(0);
    Tone.Transport.start();
}

start.addEventListener("click", async (event) => {
    event.preventDefault();
    await Tone.start();
    startBasic();
});