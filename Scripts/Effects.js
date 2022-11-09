namespace Effects {
	
	reg Flanger;
	reg Distortion;
	reg Degrade;
	reg Chorus;
		
	// Flanger
	Content.getComponent("knob_effects_flair").setControlCallback(onknob_flair_flairControl);
	Content.getComponent("displayKnob_flanger_speed").setControlCallback(ondisplayKnob_flanger_speedControl);
	Content.getComponent("displayKnob_flanger_depth").setControlCallback(ondisplayKnob_flanger_depthControl);
	Content.getComponent("displayKnob_flanger_feedback").setControlCallback(ondisplayKnob_flanger_feedbackControl);
	Content.getComponent("displayKnob_flanger_delay").setControlCallback(ondisplayKnob_flanger_delayControl);
	Content.getComponent("displayKnob_flanger_offset").setControlCallback(ondisplayKnob_flanger_offsetControl);
	
	inline function onknob_flair_flairControl(component, value)
	{
		Flanger.setAttribute(Flanger.Mix, value);
		updateParameterWithLabel('FLAIR', value, '%');
		showTempScreen('flair');
	
		FlairAnimation.setShift(value);
		FlairAnimation.setAmplitude(value);
		FlairAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function ondisplayKnob_flanger_speedControl(component, value) {
		Flanger.setAttribute(Flanger.Speed, value);
	};

	inline function ondisplayKnob_flanger_depthControl(component, value) {
		Flanger.setAttribute(Flanger.Depth, value);
	};
	
	
	inline function ondisplayKnob_flanger_feedbackControl(component, value) {
	Flanger.setAttribute(Flanger.Feedback, value);
	};
	
	
	inline function ondisplayKnob_flanger_delayControl(component, value) {
	Flanger.setAttribute(Flanger.Delay, value);
	};
	
	
	inline function ondisplayKnob_flanger_offsetControl(component, value) {
		Flanger.setAttribute(Flanger.Offset, value);
	};
	
	// DEGRADE
	Content.getComponent("knob_effects_degrade").setControlCallback(onknob_degrade_mixControl);
	Content.getComponent("displayKnob_degrade_amount").setControlCallback(ondisplayKnob_degrade_amountControl);
	Content.getComponent("displayKnob_degrade_depth").setControlCallback(ondisplayKnob_degrade_depthControl);	
	Content.getComponent("displayKnob_degrade_frequency").setControlCallback(ondisplayKnob_degrade_frequencyControl);	
	Content.getComponent("displayKnob_degrade_highcut").setControlCallback(ondisplayKnob_degrade_highcutControl);		
	Content.getComponent("displayKnob_degrade_lowcut").setControlCallback(ondisplayKnob_degrade_lowcutControl);
	
	inline function onknob_degrade_mixControl(component, value)
	{
		Degrade.setAttribute(Degrade.Mix, value);
		updateParameterWithLabel('DEGRADE', value, '%');
		showTempScreen('degrade');
		
		DegradeAnimation.setZoom(value);
		DegradeAnimation.setBorderRadius(value);		
		DegradeAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function ondisplayKnob_degrade_amountControl(component, value) {
		Degrade.setAttribute(Degrade.Amount, value);
	};
	
	
	inline function ondisplayKnob_degrade_depthControl(component, value) {
		Degrade.setAttribute(Degrade.ModulationDepth, value);
	};
	
	
	inline function ondisplayKnob_degrade_frequencyControl(component, value) {
		Degrade.setAttribute(Degrade.ModulationSpeed, value);
	};
	
	
	inline function ondisplayKnob_degrade_highcutControl(component, value) {
		Degrade.setAttribute(Degrade.HighCut, value);
	};
	
	
	inline function ondisplayKnob_degrade_lowcutControl(component, value) {
		Degrade.setAttribute(Degrade.LowCut, value);
	};
	
	// CHORUS	
	Content.getComponent("knob_effects_chorus").setControlCallback(onknob_effects_chorusControl);
	Content.getComponent("displayKnob_chorus_rate").setControlCallback(ondisplayKnob_chorus_rateControl);
	Content.getComponent("displayKnob_chorus_feedback").setControlCallback(ondisplayKnob_chorus_feedbackControl);
	Content.getComponent("displayKnob_chorus_depth").setControlCallback(ondisplayKnob_chorus_depthControl);
	Content.getComponent("displayKnob_chorus_Delay").setControlCallback(ondisplayKnob_chorus_DelayControl);
	
	inline function onknob_effects_chorusControl(component, value) {
		Chorus.setAttribute(Chorus.Mix, value);
	};
	
	inline function ondisplayKnob_chorus_rateControl(component, value) {
		Chorus.setAttribute(Chorus.Rate, value);
	};
	
	
	inline function ondisplayKnob_chorus_feedbackControl(component, value) {
		Chorus.setAttribute(Chorus.Feedback, value);
	};
	
	
	inline function ondisplayKnob_chorus_depthControl(component, value) {
		Chorus.setAttribute(Chorus.Depth, value);
	};
	
	
	inline function ondisplayKnob_chorus_DelayControl(component, value) {
		Chorus.setAttribute(Chorus.CentreDelay, value);
	};
	
	// DISTORION
	Content.getComponent("knob_effects_distortion").setControlCallback(onknob_effects_distortionControl);	
	Content.getComponent("displayKnob_distort_gain").setControlCallback(ondisplayKnob_distort_gainControl);	
	Content.getComponent("displayKnob_distort_amount").setControlCallback(ondisplayKnob_distort_amountControl);
	
	inline function onknob_effects_distortionControl(component, value) {
		Distortion.setAttribute(Distortion.Mix, value);
	};
	
	inline function ondisplayKnob_distort_amountControl(component, value) {
		Distortion.setAttribute(Distortion.Amount, value);
	};
	
	
	inline function ondisplayKnob_distort_gainControl(component, value) {
		Distortion.setAttribute(Distortion.Gain, value);
	};
}