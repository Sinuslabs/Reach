namespace Reverb {
	
	reg JPVerb;
	
	const var displayButton_reverb_bypass = Content.getComponent("displayButton_reverb_bypass");
	displayButton_reverb_bypass.setControlCallback(ondisplayButton_reverb_bypassControl);
	const var effectDisplay_Reverb = Content.getComponent("effectDisplay-Reverb");
	
	// Reverb
	const var themeablePanel_reverb = Content.getComponent("themeablePanel_reverb");
	const var themeablePanel_modulation = Content.getComponent("themeablePanel_modulation");
	const var themeablePanel_cleanup = Content.getComponent("themeablePanel_cleanup");
	
	
	const var knob_reverb_space = Content.getComponent("knob_reverb_space");
	const var knob_reverb_diffusion = Content.getComponent("knob_reverb_diffusion");
	const var knob_reverb_damping = Content.getComponent("knob_reverb_damping");
	const var knob_reverb_time = Content.getComponent("knob_reverb_time");
	const var knob_reverb_mix = Content.getComponent("knob_reverb_mix");
	
	knob_reverb_space.setControlCallback(sizeControl);
	knob_reverb_diffusion.setControlCallback(diffusionControl);
	knob_reverb_damping.setControlCallback(dampingControl);
	knob_reverb_time.setControlCallback(timeControl);
	knob_reverb_mix.setControlCallback(onknob_reverb_mixControl);
	
	knob_reverb_space.setLocalLookAndFeel(knb_laf);
	knob_reverb_diffusion.setLocalLookAndFeel(knb_laf);
	knob_reverb_damping.setLocalLookAndFeel(knb_laf);
	knob_reverb_time.setLocalLookAndFeel(knb_laf);
	knob_reverb_mix.setLocalLookAndFeel(knb_laf);
	
	// Modulation
	const var knob_modulation_depth = Content.getComponent("knob_modulation_depth");
	knob_modulation_depth.setControlCallback(depthControl);
	knob_modulation_depth.setLocalLookAndFeel(knb_laf);
	
	const var knob_modulation_frequency = Content.getComponent("knob_modulation_frequency");
	knob_modulation_frequency.setControlCallback(frequencyControl);
	knob_modulation_frequency.setLocalLookAndFeel(knb_laf);
	
	// Cleanup
	const var knob_cleanup_ducking = Content.getComponent("knob_cleanup_ducking")
	knob_cleanup_ducking.setControlCallback(onknob_cleanup_duckingControl);
	knob_cleanup_ducking.setLocalLookAndFeel(knb_laf);
	
	const var knob_cleanup_preDelay = Content.getComponent("knob_cleanup_preDelay")
	knob_cleanup_preDelay.setControlCallback(preDelayControl);
	knob_cleanup_preDelay.setLocalLookAndFeel(knb_laf);
	
	// Display
    const var displayKnob_reverb_feedback = Content.getComponent("displayKnob_reverb_feedback");
    displayKnob_reverb_feedback.setControlCallback(ondisplayKnob_reverb_feedbackControl);
    
    const var displayButton_reverb_panic = Content.getComponent("displayButton_reverb_panic");
    displayButton_reverb_panic.setControlCallback(ondisplayButton_reverb_panicControl);
 	
 	const var displayKnob_reverb_lowcrossover = Content.getComponent("displayKnob_reverb_lowcrossover");
 	const var displayKnob_reverb_highcrossover = Content.getComponent("displayKnob_reverb_highcrossover")
 
	displayKnob_reverb_lowcrossover.setControlCallback(disLowcrossoverControl);
	displayKnob_reverb_highcrossover.setControlCallback(disHighcrossoverControl);
		
	const var displayKnob_reverb_lowGain = Content.getComponent("displayKnob_reverb_lowGain");
	const var displayKnob_reverb_midgain = Content.getComponent("displayKnob_reverb_midgain");
	const var displayKnob_reverb_hfgain = Content.getComponent("displayKnob_reverb_hfgain");
	
    displayKnob_reverb_lowGain.setControlCallback(disLowGainControl);
    displayKnob_reverb_midgain.setControlCallback(disMidgainControl);
    displayKnob_reverb_hfgain.setControlCallback(disHFgainControl);
    
    // Custom LAF Bars
    
    displayKnob_reverb_lowGain.setLocalLookAndFeel(barKnobLAF);
    displayKnob_reverb_midgain.setLocalLookAndFeel(barKnobLAF);
    displayKnob_reverb_hfgain.setLocalLookAndFeel(barKnobLAF);
    
	// CALLBACKS
	inline function sizeControl(component, value) {
		JPVerb.setAttribute(JPVerb.Size, value);
		
		showTempScreen('reverb');
		
		ReverbAnimation.setRings(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function diffusionControl(component, value) {
		JPVerb.setAttribute(JPVerb.Diffusion, value);
		showTempScreen('reverb');
		
		ReverbAnimation.setoutterThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function dampingControl(component, value) {
		JPVerb.setAttribute(JPVerb.Damping, value);
		showTempScreen('reverb');
		
		ReverbAnimation.setRectThickness(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function timeControl(component, value) {
		JPVerb.setAttribute(JPVerb.ReverbTime, value);
		showTempScreen('reverb');
		
		ReverbAnimation.setZoom(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function onknob_reverb_mixControl(component, value) {
		JPVerb.setAttribute(JPVerb.Mix, value);
		
		showTempScreen('reverb');
	
		ReverbAnimation.setOpacity(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
		
		EffectCustomizer.repaintIndicators();
	};
	
	// Modulation Callbacks
	
	inline function depthControl(component, value) {
		JPVerb.setAttribute(JPVerb.ModDepth, value);
		
		showTempScreen('reverb');
		
		ReverbAnimation.setAmplitude(value);
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	inline function frequencyControl(component, value) {
		JPVerb.setAttribute(JPVerb.ModFrequency, value);
		
		showTempScreen('reverb');
		
		ReverbAnimation.setSpeed(component.getValueNormalized());
		ReverbAnimation.AnimationPanel.repaintImmediately();
	};
	
	// Cleanup Callbacks
	
	inline function onknob_cleanup_duckingControl(component, value) {
		JPVerb.setAttribute(JPVerb.Smoothing , value);
	};
	
	
	
	// Display Callbacks
	inline function ondisplayButton_reverb_bypassControl(component, value) {
			bypassReverb(value);
	};
	
	var restoreFeedbackValue;
	
	inline function preDelayControl(component, value) {
			JPVerb.setAttribute(JPVerb.preDelay, value);
	};
	
	inline function ondisplayKnob_reverb_feedbackControl(component, value) {
	   	    JPVerb.setAttribute(JPVerb.feedbacl, value);
	   	    
	   	    value >= 0.98 ? displayButton_reverb_panic.set('visible', true) : displayButton_reverb_panic.set('visible', false); 
	};
	
	inline function ondisplayButton_reverb_panicControl(component, value)
    {
    	if (value) {
	    	displayKnob_reverb_feedback.setValue(0);
	    	displayKnob_reverb_feedback.changed();
    	} 
    };
	
	inline function disLowcrossoverControl(component, value) {
		JPVerb.setAttribute(JPVerb.LowCrossover, value);
	};
	
	inline function disHighcrossoverControl(component, value) {
		JPVerb.setAttribute(JPVerb.HighCrossover, value);
	};
	
	inline function disLowGainControl(component, value) {
		JPVerb.setAttribute(JPVerb.LFGain, value);
	};
	
	inline function disMidgainControl(component, value) {
		JPVerb.setAttribute(JPVerb.MidGain, value);
	};
	
	inline function disHFgainControl(component, value) {
		JPVerb.setAttribute(JPVerb.HFGain, value);
	};
	
	inline function bypassReverb(value) {
		JPVerb.setBypassed(!value);
		effectDisplay_Reverb.set('enabled', value);
		
		themeablePanel_reverb.set('enabled', value);
		themeablePanel_modulation.set('enabled', value);
		themeablePanel_cleanup.set('enabled', value);
		
		displayButton_reverb_bypass.setValue(value);
		EffectCustomizer.displayPanel_reverbIndicator.set('enabled', value);
		EffectCustomizer.displayPanel_reverbIndicator.repaint();
		
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	}
	
	
}