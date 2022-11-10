namespace DistortionAnimation {
	const var AnimationPanel = Content.getComponent('panel_animation_distortion');
	
	// Settings
	const ALPHA_MULTIPLIER = 2;
	const SCALE_MULITPLIER = 0.5;

	
	reg alpha = 0;
	reg scale = 0;
	
	inline function setAlpha(amount) { alpha = ALPHA_MULTIPLIER * amount; }
	inline function setScale(amount) { scale = SCALE_MULITPLIER * amount + 0.15; }
	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {		
		local a = [ 0, 0, this.getWidth(), this.getHeight()];
		
		g.addNoise({
			alpha: alpha,
			monochromatic: true,
			scaleFactor: scale,
			area: a
		});
	};
}