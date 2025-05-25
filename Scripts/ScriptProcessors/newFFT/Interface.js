Content.makeFrontInterface(600, 600);

	
// Path for the file
var signalFile  = Engine.loadAudioFileIntoBufferArray("/Users/oskarsh/Documents/GitHub/Reach/AudioFiles/BassTables61.wav");

var dps = Synth.getDisplayBufferSource('Analyser1');
var dp = dps[0];


// Channel pick [0] left [1] right
const var signal = signalFile[0];
cost var signal = dp.getReadBuffer();

// Create a FFT object. If you right click on it in the 
// script watch table and view the popup you'll see a spectrogram
// for the data passed in
const var fft = Engine.createFFT();

// creates a spectrogram image (required for 
// the debug popup but might be used later to draw
// on a panel. */
fft.setEnableSpectrum2D(true);

// Set the window type for the processing
fft.setWindowType(fft.BlackmanHarris);

var fftResults = []; // Aquí vamos a guardar { offset, gain }
// 2d Spectrum parameters
fft.setSpectrum2DParameters({
  "FFTSize": 10,
  "DynamicRange": 100,
  "Oversampling": 1,
  "ColourScheme": 2,
  "GainFactor": 1000,
  "ResamplingQuality": "Low",
  "Gamma": 10,
  "Standardize": true,
  "FrequencyGamma": 10,
  "WindowType": 4
});

var param = fft.getSpectrum2DParameters();


// Give the fft a function that will be called for 
// each signal chunk. `data` will contain either a 
// buffer or an array of buffers containing the transformed
// FFT signal and offset will contain the index of the first
// sample in the chunk (here it will be 0, 1024, 2048 and 3072
// because the processing size is 1024
fft.setMagnitudeFunction(

(function(data, offset)
{
	
	var max = 0.0;
	
	for(s in data)
	{
		max = Math.max(max, s);
	}
	
	Console.print("The max value at " + offset + " is " + max);
	fftResults.push({ offset: offset, gain: max });
	
}), false);

fft.prepare(8192, 1);

Console.print(fftResults.length);

// Process the buffer with the function above.
fft.process(signal);	




/*
{
  "FFTSize": 13,
  "DynamicRange": 110,
  "Oversampling": 4,
  "ColourScheme": 2,
  "GainFactor": 1000,
  "ResamplingQuality": "Low",
  "Gamma": 60,
  "Standardize": false,
  "FrequencyGamma": 100,
  "WindowType": 4
}
*/



// Paint routine
const var Panel1 = Content.getComponent("Panel1");
Panel1.setPaintRoutine(function(g)
{
    g.setColour(Colours.white);
	g.drawFFTSpectrum(fft, this.getLocalBounds(0));
});

Panel1.repaint();
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 