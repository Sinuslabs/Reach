namespace FFTVisual {
	
	reg fftHistory = []; // Array to store historical paths
	var HISTORY_SIZE = 15; // How many paths to store and draw
	reg X_OFFSET_STEP = 6; // Pixels to shift right per step
	reg Y_OFFSET_STEP = -3; // Pixels to shift up per step (negative Y is up in HISE)
	const var MIN_ALPHA = 0.0; // Minimum alpha for the oldest paths
	const var SCALE_REDUCTION = 0.3;
	// Minimum scale factor to prevent paths from becoming invisible
	const var MIN_SCALE = 0.1;
	
	const var DB = Synth.getDisplayBufferSource("Analyser1");
	const var buffer = DB.getDisplayBuffer(0);
	const var Panel1 = Content.getComponent("Panel1");
	Panel1.setPaintRoutine(drawAnalyser);
	
	const var AnimationQuality_knb = Content.getComponent("AnimationQuality_knb");
	AnimationQuality_knb.setLocalLookAndFeel(EffectCustomizer.displayKnobLaf);
	
	AnimationQuality_knb.setControlCallback(onQuality);
	inline function onQuality(component, value) {
		switch(value) {
			case 0:
				HISTORY_SIZE = 0.1;
				Y_OFFSET_STEP = 0;
				X_OFFSET_STEP = 30;
			case 1:
				HISTORY_SIZE = 2;
				Y_OFFSET_STEP = 0;
				X_OFFSET_STEP = 35;
			case 2: 
				HISTORY_SIZE = 4;
				Y_OFFSET_STEP = -0.4;
				X_OFFSET_STEP = 17;
			case 3:
				HISTORY_SIZE = 7;
				Y_OFFSET_STEP = -1;
				X_OFFSET_STEP = 10;
			case 4:
				HISTORY_SIZE = 10;
				Y_OFFSET_STEP = -2;
				X_OFFSET_STEP = 8;
			case 5:
				HISTORY_SIZE = 15;	
				X_OFFSET_STEP = 6; // Pixels to shift right per step
				Y_OFFSET_STEP = -3;
				break;
		}
	}
	
	var aniDelay = 1100;
//	if (UserSettings.enableAnimations) {
//		aniDelay = 1100;
//	} else {
//		aniDelay = 1;
//	}
//	Content.callAfterDelay(aniDelay, function() {
		Panel1.startTimer(20);	
//	}, {});
	
	
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
	    // Using getLocalBounds(0) usually gets the component bounds.
	    // Using getLocalBounds(10) might add padding - ensure this is intended.
	    local baseBounds = this.getLocalBounds(10); // Changed back to 0, adjust if 10 is needed
	    local baseW = baseBounds[2]; // Width
	    local baseH = baseBounds[3]; // Height
	    local baseX = baseBounds[0]; // X position
	    local baseY = baseBounds[1]; // Y position
	    local baseCx = baseX + baseW / 2.0; // Center X
	    local baseCy = baseY + baseH / 2.0; // Center Y
	
	    local historyCount = fftHistory.length;
	
	    // Define base colours (using local as preferred in inline functions)
	    local strokeColourBase = Colours.lightblue; // Can be different if needed
		local gradColourTop = Colours.lightgrey;
		gradColourTop = Colours.mix(Colours.lightblue, gradColourTop, 1 - Reverb.knob_reverb_mix.getValue());
		   // Choose a bottom colour - darkblue provides good contrast
	   local gradColourBottom = Colours.lightblue;
		gradColourBottom = Colours.mix('0x7D91F9', gradColourBottom, 1 - Reverb.knob_reverb_mix.getValue());
	    // Iterate backwards through the history (oldest path first)
	    for (i = historyCount - 1; i >= 0; i--)
	    {
	        local path = fftHistory[i]; // Get the original path
	
	        // Calculate the 'age' factor (0 = newest, almost 1 = oldest)
	        local ageFactor = i / HISTORY_SIZE; // Make sure HISTORY_SIZE is defined globally
	
	        // --- Calculate Visual Properties based on Age ---
	
	        // 1. Alpha: Decays from 1.0 (newest) down towards MIN_ALPHA (oldest)
	        // Make sure MIN_ALPHA is defined globally (e.g., 0.1)
	        local alpha = 1.0 - ageFactor * (1.0 - MIN_ALPHA);
	        alpha = Math.max(MIN_ALPHA, alpha);
	
	        // 2. Scale: Decays from 1.0 down towards MIN_SCALE
	        // Make sure SCALE_REDUCTION and MIN_SCALE are defined globally
	        local scaleFactor = 1.0 - ageFactor * SCALE_REDUCTION;
	        scaleFactor = Math.max(MIN_SCALE, scaleFactor);
	
	        // 3. Offset: Increases for older paths
	        // Make sure X_OFFSET_STEP and Y_OFFSET_STEP are defined globally
	        local offsetX = i * X_OFFSET_STEP;
	        local offsetY = i * Y_OFFSET_STEP;
	
	        // --- Calculate the new drawing bounds ---
	        local newW = baseW * scaleFactor;
	        local newH = baseH * scaleFactor;
	        local newX = baseCx - (newW / 2.0) + offsetX;
	        local newY = baseCy - (newH / 2.0) + offsetY;
	        local drawBounds = [newX, newY, newW - 50, newH]; // [x, y, width, height]
	
              // --- Setup Gradient Fill Data ---
      
              // Apply the calculated alpha to BOTH gradient colours
              local currentTopColour = Colours.withAlpha(gradColourTop, alpha * 0.95);
              // Apply alpha to bottom. You can add a multiplier for faster fade if desired (e.g., alpha * 0.8)
              local currentBottomColour = Colours.withAlpha(gradColourBottom, alpha * 0.95);
      
              // Define gradient start and end points for a vertical gradient
              local gradStartX = newX;        // Start X (at left edge of bounds)
              local gradStartY = newY + 40;        // Start Y (at top edge of bounds)
              local gradEndX = newX;          // End X (same as start X for vertical)
              local gradEndY = newY + newH;   // End Y (at bottom edge of bounds)
      
              // Create the gradient data array
              local gradientData = [
                  currentTopColour, gradStartX, gradStartY,
                  currentBottomColour, gradEndX, gradEndY,
                  false // Linear gradient
              ];
      
              g.setGradientFill(gradientData);
                         
      		g.fillPath(path, drawBounds);
      		g.setColour(Colours.mix(
      		Colours.withAlpha('0x8A999E', 0.1),
      		Colours.lightblue,
      		Reverb.knob_reverb_mix.getValue()));
		g.drawPath(path, drawBounds, 1);
	    } // End of loop

			    
	  	g.addNoise({
 	  	     alpha: 0.02,
      			monochromatic: true
	  	});
	}

}

