namespace Reverb {
	
	//const FaustVerb = Synth.getEffect('FaustReverb');
	//const FreeVerb = Synth.getEffect("Freeverb");
	
	// Reverb
	Content.getComponent("knob_reverb_space").setControlCallback(spaceControl);
	Content.getComponent("knob_reverb_diffusion").setControlCallback(diffusionControl);
	Content.getComponent("knob_reverb_damping").setControlCallback(dampingControl);
	Content.getComponent("knob_reverb_time").setControlCallback(timeControl);
	
	// Modulation
	Content.getComponent("knob_modulation_depth").setControlCallback(depthControl);
	Content.getComponent("knob_modulation_frequency").setControlCallback(frequencyControl);
	
	reg JPVerb;
	
	inline function spaceControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.Size, value);
		
		updateParameterWithLabel('SPACE', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRings(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	

	inline function diffusionControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.Diffusion, value);
		
		updateParameterWithLabel('DIFFUSION', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setoutterThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function dampingControl(component, value) {
	
		JPVerb.setAttribute(JPVerb.Damping, value);
		
		updateParameterWithLabel('DAMPING', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRectThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function timeControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.ReverbTime, value);
		updateParameterWithLabel('TIME', value, 's');
		showTempScreen('reverb');
		
		
		ReverbAnimation.setZoom(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	inline function depthControl(component, value) {
		JPVerb.setAttribute(JPVerb.ModDepth, value);
		
		updateParameterWithLabel('MOD DEPTH', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setAmplitude(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	inline function frequencyControl(component, value) {
		JPVerb.setAttribute(JPVerb.ModFrequency, value);
		
		updateParameterWithLabel('MOD FREQUENCY', value, 'hz');
		showTempScreen('reverb');
		
		ReverbAnimation.setSpeed(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	
	
	
}