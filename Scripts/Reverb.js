namespace Reverb {
	
	const FaustVerb = Synth.getEffect('FaustReverb');
	const FreeVerb = Synth.getEffect("Freeverb");
	
	// Reverb
	Content.getComponent("knob_reverb_space").setControlCallback(spaceControl);
	Content.getComponent("knob_reverb_diffusion").setControlCallback(diffusionControl);
	Content.getComponent("knob_reverb_damping").setControlCallback(dampingControl);
	const var button_freeze = Content.getComponent("button_freeze");
	Content.getComponent("knob_reverb_time").setControlCallback(timeControl);
	
	// Modulation
	Content.getComponent("knob_modulation_depth").setControlCallback(depthControl);
	Content.getComponent("knob_modulation_frequency").setControlCallback(frequencyControl);
	
	button_freeze.setControlCallback(freezeControl);
	
	inline function spaceControl(component, value) {
		
		FaustVerb.setAttribute(FaustVerb.Size, value);
		FreeVerb.setAttribute(FreeVerb.RoomSize, value);
		updateParameterWithLabel('SPACE', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimationPanel.setValue(component.get("max") + 1 - (value * -1) * 7);
		ReverbAnimationPanel.repaint();
	};
	

	inline function diffusionControl(component, value) {
		
		FaustVerb.setAttribute(FaustVerb.Diffusion, value);
		FreeVerb.setAttribute(FreeVerb.Width, value);
		updateParameterWithLabel('DIFFUSION', value, '%');
		showTempScreen('reverb');
		
		AN_STATE.limit = value * 14;
		ReverbAnimationPanel.repaint();
	};
	
	inline function dampingControl(component, value) {
	
		FaustVerb.setAttribute(FaustVerb.Damping, value);
		FreeVerb.setAttribute(FreeVerb.Damping, value);
		updateParameterWithLabel('DAMPING', value, '%');
		showTempScreen('reverb');
		
		AN_STATE.outterThickness = (value + 0.2) * 10 ;
		ReverbAnimationPanel.repaint();
	};
	
	
	inline function freezeControl(component, value) {
	
		FreeVerb.setAttribute(FreeVerb.FreezeMode, value);
		updateFreezeParameter(value);
	};
	
	
	inline function timeControl(component, value) {
		
		FaustVerb.setAttribute(FaustVerb.ReverbTime, value);
		FreeVerb.setAttribute(FreeVerb.RoomSize, component.getValueNormalized());
		updateParameterWithLabel('TIME', value, 's');
		showTempScreen('reverb');
	};
	
	
	inline function depthControl(component, value) {
		FaustVerb.setAttribute(4, value);
		
		updateParameterWithLabel('MOD DEPTH', value, '%');
		showTempScreen('reverb');
	};
	
	
	inline function frequencyControl(component, value) {
		FaustVerb.setAttribute(5, value);
		
		updateParameterWithLabel('MOD FREQUENCY', value, 'hz');
		showTempScreen('reverb');
	};
	
	
	
	
	
}