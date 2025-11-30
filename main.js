"use strict"

const start = document.querySelector(".metalnome__start");
let lastStamp = 0;

function blink (time) {
    const timer = document.querySelector(".metalnome__timer");
    const interval = Tone.Time("16n").toSeconds() * 1000;
    if (time - lastStamp >= interval) {
        timer.style.visibility =
            timer.style.visibility === "hidden" ? "visible" : "hidden";
        lastStamp = time;
    }
    requestAnimationFrame(blink);
}


function basicStart () {
    const bpm = document.getElementById("bpm");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = bpm.value;
    const metroLoop = new Tone.Loop(
        (time) => {
            synth.triggerAttackRelease("G#4", "16n", time);
            Tone.Draw.schedule(requestAnimationFrame(blink), time);
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