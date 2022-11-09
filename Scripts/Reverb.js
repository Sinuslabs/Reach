namespace Reverb {
	
	
	reg JPVerb;
	
	// Reverb
	const var knob_reverb_space = Content.getComponent("knob_reverb_space");
	const var knob_reverb_diffusion = Content.getComponent("knob_reverb_diffusion");
	const var knob_reverb_damping = Content.getComponent("knob_reverb_damping");
	const var knob_reverb_time = Content.getComponent("knob_reverb_time");
	
	
	knob_reverb_space.setControlCallback(sizeControl);
	knob_reverb_diffusion.setControlCallback(diffusionControl);
	knob_reverb_damping.setControlCallback(dampingControl);
	knob_reverb_time.setControlCallback(timeControl);
	
	// Modulation
	Content.getComponent("knob_modulation_depth").setControlCallback(depthControl);
	Content.getComponent("knob_modulation_frequency").setControlCallback(frequencyControl);
	
	// Display 
	const var displayKnob_reverb_damping = Content.getComponent("displayKnob_reverb_damping");
	const var displayKnob_reverb_diffusion = Content.getComponent("displayKnob_reverb_diffusion");
	const var displayKnob_reverb_reverbTime = Content.getComponent("displayKnob_reverb_reverbTime");
	const var displayKnob_reverb_size = Content.getComponent("displayKnob_reverb_size");
	Content.getComponent("displayKnob_reverb_lowcrossover").setControlCallback(disLowcrossoverControl);
	Content.getComponent("displayKnob_reverb_lowGain").setControlCallback(disLowGainControl);
	Content.getComponent("displayKnob_reverb_highcrossover").setControlCallback(disHighcrossoverControl);	
	Content.getComponent("displayKnob_reverb_midgain").setControlCallback(disMidgainControl);
	Content.getComponent("displayKnob_reverb_hfgain").setControlCallback(disHFgainControl);
	
	
    displayKnob_reverb_damping.setControlCallback(disDampingControl);
    displayKnob_reverb_diffusion.setControlCallback(disDiffusionControl);
    displayKnob_reverb_reverbTime.setControlCallback(disReverbTimeControl);
    displayKnob_reverb_size.setControlCallback(disSizeControl);
	
	
	inline function sizeControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.Size, value);
		
		displayKnob_reverb_size.setValue(value);
		
		updateParameterWithLabel('SPACE', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRings(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	

	inline function diffusionControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.Diffusion, value);
		displayKnob_reverb_diffusion.setValue(value);
		
		updateParameterWithLabel('DIFFUSION', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setoutterThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function dampingControl(component, value) {
	
		JPVerb.setAttribute(JPVerb.Damping, value);
		displayKnob_reverb_damping.setValue(value);
		
		updateParameterWithLabel('DAMPING', value, '%');
		showTempScreen('reverb');
		
		ReverbAnimation.setRectThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function timeControl(component, value) {
		
		JPVerb.setAttribute(JPVerb.ReverbTime, value);
		displayKnob_reverb_reverbTime.setValue(value);
		
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
	
	// Display Callbacks
	inline function disDampingControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.Damping, value);
		knob_reverb_damping.setValue(value);
	};
	
	
	inline function disDiffusionControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.Diffusion, value);
		knob_reverb_diffusion.setValue(value);
	};
	
	
	inline function disReverbTimeControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.ReverbTime, value);
		knob_reverb_time.setValue(value);
	};
	
	
	inline function disSizeControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.Size, value);
		knob_reverb_space.setValue(value);
	};
	
	
	inline function disLowcrossoverControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.LowCrossover, value);
	};
	
	
	inline function disHighcrossoverControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.HighCrossover, value);
	};
	
	
	inline function disLowGainControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.LFGain, value);
	};
	
	
	inline function disMidgainControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.MidGain, value);
	};
	
	
	
	inline function disHFgainControl(component, value)
	{
		JPVerb.setAttribute(JPVerb.HFGain, value);
	};
	
	
	
	
	
	
	
	
}