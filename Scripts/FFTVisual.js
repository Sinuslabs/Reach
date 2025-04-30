namespace FFTVisual {
	
	reg fftHistory = []; // Array to store historical paths
	var HISTORY_SIZE = 15; // How many paths to store and draw
	reg X_OFFSET_STEP = 6; // Pixels to shift right per step
	reg Y_OFFSET_STEP = -3; // Pixels to shift up per step (negative Y is up in HISE)
	const var MIN_ALPHA = 0.0; // Minimum alpha for the oldest paths
	const var SCALE_REDUCTION = 0.3;
	// Minimum scale factor to prevent paths from becoming invisible
	const var MIN_SCALE = 0.1;
	
	// Colours (Use HISE colour values, e.g., 0xFFRRGGBB or Colours.xxxxx)
	reg analyserGradTopBase = Colours.lightgrey;          // Base colour for gradient top
	reg analyserGradBottomBase = Colours.lightblue;         // Base colour for gradient bottom
	reg analyserOutlineBase = Colours.withAlpha('0x8A999E', 0.1); // Base colour for outline before mixing
	reg analyserGradMixTargetColour = Colours.lightblue;
	reg analyserOutlineThickness = 1.0; 
	reg analyserOutlineMixTargetColour = Colours.red;
		
	// Drawing Toggles
	reg drawAnalyserFill = true;    // Set to false to hide the gradient fill
	reg drawAnalyserOutline = true; 
	
	const var DB = Synth.getDisplayBufferSource("Analyser1");
	const var buffer = DB.getDisplayBuffer(0);
	const var Panel1 = Content.getComponent("Panel1");
	Panel1.setPaintRoutine(drawAnalyser);
	
	const theme_LavenderFade = {
	  "name": "Lavender Fade",
	  "gradTopBase": "0xFFDEE3FE",      // Light Lavender Blue
	  "gradBottomBase": "0xFF7D91F9",   // Medium Blue/Purple
	  "outlineBase": "0xFF7D91F9",      // Semi-transparent darker blue outline
	  "mixTargetColour": '0xFFDEE3FE',
  	  "OutlineMixTargetColour": "0xFFBEC8FC",   // Mix towards White  // Mix towards White
	  "drawFill": true,                 // Fill: Yes
	  "drawOutline": true,
	  "outlineThickness": 1.0
	};
	
	loadVisualizerTheme(theme_LavenderFade);
	inline function loadVisualizerTheme(themeData) {
		
		// Load Colours (expects hex strings like "0xFFRRGGBB" or "0xAARRGGBB")
		    analyserGradTopBase = themeData.gradTopBase;
		    Console.print("Loaded gradTopBase: " + themeData.gradTopBase); // Debug output
		
		    analyserGradBottomBase = themeData.gradBottomBase;
		    Console.print("Loaded gradBottomBase: " + themeData.gradBottomBase); // Debug output
		
		    analyserOutlineBase = themeData.outlineBase;
		    Console.print("Loaded outlineBase: " + themeData.outlineBase); // Debug output
		
		    analyserGradMixTargetColour = themeData.mixTargetColour;
		    Console.print("Loaded mixTargetColour: " + themeData.mixTargetColour); // Debug output
		
		    drawAnalyserFill = themeData.drawFill;
		    Console.print("Loaded drawFill: " + themeData.drawFill); // Debug output
		
		    drawAnalyserOutline = themeData.drawOutline;
		    Console.print("Loaded drawOutline: " + themeData.drawOutline); // Debug output
		
		    analyserOutlineThickness = themeData.outlineThickness;
		    
		    analyserOutlineMixTargetColour = themeData.OutlineMixTargetColour;
		    // Debug output
		    
	}
	
	const var AnimationQuality_knb = Content.getComponent("AnimationQuality_knb");
	AnimationQuality_knb.setLocalLookAndFeel(EffectCustomizer.displayKnobLaf);
	
	reg timerAmount = 20;

	AnimationQuality_knb.setControlCallback(onQuality);
	inline function onQuality(component, value) {
		switch(value) {
			case 0:
				HISTORY_SIZE = 0.1;
				Y_OFFSET_STEP = 0;
				X_OFFSET_STEP = 30;
				timerAmount = 30;
				Panel1.startTimer(timerAmount);
				break;
			case 1:
				HISTORY_SIZE = 2;
				Y_OFFSET_STEP = 0;
				X_OFFSET_STEP = 35;
				timerAmount = 25;
				Panel1.startTimer(timerAmount);
				break;
			case 2: 
				HISTORY_SIZE = 4;
				Y_OFFSET_STEP = -0.4;
				X_OFFSET_STEP = 17;
				timerAmount = 22;
				Panel1.startTimer(timerAmount);
				break;
			case 3:
				HISTORY_SIZE = 7;
				Y_OFFSET_STEP = -1;
				X_OFFSET_STEP = 10;
				timerAmount = 20;
				Panel1.startTimer(timerAmount);
				break;
			case 4:
				HISTORY_SIZE = 10;
				Y_OFFSET_STEP = -2;
				X_OFFSET_STEP = 8;
				break;
			case 5:
				HISTORY_SIZE = 15;	
				X_OFFSET_STEP = 6; // Pixels to shift right per step
				Y_OFFSET_STEP = -3;
				break;
		}
		UserSettings.quality = value;
		UserSettings.saveSettings();
	}
	
	
	
	var aniDelay = 1;
	Content.callAfterDelay(aniDelay, function() {
		Panel1.startTimer(timerAmount);	
	}, {});
	
	
	Panel1.setTimerCallback(function()
	{
		var bf = buffer.createPath(this.getLocalBounds(0), // area
						 [0, BUFFER_LENGTH, 0, 1.0], // [x_start, x_end, y_min, y_max]
						 0.0 // start value (the initial value at position 0)
						 );
		var p = {
			path: bf
		};
		Panel1.setValue(p);
		updateFFTHistory(p);
		Panel1.repaint();
	});
	
	/**
	 * Call this function regularly (e.g., from a timer) to update the FFT history.
	 * Replace 'MyAnalyserNode' with the actual Script ID of your FFT analyser node.
	 */
	inline function updateFFTHistory(fftPath)
	{
	    if (typeof(fftPath) == "object" && isDefined(fftPath.path))
	    {
	        local newPath = fftPath.path;
	
	        // Add the new path to the beginning of the history array
	        fftHistory.insert(0, newPath);
	
	        // Limit the history size - remove the oldest path if the array is too long
	        if (fftHistory.length > HISTORY_SIZE)
	        {
	            fftHistory.pop(); // Removes the last element (the oldest one)
	        }
	
	        this.repaint();
	    }
	}
	

	inline function drawAnalyser(g)
	{
	    // Get the full drawing area bounds ONCE
	    local baseBounds = this.getLocalBounds(10); // Using 10 as in original, adjust if 0 is correct
	    local baseW = baseBounds[2]; // Width
	    local baseH = baseBounds[3]; // Height
	    local baseX = baseBounds[0]; // X position
	    local baseY = baseBounds[1]; // Y position
	    local baseCx = baseX + baseW / 2.0; // Center X
	    local baseCy = baseY + baseH / 2.0; // Center Y
	
	    // Check if fftHistory is valid and has items
	    if (typeof fftHistory == 'undefined' || !fftHistory.length)
	        return; // Nothing to draw
	
	    local historyCount = fftHistory.length;
	
	    // --- Get Mix Value ---
	    // Get the mix value (e.g., from a knob)
	    // Default to 0 if knob doesn't exist to prevent errors
	    local reverbMixValue = 0.0;
	    // ** IMPORTANT: Ensure 'Reverb.knob_reverb_mix' exists in your project **
	    // ** or replace this with your actual control variable **
        reverbMixValue = Reverb.knob_reverb_mix.getValue();
	        // Optional: Print a warning if the knob isn't found
	        // Console.print("Warning: Reverb.knob_reverb_mix not found. Mix set to 0.");
	
	    // --- Calculate Frame Base Colours (Mixed based on knob) ---
	    // Mixes Base towards Target, Amount controlled by reverbMixValue (0=Base, 1=Target)
	    // ** MODIFIED: Uses separate targets for gradient and outline **
	    local frameGradTop = Colours.mix(analyserGradMixTargetColour, analyserGradTopBase, reverbMixValue);
	    local frameGradBottom = Colours.mix(analyserGradMixTargetColour, analyserGradBottomBase, reverbMixValue);
	    local frameOutline = Colours.mix(analyserOutlineMixTargetColour, analyserOutlineBase, reverbMixValue); // Uses separate outline target
	
	
	    // --- Iterate through Path History ---
	    // Iterate backwards through the history (oldest path first for drawing order)
	    for (i = historyCount - 1; i >= 0; i--)
	    {
	        local path = fftHistory[i]; // Get the original path
	
	        // --- Calculate Visual Properties based on Age ---
	         // Prevent division by zero if HISTORY_SIZE is 0 or less (e.g., from Quality knob)
	        local ageFactor = Math.min(1.0, i / Math.max(1, HISTORY_SIZE));
	
	        // 1. Alpha (Fade out older paths)
	        local alpha = 1.0 - ageFactor * (1.0 - MIN_ALPHA);
	        alpha = Math.max(MIN_ALPHA, alpha); // Clamp to minimum alpha
	         // Ensure newest path is visible if history size is effectively zero
	         if (HISTORY_SIZE <= 0) alpha = 1.0;
	
	        // 2. Scale (Shrink older paths)
	        local scaleFactor = 1.0 - ageFactor * SCALE_REDUCTION;
	        scaleFactor = Math.max(MIN_SCALE, scaleFactor); // Clamp to minimum scale
	
	        // 3. Offset (Shift older paths)
	        local offsetX = i * X_OFFSET_STEP;
	        local offsetY = i * Y_OFFSET_STEP;
	
	        // --- Calculate the new drawing bounds for this specific path ---
	        local newW = baseW * scaleFactor;
	        local newH = baseH * scaleFactor;
	        local newX = baseCx - (newW / 2.0) + offsetX;
	        local newY = baseCy - (newH / 2.0) + offsetY;
	        // Keep the original width adjustment, ensure it's intended
	        local drawBounds = [newX, newY, newW - 50, newH]; // [x, y, width, height]
	
	        // --- Draw Fill (Conditionally) ---
	        if (drawAnalyserFill)
	        {
	            // Apply the calculated age alpha to the frame's base gradient colours
	            local currentTopColour = Colours.withAlpha(frameGradTop, alpha * 0.95); // Slight reduction as before
	            local currentBottomColour = Colours.withAlpha(frameGradBottom, alpha * 0.95);
	
	            // Define gradient start and end points using the calculated bounds
	            local gradStartX = newX;
	            local gradStartY = newY + 40; // Keep original vertical offset for gradient start
	            local gradEndX = newX;        // Same X for vertical gradient
	            local gradEndY = newY + newH; // Bottom edge of bounds
	
	            // Create the gradient data array
	            local gradientData = [
	                currentTopColour, gradStartX, gradStartY,
	                currentBottomColour, gradEndX, gradEndY,
	                false // Linear gradient
	            ];
	
	            // Draw Fill
	            g.setGradientFill(gradientData);
	            g.fillPath(path, drawBounds);
	        }
	
	        // --- Draw Outline (Conditionally) ---
	        if (drawAnalyserOutline)
	        {
	            // Apply the calculated age alpha to the frame's base outline colour
	            local currentOutlineColour = Colours.withAlpha(frameOutline, alpha);
	
	            // Draw Outline
	            g.setColour(currentOutlineColour);
	            // Use the external variable for thickness
	            g.drawPath(path, drawBounds, analyserOutlineThickness);
	        }
	    } // End of path loop
	
	    // --- Add Noise Effect ---
	    // Add noise effect at the end (applied over all drawn paths)
	    g.addNoise({
	        alpha: 0.01, // Keep original noise settings
	        monochromatic: false
	    });
	}

}

