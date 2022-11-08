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
	
	
	inline function spaceControl(component, value) {
		
		//FaustVerb.setAttribute(FaustVerb.Size, value);
		//FreeVerb.setAttribute(FreeVerb.RoomSize, value);
		
		updateParameterWithLabel('SPACE', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRings(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	

	inline function diffusionControl(component, value) {
		
		//FaustVerb.setAttribute(FaustVerb.Diffusion, value);
		//FreeVerb.setAttribute(FreeVerb.Width, value);
		
		updateParameterWithLabel('DIFFUSION', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setoutterThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function dampingControl(component, value) {
	
		//FaustVerb.setAttribute(FaustVerb.Damping, value);
		//FreeVerb.setAttribute(FreeVerb.Damping, value);
		
		updateParameterWithLabel('DAMPING', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRectThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function timeControl(component, value) {
		
		//FaustVerb.setAttribute(FaustVerb.ReverbTime, value);
		//FreeVerb.setAttribute(FreeVerb.RoomSize, component.getValueNormalized());
		updateParameterWithLabel('TIME', value, 's');
		showTempScreen('reverb');
		
		
		ReverbAnimation.setZoom(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	inline function depthControl(component, value) {
		//FaustVerb.setAttribute(4, value);
		
		updateParameterWithLabel('MOD DEPTH', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setAmplitude(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	inline function frequencyControl(component, value) {
		//FaustVerb.setAttribute(5, value);
		
		updateParameterWithLabel('MOD FREQUENCY', value, 'hz');
		showTempScreen('reverb');
		
		ReverbAnimation.setSpeed(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	
	
	
	
}