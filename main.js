"use strict"

const start = document.querySelector(".metalnome__start");

function basicStart () {
    const bpm = document.getElementById("bpm");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = bpm.value;
    const metroLoop = new Tone.Loop(
        (time) => {
            synth.triggerAttackRelease("G#4", "8n", time);
            console.log("click");
        },"8n"
    ).start(0);
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // Clears all scheduled events
}

let metalnomeOn = false;
start.addEventListener("click", async (event) => {
    event.preventDefault();
    metalnomeOn = !metalnomeOn;
    if (metalnomeOn){
        await Tone.start();
        basicStart();
    } else {
        stop();
    }
});