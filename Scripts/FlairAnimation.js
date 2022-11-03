
namespace FlairAnimation {
	
	const var AnimationPanel = Content.getComponent('panel_animation_flair1');
	
	// Wiggle Animation Timer
	const var flairAnimationTimer = Engine.createTimerObject();
	flairAnimationTimer.setTimerCallback(rotateRotor);	
	reg rotor = 0;
	
	// Settings
	const PADDING = 10;
	const SHIFT_MULTIPLIER = 30;
	const AMPLITUDE = 0.7;
	const REFRESH_SPEED = 30;
	const WIGGLE_SPEED = 0.15;
	
	reg shift = 0;
	reg thickness = 5;
	reg amplitude = 1;
	
	inline function setShift(amount) { shift = SHIFT_MULTIPLIER * amount; }
	inline function setAmplitude(amount) { amplitude = AMPLITUDE * amount; }
	
	inline function startTimer() {
		flairAnimationTimer.isTimerRunning() ?
			flairAnimationTimer.resetCounter() :
			flairAnimationTimer.startTimer(REFRESH_SPEED);
	}
	
	inline function stopTimer() {
		reverbAnimationTimer.stopTimer();
	}
	
	inline function rotateRotor() {
		rotor += WIGGLE_SPEED;
		if (rotor >= 360) rotor = 0;
		
		AnimationPanel.repaintImmediately();
	}
	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {
		
		local swing = Math.sin(rotor) * amplitude;
		
		local a = [ 0, 0, this.getWidth(), this.getHeight()];
		
		local leftA = [
			a[2] / 4 - PADDING + shift + swing * 10,
			a[1] + PADDING,
			a[2] / 2 + PADDING * 2,
			a[3] - PADDING * 2,
		];
		
		local rightA = [
			a[2] / 4 - PADDING - shift - swing * 10,
			a[1] + PADDING,
			a[2] / 2 + PADDING * 2,
			a[3] - PADDING * 2,
		];
		
		
		g.setColour(DisplayTheme.buttonSelectedBackgroundColour);
		g.drawEllipse(leftA, thickness);
		g.drawEllipse(rightA, thickness);
	};
}