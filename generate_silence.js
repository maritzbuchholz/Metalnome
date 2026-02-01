const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public/assets/silence.wav');
const durationSeconds = 6;
const sampleRate = 44100;
const numChannels = 1;
const bitsPerSample = 16;

const byteRate = sampleRate * numChannels * bitsPerSample / 8;
const blockAlign = numChannels * bitsPerSample / 8;
const dataSize = durationSeconds * sampleRate * blockAlign;
const fileSize = 36 + dataSize;

const buffer = Buffer.alloc(fileSize + 8);

// RIFF chunk descriptor
buffer.write('RIFF', 0);
buffer.writeUInt32LE(fileSize, 4);
buffer.write('WAVE', 8);

// fmt sub-chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(bitsPerSample, 34);

// data sub-chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Data is already zero-filled by Buffer.alloc

fs.writeFileSync(filePath, buffer);
console.log(`Generated ${filePath}`);
