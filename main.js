"use strict"

const bpm = document.getElementById("bpm");
const start = document.querySelector(".metronome__start");

start.addEventListener("click", function(event) {
    console.log(bpm.value);
});