declare name "fuzz -- a simple distortion effect";
declare author "Oskar Schachtschneider Sinuslabs";
declare version "1.0";

import("music.lib");

dist	= hslider("distortion", 12, 0, 100, 0.1);	// distortion parameter
gain	= hslider("gain", 2, -96, 3, 0.1);		// output gain (dB)

// the waveshaping function
f(a,x)	= x*(abs(x) + a)/(x*x + (a-1)*abs(x) + 1);

// gain correction factor to compensate for distortion
g(a)	= 1/sqrt(a+1);

process	= vgroup("dist", (out, out))
with { out(x) = db2linear(gain)*g(dist)*f(db2linear(dist),x); };