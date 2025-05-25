Content.makeFrontInterface(400, 400);


const var Panel1 = Content.getComponent("Panel1");
const var DBS = Synth.getDisplayBufferSource('Analyser1');
const var DP = DBS.getDisplayBuffer(0);

Panel1.setTimerCallback(onT);
Panel1.startTimer(20);

inline function onT() {
	
	local bf = DP.createPath(this.getLocalBounds(0), // area
		 [0, BUFFER_LENGTH, 0, 1.0], // [x_start, x_end, y_min, y_max]
		 0.0 // start value (the initial value at position 0)
	 );
	local p = {
		path: bf
	};
	Panel1.setValue(p);
	Panel1.repaint();
}

 
Panel1.setPaintRoutine(function(g)
{
	g.setColour(Colours.white);
	
	var data = this.getValue();
	
	if (data['path']) g.fillPath(data['path'], this.getLocalBounds(0));
	
}); 
 
namespace MinimalFftAnalyser
{
    // Core components
    const var Analyser1 = Synth.getEffect("Analyser1");
    const var source = Synth.getDisplayBufferSource("Analyser1");
    const var fftTimer = Engine.createTimerObject();
    const var pnl_Fft = Content.getComponent("pnl_Fft0");
    
    // Display buffer
    pnl_Fft.data.buffer = source.getDisplayBuffer(0);
    pnl_Fft.data.buffer.setActive(true);
    pnl_Fft.data.path = Content.createPath();
    
    // Processing buffers
    const buff = Buffer.create(pnl_Fft.data.buffer.getReadBuffer().length);
    reg lastPoints = [];

    // Configuration constants
    const THRESHOLD = 1.0;   
    const SIGNAL_DECAY = 0.1; 
    const SILENCE_THRESHOLD = 0.05; 
    const DISPLAY_BINS = 4098;  // Increase/Decrease for more detail
    const HEIGHT_SCALE = 0.5;  
    const CURVE = 0.99;
    
    // Frequency mapping parameters
    const MIN_FREQ = 20;       // Hz - lowest frequency to display
    const MAX_FREQ = 20000;    // Hz - highest frequency to display
    const SAMPLE_RATE = Engine.getSampleRate(); // Hz - adjust to match your system
    Console.print(SAMPLE_RATE);
    
    // Amplitude response settings
    const AMPLITUDE_DECAY = 0.95;     // Higher values = slower decay
    const AMPLITUDE_ATTACK = 0.3;     // Higher values = faster attack
    const MAX_MAGNITUDE = 0.1;        // Lowered to make visualization more sensitive
    const MIN_DISPLAY_DB = -60;       // Minimum dB level to display (lower = more sensitive)
    
    const button = Content.getComponent("Button1");
    
    // Fixed scaling factor - adjust for desired sensitivity
    const scaleFactor = 4.0;   // Increased for better visibility
    
    // State variables
    reg signalLevel = 0.0;
    reg smoothedMagnitudes = [];      // Array to store smoothed magnitude values
    
    // Button callback for enabling/disabling the FFT
    inline function onButton1Control(component, value)
    {
        if (value == 1)
            fftTimer.startTimer(30);
        else
            fftTimer.stopTimer();
    }
    
    button.setControlCallback(onButton1Control);
    
    // Initialize the FFT system
    inline function initialize()
    {
        pnl_Fft.setPaintRoutine(fftPaintRoutine);
        updateFFT();
        fftTimer.setTimerCallback(updateFFT);
        fftTimer.startTimer(30);
    }
    
    // Main paint routine for the FFT panel
    inline function fftPaintRoutine(g)
    {
        local bounds = this.getLocalBounds(0);
        local w = bounds[2];
        local h = bounds[3];
        local path = this.data.path;
        
        g.setColour(Colours.withAlpha(0xFFFFFFFF, signalLevel));
        g.fillPath(path, [0, 0, w, h]);
    }
    
    // Converts linear magnitude to decibels with a minimum threshold
    inline function linearToDb(linearValue)
    {
        if (linearValue < 0.000001) 
            return MIN_DISPLAY_DB;
            
        local dbValue = 20.0 * Math.log10(linearValue);
        return Math.max(dbValue, MIN_DISPLAY_DB);
    }
    
    // Maps decibels to display height with a better curve
    inline function dbToDisplayHeight(db, height)
    {
        local normalized = (db - MIN_DISPLAY_DB) / (-MIN_DISPLAY_DB);
        normalized = Math.max(0, Math.min(1, normalized));
        normalized = Math.pow(normalized, CURVE);
        
        return height/2 - (normalized * height/2 * HEIGHT_SCALE);
    }
    
    // Detects signal level from buffer data with improved decaying
    inline function detectSignalLevel()
    {
        local magnitude = buff.getMagnitude(0, buff.length);
        
        // Use slower decay for a more natural fade out
        signalLevel = Math.max(magnitude * scaleFactor, signalLevel * SIGNAL_DECAY);
        signalLevel = Math.min(1.0, signalLevel);
        
        return signalLevel;
    }
    
    // Handles silence or very low signal
    inline function handleSilence(path, w, h)
    {
        // Reset smoothed magnitudes during silence
        smoothedMagnitudes = [];
        
        for (i = 0; i < lastPoints.length; i++)
            lastPoints[i] = h/2;
        
        path.lineTo(w, h/2);
        path.lineTo(w, h/2);
        path.lineTo(0, h/2);
        path.closeSubPath();
        
        return path;
    }
    
    // Creates the FFT path with optimized points and improved frequency distribution
    inline function createFilteredPath()
    {
        local bounds = pnl_Fft.getLocalBounds(0);
        local w = bounds[2];
        local h = bounds[3];
        
        local path = Content.createPath();
        path.startNewSubPath(0, h/2);
        
        local actualBins = Math.min(DISPLAY_BINS, buff.length);
        
        detectSignalLevel();
        
        if (lastPoints.length != actualBins)
        {
            lastPoints = [];
            for (i = 0; i < actualBins; i++)
                lastPoints[i] = h/2;
        }
        
        // Initialize smoothedMagnitudes if needed
        if (smoothedMagnitudes.length != actualBins)
        {
            smoothedMagnitudes = [];
            for (i = 0; i < actualBins; i++)
                smoothedMagnitudes[i] = 0.0;
        }
        
        if (signalLevel < SILENCE_THRESHOLD)
            return handleSilence(path, w, h);
        
        // Calculate the proper bin-to-frequency mapping
        local totalBins = buff.length;
        local binFrequencies = [];
        
        // Pre-calculate bin frequencies
        for (i = 0; i < actualBins; i++)
        {
            local freq = (i / totalBins) * (SAMPLE_RATE / 2);
            binFrequencies[i] = freq;
        }
        
        // Now draw the path using the frequency mapping
        for (i = 0; i < actualBins; i++)
        {
            local freq = binFrequencies[i];
            
            // Skip if frequency is out of our visible range
            if (freq < MIN_FREQ || freq > MAX_FREQ)
                continue;
                
            // Logarithmic mapping of frequency to x position
            local logPos = Math.log(freq / MIN_FREQ) / Math.log(MAX_FREQ / MIN_FREQ);
            local x = logPos * w;
            
            // Get current bin magnitude
            local magnitude = Math.abs(buff[i]);
            
            // Apply envelope smoothing for each bin
            // Fast attack, slow decay
            if (magnitude > smoothedMagnitudes[i])
                smoothedMagnitudes[i] = smoothedMagnitudes[i] * (1 - AMPLITUDE_ATTACK) + magnitude * AMPLITUDE_ATTACK;
            else
                smoothedMagnitudes[i] = smoothedMagnitudes[i] * AMPLITUDE_DECAY;
            
            // Convert to dB for better visualization
            local dbValue = linearToDb(smoothedMagnitudes[i]);
            
            // Map dB to display height
            local y = dbToDisplayHeight(dbValue, h);
            
            // Ensure valid range
            y = Math.max(0, Math.min(h, y));
            
            if (Math.abs(y - lastPoints[i]) >= THRESHOLD)
            {
                path.lineTo(x, y);
                lastPoints[i] = y;
            }
            else
            {
                path.lineTo(x, lastPoints[i]);
            }
        }
        
        path.lineTo(w, lastPoints[actualBins-1]);
        path.lineTo(w, h/2);
        path.lineTo(0, h/2);
        path.closeSubPath();
        
        return path;
    }
    
    // Main update function called by the timer
    inline function updateFFT()
    {
        pnl_Fft.data.buffer.copyReadBuffer(buff);
        pnl_Fft.data.path = createFilteredPath();
        pnl_Fft.repaint();
    }
    
    // Initialize everything
    initialize();
}
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
 