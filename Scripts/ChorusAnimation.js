namespace ChorusAnimations {
	const var AnimationPanel = Content.getComponent('panel_animation_chorus');
	
	// Wiggle Animation Timer
	const var chorusAnimationTimer = Engine.createTimerObject();
	chorusAnimationTimer.setTimerCallback(rotateRotor);	
	reg rotor = 0;
	
	// Settings
	const PADDING = 10;
	const SHIFT_MULTIPLIER = 30;
	const AMPLITUDE = 60;
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
		chorusAnimationTimer.stopTimer();
	}
	
	inline function rotateRotor() {
	
		rotor += WIGGLE_SPEED;
		if (rotor >= 360) rotor = 0;
		
		AnimationPanel.repaintImmediately();
	}
	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {
		
		
		local DOT_SIZE = 9;
		
		local a = [ this.getWidth() / 2, 20, DOT_SIZE, DOT_SIZE];
		g.setColour(Colours.white);
		
		local swingAmount = [0.9, 1.6, 1, 1.2, 0.8, 1.4, 1.3];
		
		for (i=0; i<=dots; i++) {
			local shift = (i) * 18;
			local swing = Math.sin(rotor * swingAmount[i]) * amplitude ;
			//if (i==1) {
			//	shift = 0;
			//}
			g.fillEllipse([a[0] + swing, a[1] + shift, a[2], a[3]]);			
		}
	};
}