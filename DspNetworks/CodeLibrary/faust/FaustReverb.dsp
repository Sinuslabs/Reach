// Faust Source File: reverbtest
// Created with HISE on 2022-10-12
import("stdfaust.lib");

t60 = hslider("ReverbTime", 4.2, 0.1, 12, 0.1); 

damp = hslider("Damping", 0.5, 0.0, 1.0, 0.01); 

size = hslider("Size", 3.5, 0.5, 5.0, 0.01); 

early_diff = hslider("Diffusion", 0.707, 0.0, 1.0, 0.01); 

mod_depth = hslider("Mod Depth", 0.1, 0.0, 1.0, 0.01);

mod_freq = hslider("Mod Frequency", 0.1, 0.0, 10.0, 0.01); 

low = hslider("LF Gain", 1.0, 0.0, 1.0, 0.01);

mid = hslider("MID Gain", 1.0, 0.0, 1.0, 0.01);

high = hslider("HF Gain", 1.0, 0.0, 1.0, 0.01); 

lowcut = hslider("Low Crossover", 600, 100, 6000, 1); 
highcut = hslider("High Crossover", 5000, 1000, 10000, 1); 

process = re.jpverb(t60, damp, size, early_diff, mod_depth, mod_freq, low, mid, high, lowcut, highcut);