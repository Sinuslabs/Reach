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
	
	
	Reverb.button_freeze.setControlCallback(freezeControl);
	
	inline function spaceControl(component, value)
	{
		//Reverb.setAttribute(Reverb.RoomSize, value);
		updateParameterWithLabel('SPACE', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimationPanel.setValue(component.get("max") + 1 - (value * -1) * 7);
		ReverbAnimationPanel.repaint();
	};
	

	inline function diffusionControl(component, value)
	{
		//Reverb.setAttribute(Reverb.Width, value);
		updateParameterWithLabel('DIFFUSION', value, '%');
		showTempScreen('reverb');
		
		AN_STATE.limit = value * 14;
		ReverbAnimationPanel.repaint();
	};
	
	inline function dampingControl(component, value)
	{
		//Reverb.setAttribute(Reverb.Damping, value);
		updateParameterWithLabel('DAMPING', value, '%');
		showTempScreen('reverb');
		
		AN_STATE.outterThickness = (value + 0.2) * 10 ;
		ReverbAnimationPanel.repaint();
	};
	
	
	inline function freezeControl(component, value)
	{
		//Reverb.setAttribute(Reverb.FreezeMode, value);
		updateFreezeParameter(value);
	};
	
	
	inline function timeControl(component, value)
	{
	};
	
	
	inline function depthControl(component, value)
	{
		//Add your custom logic here...
	};
	
	
	inline function frequencyControl(component, value)
	{
		//Add your custom logic here...
	};
	
	
	
	
	
}