declare name     "smoothDelay";
declare author   "Yann Orlarey";
declare copyright "Grame";
declare version  "1.0";
declare license  "STK-4.3";

import("stdfaust.lib");

N = int(2^19); 
interp = hslider("interpolation[unit:ms][style:knob]", 10, 1, 100, 0.1) * ma.SR / 1000.0; 
dtime = hslider("delay[unit:ms][style:knob]", 0, 0, 5000, 0.1) * ma.SR / 1000.0;
fback = hslider("feedback[style:knob]", 0, 0, 100, 0.1) / 100.0; 

// Process for left channel
voiceL = (+ : de.sdelay(N, interp, dtime)) ~ *(fback);

// Process for right channel
voiceR = (+ : de.sdelay(N, interp, dtime)) ~ *(fback);

// Combine the two channels into a stereo signal
process = voiceL, voiceR;
