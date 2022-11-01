// Faust Source File: reverbtest
// Created with HISE on 2022-10-12
import("stdfaust.lib");

// approximate reverberation time in seconds ([0.1..60] sec) (T60 - the time for the reverb to decay by 60db when damp == 0 ). Does not effect early reflections
t60 = hslider("ReverbTime", 4.2, 0.1, 12, 0.1); 

// controls damping of high-frequencies as the reverb decays. 0 is no damping, 1 is very strong damping. Values should be between ([0..1])
damp = hslider("Damping", 0.5, 0.0, 1.0, 0.01); 

// scales size of delay-lines within the reverberator, producing the impression of a larger or smaller space. Values below 1 can sound metallic. Values should be between [0.5..5]
size = hslider("Size", 3.5, 0.5, 5.0, 0.01); 

// controls shape of early reflections. Values of 0.707 or more produce smooth exponential decay. Lower values produce a slower build-up of echoes. Values should be between ([0..1])
early_diff = hslider("Diffusion", 0.707, 0.0, 1.0, 0.01); 

// depth ([0..1]) of delay-line modulation. Use in combination with mod_freq to set amount of chorusing within the structure
mod_depth = hslider("Mod Depth", 0.1, 0.0, 1.0, 0.01);

// frequency ([0..10] Hz) of delay-line modulation. Use in combination with modDepth to set amount of chorusing within the structure
mod_freq = hslider("Mod Frequency", 0.1, 0.0, 10.0, 0.01); 

// multiplier ([0..1]) for the reverberation time within the low band
low = hslider("LF Gain", 1.0, 0.0, 1.0, 0.01);

mid = 1.0; // multiplier ([0..1]) for the reverberation time within the mid band

// multiplier ([0..1]) for the reverberation time within the high band
high = hslider("HF Gain", 1.0, 0.0, 1.0, 0.01); 

lowcut = 600;// frequency (100..6000 Hz) at which the crossover between the low and mid bands of the reverb occurs
highcut = 5000; // frequency (1000..10000 Hz) at which the crossover between the mid and high bands of the reverb

process = re.jpverb(t60, damp, size, early_diff, mod_depth, mod_freq, low, mid, high, lowcut, highcut);