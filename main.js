"use strict";
import * as Tone from "tone";
import standard from "./grooves/standard";
import blastBeat from "./grooves/blastBeat";
import motorhead from "./grooves/motorhead";
import slipknot from "./grooves/slipknot";
import breakdown from "./grooves/breakdown";
import windmills from "./grooves/windmills";
import faceripper from "./grooves/faceripper";

const start = document.querySelector(".metalnome__button");
const blinker = document.querySelector(".metalnome__blinker");

// 1. Silent Loop (Bypasses Silent Switch & Keeps App Alive)
const silentAudio = document.getElementById("silent-audio");
if (silentAudio) {
  // Use a proper silent MP3 (approx 0.5s silence). This works better than the tiny WAV.
  silentAudio.src = "./assets/silence.wav";
}

// 1. PRIME AUDIO ON FIRST TOUCH (Global Unlock)
function primeAudio() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  
  if(silentAudio) {
    silentAudio.play().catch(e => console.log("Silent audio failed", e));
  }
  
  // Only play the silent audio once to unlock the channel
  // We can leave it looping or pause it, but keeping it playing is safer for silent mode
  // However, users might not want it running forever if they never click play.
  // Actually, for silent mode to work, it MUST be playing. 
  // So we let it run. It's silent.
  
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Metalnome',
      artist: 'Metalnome',
      album: 'Metalnome',
      artwork: [
        { src: './assets/skull.png', sizes: '512x512', type: 'image/png' },
      ]
    });
  
    // iOS requires these handlers to enable background audio
    navigator.mediaSession.setActionHandler('play', () => { 
        if(silentAudio) silentAudio.play();
        Tone.Transport.start(); 
        navigator.mediaSession.playbackState = "playing";
    });
    navigator.mediaSession.setActionHandler('pause', () => { 
        if(silentAudio) silentAudio.pause();
        // Tone.Transport.pause();
        Tone.Transport.stop();
        navigator.mediaSession.playbackState = "paused";
    });
    // Dummy handlers required for iOS lock screen to show the player
    navigator.mediaSession.setActionHandler('previoustrack', () => {});
    navigator.mediaSession.setActionHandler('nexttrack', () => {});
    navigator.mediaSession.setActionHandler('seekbackward', () => {});
    navigator.mediaSession.setActionHandler('seekforward', () => {});
    navigator.mediaSession.setActionHandler('stop', () => {
        if(silentAudio) {
            silentAudio.pause();
            silentAudio.currentTime = 0;
        }
        stop();
        navigator.mediaSession.playbackState = "none";
    });
  }
  
  document.removeEventListener('touchstart', primeAudio);
  document.removeEventListener('click', primeAudio);
}

document.addEventListener('touchstart', primeAudio);
document.addEventListener('click', primeAudio);

// 3. Detect correct event (Touch vs Click)
const triggerEvent = 'ontouchend' in document ? 'touchend' : 'click';


const grooveList = {
  standard: standard,
  blast: blastBeat,
  motor: motorhead,
  slipknot: slipknot,
  breakdown: breakdown,
  windmills: windmills,
  faceripper: faceripper,
  tresillo: tresillo,
}

//utilities

function stop() {
  metalnomeOn = false;
  // Disable hacks
  if(silentAudio) silentAudio.pause();
  
  Tone.Transport.stop();
  Tone.Transport.cancel();
  Tone.Draw.cancel();
  blinkOff();
}


// this function creates the visual time-keeper of a broken heart </3

function blinkOn() {
  blinker.classList.add("metalnome__blinker--on");
}

function blinkOff() {
  blinker.classList.remove("metalnome__blinker--on");
}

//////////////////////////////////


let metalnomeOn = false;
start.addEventListener(triggerEvent, (event) => {
  // event.preventDefault() removed to allow native audio unlock
  
  const selectedGroove = document.querySelector(".metalnome__groove").value;
  
  // 1. UNLOCK IMMEDIATELY (Synchronous)
  if (!metalnomeOn) {
      if(silentAudio) silentAudio.play().catch(e => console.log("Audio play failed", e));
      Tone.start(); 
  }

  // 2. Proceed without awaiting (Tone.start is handled by unlockiOS resume)
  
  metalnomeOn = !metalnomeOn;
  if (metalnomeOn) {
    grooveList[selectedGroove](metalnomeOn);
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
  } else {
    stop();
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused";
  }
});
