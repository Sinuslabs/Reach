namespace ChorusAnimations {
	const var AnimationPanel = Content.getComponent('panel_animation_chorus');
	
	// Wiggle Animation Timer
	const var chorusAnimationTimer = Engine.createTimerObject();
	chorusAnimationTimer.setTimerCallback(rotateRotor);	
	reg rotor = 0;
	
	// Settings
	const PADDING = 10;
	const SHIFT_MULTIPLIER = 30;
	const AMPLITUDE = 100;
	const REFRESH_SPEED = 30;
	const WIGGLE_SPEED = 0.15;
	
	reg shift = 0;
	reg thickness = 5;
	reg amplitude = 1;
	reg dots = 6;
	
	inline function setShift(amount) { shift = SHIFT_MULTIPLIER * amount; }
	inline function setAmplitude(amount) { amplitude = AMPLITUDE * amount; }
	
	inline function startTimer() {
		chorusAnimationTimer.isTimerRunning() ?
			chorusAnimationTimer.resetCounter() :
			chorusAnimationTimer.startTimer(REFRESH_SPEED);
	}
	
	inline function stopTimer() {
		Console.print('stop');
	
		chorusAnimationTimer.stopTimer();
	}
	
	inline function rotateRotor() {
	
		rotor += WIGGLE_SPEED;
		if (rotor >= 360) rotor = 0;
		
		AnimationPanel.repaintImmediately();
	}
	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {
		
		
		local DOT_SIZE = 15;
		
		local a = [ this.getWidth() / 2, 20, DOT_SIZE, DOT_SIZE];
		g.setColour(Colours.white);
		
		local swingAmount = [0.9, 1.6, 1, 1.2, 0.8, 1.4];
		
		for (i=1; i<=dots; i++) {
			
			local swing = Math.sin(rotor * swingAmount[i-1]) * amplitude ;
		
			g.fillEllipse([a[0] + swing, a[1] + i * 30, a[2], a[3]]);			
		}
	};
}