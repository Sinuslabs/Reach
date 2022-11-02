namespace ReverbAnimation {
	const var AnimationPanel = Content.getComponent("panel_animation_reverb");
	
	// Wiggle Animation Timer
	const var reverbAnimationTimer = Engine.createTimerObject();
	reverbAnimationTimer.setTimerCallback(rotateRotor);	
	reg rotor = 0;
	
	// Animation Tweaks & Settings
	const PADDING = 10;
	
	// Wiggle timer refresh speed
	// lower is faster	
	// ! adjusting the refresh speed is also changing the animation speed not only frame rate !
	const REFRESH_SPEED = 30;
	
	const RINGS_AMOUNT = 10;
	const OUTTER_THICKNESS_MULTIPLIER = 10;
	const INNER_THICKNESS_MULTIPLIER = 0.2;
	const ZOOM_AMOUNT = 2;
	const RECT_THICKNESS_MULTIPLIER = 5;
	const AMPLITUDE = 2;
	const WIGGLE_SPEED = 0.5;
	
	// Animation Default Values
	reg outterThickness = 2;
	reg innerThickness = 2;
	reg rectThickness = 5;
	reg rings = 4;
	reg zoom = 1;
	reg amplitude = 1;
	reg wiggleSpeed = 1;
	
	inline function setoutterThickness(amount) { outterThickness = OUTTER_THICKNESS_MULTIPLIER * amount; }
	inline function setInnerThickness(amount) { innerThickness = INNER_THICKNESS_MULTIPLIER * amount; }
	inline function setRectThickness(amount) { rectThickness = RECT_THICKNESS_MULTIPLIER * amount; }
	inline function setRings(amount) { rings = RINGS_AMOUNT * amount; }	
	inline function setZoom(amount) { zoom = 1 - (amount * -1) * ZOOM_AMOUNT; }
	inline function setAmplitude(amount) { amplitude = AMPLITUDE * amount; }
	inline function setSpeed(amount) { wiggleSpeed = WIGGLE_SPEED * amount; }
	
	inline function startTimer() {
		reverbAnimationTimer.isTimerRunning() ?
			reverbAnimationTimer.resetCounter() :
			reverbAnimationTimer.startTimer(REFRESH_SPEED);
	}
	
	inline function stopTimer() {
		reverbAnimationTimer.stopTimer();
	}
	
	inline function rotateRotor() {
		
		rotor += wiggleSpeed;
		if (counter >= 360) counter = 0;
		
		AnimationPanel.repaintImmediately();
	}

	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {
		
		local swing = Math.sin(rotor) * amplitude;
		
		local a = [
			0,
			0,
			this.getWidth(),
			this.getHeight(),
		];
		
		local pa = [
			a[0] + PADDING,
			a[1] + PADDING,
			a[2] - PADDING * 2,
			a[3] - PADDING * 2
		];
		
	    g.setColour(DisplayTheme.buttonSelectedBackgroundColour);
	    
	    if (outterThickness >= 0.1) {
	    	g.drawEllipse(pa, outterThickness);		    
	    }
	        
	    local radius = a[3] / 2 - (PADDING * 2) * zoom;
	    local diameter;
	    local pos;
	
	    g.drawRect(a, rectThickness);
	    
	    for (i = 1; i < rings; i++) {
	        diameter = (radius * 2 / 4 * i + (PADDING * 2));
	        pos = a[2] / 2 - diameter / 2;
	        if (pos > 0) {
		        if (pos < 10) return;
	            
	            g.drawEllipse([
		            pos + PADDING + swing * i,
		            pos + PADDING,
		            diameter - PADDING * 2,
		            diameter - PADDING * 2
	            ], innerThickness);
	         }
	    }
	    

	};
}

