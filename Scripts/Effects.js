namespace Effects {
	
	reg Flanger;
	reg Distortion;
	reg Degrade;
	reg Chorus;
		
	// Flanger
	const var knob_effects_flair = Content.getComponent("knob_effects_flair");
	knob_effects_flair.setControlCallback(onknob_flair_flairControl);
	knob_effects_flair.setLocalLookAndFeel(knb_laf);
	
	
	const var displayButton_flanger_bypass = Content.getComponent("displayButton_flanger_bypass");
	const var button_flanger_bypass = Content.getComponent("button_flanger_bypass");
	
	const var containerPanel_flanger = Content.getComponent("containerPanel_flanger");
	
	displayButton_flanger_bypass.setControlCallback(ondisplayButton_flanger_bypassControl);
	button_flanger_bypass.setControlCallback(ondisplayButton_flanger_bypassControl);
	
	const var effectDisplay_Flanger = Content.getComponent("effectDisplay-Flanger");
	
	Content.getComponent("displayKnob_flanger_speed").setControlCallback(ondisplayKnob_flanger_speedControl);
	Content.getComponent("displayKnob_flanger_depth").setControlCallback(ondisplayKnob_flanger_depthControl);
	Content.getComponent("displayKnob_flanger_feedback").setControlCallback(ondisplayKnob_flanger_feedbackControl);
	Content.getComponent("displayKnob_flanger_delay").setControlCallback(ondisplayKnob_flanger_delayControl);
	Content.getComponent("displayKnob_flanger_offset").setControlCallback(ondisplayKnob_flanger_offsetControl);
	
	inline function onknob_flair_flairControl(component, value)
	{
		Flanger.setAttribute(Flanger.Mix, value);
		showTempScreen('flair');
	
		FlairAnimation.setShift(value);
		FlairAnimation.setAmplitude(value);
		FlairAnimation.AnimationPanel.repaintImmediately();
		
		// Main Display Indicator
		
		EffectCustomizer.repaintIndicators();
	};
	
	inline function ondisplayButton_flanger_bypassControl(component, value) {		
		bypassFlanger(value);
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
	
	inline function bypassFlanger(value) {
		Flanger.setBypassed(!value);
		effectDisplay_Flanger.set('enabled', value);
		containerPanel_flanger.set('enabled', value);
	
		displayButton_flanger_bypass.setValue(value);
		button_flanger_bypass.setValue(value);
		
		EffectCustomizer.displayPanel_flangerIndicator.set('enabled', value);
		EffectCustomizer.displayPanel_flangerIndicator.repaint();
		
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	}
	
	// DEGRADE
	const var knob_effects_degrade = Content.getComponent("knob_effects_degrade");
	knob_effects_degrade.setControlCallback(onknob_degrade_mixControl);
	knob_effects_degrade.setLocalLookAndFeel(knb_laf);
	
	const var displayButton_degrade_bypass = Content.getComponent("displayButton_degrade_bypass");
	const var button_degrade_bypass = Content.getComponent("button_degrade_bypass")
	const var containerPanel_degrade = Content.getComponent("containerPanel_degrade");
	
	
	
	displayButton_degrade_bypass.setControlCallback(ondisplayButton_degrade_bypassControl);
	button_degrade_bypass.setControlCallback(ondisplayButton_degrade_bypassControl);
	const var effectDisplay_Degrade = Content.getComponent("effectDisplay-Degrade");
	
	Content.getComponent("displayKnob_degrade_depth").setControlCallback(ondisplayKnob_degrade_depthControl);	
	Content.getComponent("displayKnob_degrade_frequency").setControlCallback(ondisplayKnob_degrade_frequencyControl);	
	Content.getComponent("displayKnob_degrade_highcut").setControlCallback(ondisplayKnob_degrade_highcutControl);		
	Content.getComponent("displayKnob_degrade_lowcut").setControlCallback(ondisplayKnob_degrade_lowcutControl);
	
	const var displayKnob_degrade_crushAmount = Content.getComponent("displayKnob_degrade_crushAmount");
	displayKnob_degrade_crushAmount.setControlCallback(ondegrade_crushAmountControl);
	
	const var displayKnob_degrade_amount = Content.getComponent("displayKnob_degrade_amount");
	displayKnob_degrade_amount.setControlCallback(ondisplayKnob_degrade_amountControl);
				
	const var degrade_selector = Content.getComponent("degrade_selector");
	degrade_selector.setControlCallback(ondegrade_selectorControl);
	
	degrade_selector.setLocalLookAndFeel(popMenuLaf);
	
	inline function onknob_degrade_mixControl(component, value) {
		Degrade.setAttribute(Degrade.Mix, value);
		showTempScreen('degrade');
		
		DegradeAnimation.setZoom(value);
		DegradeAnimation.setBorderRadius(value);		
		DegradeAnimation.AnimationPanel.repaintImmediately();
		
		EffectCustomizer.repaintIndicators();
	};
	
	inline function ondisplayButton_degrade_bypassControl(component, value) {
		bypassDegrade(value);
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
	
	inline function ondegrade_crushAmountControl(component, value)
	{
		Degrade.setAttribute(Degrade.BitDepth, value);

	};
	
	inline function ondegrade_selectorControl(component, value)
	{
		if (value == 1.0) {
			displayKnob_degrade_amount.showControl(true);
			displayKnob_degrade_crushAmount.showControl(false);
			Degrade.setAttribute(Degrade.CrushMode, 0);
		}
		if (value == 2.0) {
			displayKnob_degrade_amount.showControl(false);
			displayKnob_degrade_crushAmount.showControl(true);
			Degrade.setAttribute(Degrade.CrushMode, 1);
			Degrade.setAttribute(Degrade.BitcrushMode, 0);
		}
		if (value == 3.0) {
			displayKnob_degrade_amount.showControl(false);
			displayKnob_degrade_crushAmount.showControl(true);
			Degrade.setAttribute(Degrade.CrushMode, 1);
			Degrade.setAttribute(Degrade.BitcrushMode, 1);
		}
		

	};
	
	inline function bypassDegrade(value) {
		
		Degrade.setBypassed(!value);
		effectDisplay_Degrade.set('enabled', value);
		containerPanel_degrade.set('enabled', value);
	
		button_degrade_bypass.setValue(value);
		displayButton_degrade_bypass.setValue(value);
		EffectCustomizer.displayPanel_degradeIndicator.set('enabled', value);
		EffectCustomizer.displayPanel_degradeIndicator.repaint();
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	}
	
	// CHORUS
	const var effectDisplay_Chorus = Content.getComponent("effectDisplay-Chorus");
	
	const var displayButton_chorus_bypass = Content.getComponent("displayButton_chorus_bypass");
	const var button_chorus_bypass = Content.getComponent("button_chorus_bypass");
	
	const var containerPanel_chorus = Content.getComponent("containerPanel_chorus");
	
	displayButton_chorus_bypass.setControlCallback(ondisplayButton_chorus_bypassControl);
	button_chorus_bypass.setControlCallback(ondisplayButton_chorus_bypassControl);
	
	const var knob_effects_chorus = Content.getComponent("knob_effects_chorus");
	knob_effects_chorus.setControlCallback(onknob_effects_chorusControl);
	
	knob_effects_chorus.setLocalLookAndFeel(knb_laf);
	
	Content.getComponent("displayKnob_chorus_rate").setControlCallback(ondisplayKnob_chorus_rateControl);
	Content.getComponent("displayKnob_chorus_feedback").setControlCallback(ondisplayKnob_chorus_feedbackControl);
	Content.getComponent("displayKnob_chorus_depth").setControlCallback(ondisplayKnob_chorus_depthControl);
	Content.getComponent("displayKnob_chorus_Delay").setControlCallback(ondisplayKnob_chorus_DelayControl);
	
	inline function onknob_effects_chorusControl(component, value) {	
	
			Chorus.setAttribute(Chorus.Mix, value);
			
			showTempScreen('chorus');
			
			ChorusAnimations.setShift(value);
			ChorusAnimations.setAmplitude(value);
			ChorusAnimations.AnimationPanel.repaintImmediately();
			
			EffectCustomizer.repaintIndicators();
			EffectCustomizer.repaintTabs();
		
	};
	
	inline function ondisplayButton_chorus_bypassControl(component, value) {		
		bypassChorus(value);
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
	
	inline function bypassChorus(value) {
		Chorus.setBypassed(!value);
		effectDisplay_Chorus.set('enabled', value);
		containerPanel_chorus.set('enabled', value);
	
		displayButton_chorus_bypass.setValue(value);
		button_chorus_bypass.setValue(value);
		EffectCustomizer.displayPanel_chorusIndicator.set('enabled', value);
		EffectCustomizer.displayPanel_chorusIndicator.repaint();
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	}
	
	// DISTORION
	const var effectDisplay_Distort = Content.getComponent("effectDisplay-Distort");
	
	const var displayButton_distort_bypass = Content.getComponent("displayButton_distort_bypass");
	const var button_distort_bypass = Content.getComponent("button_distort_bypass");
	
	const var containerPanel_distort = Content.getComponent("containerPanel_distort");
	
	const var displayPanel_distortIndicator = Content.getComponent("displayPanel_distortIndicator");
	
	displayButton_distort_bypass.setControlCallback(ondisplayButton_distort_bypassControl);
	button_distort_bypass.setControlCallback(ondisplayButton_distort_bypassControl);
	
	const var knob_effects_distortion = Content.getComponent("knob_effects_distortion");
	knob_effects_distortion.setControlCallback(onknob_effects_distortionControl);	
	
	knob_effects_distortion.setLocalLookAndFeel(knb_laf);
	
	Content.getComponent("displayKnob_distort_amount").setControlCallback(ondisplayKnob_distort_amountControl);
	Content.getComponent("displayKnob_distort_lowPass").setControlCallback(ondisplayKnob_distort_lowPassControl);
	Content.getComponent("displayKnob_distort_highpass").setControlCallback(ondisplayKnob_distort_highpassControl);
	

	
	Content.getComponent("displayKnob_distort_postlowcut").setControlCallback(ondisplaySlider_distort_postlowcutControl);

	Content.getComponent("displayKnob_distort_posthighcut").setControlCallback(ondisplaySlider_distort_posthighcutControl);
	

	
	
	inline function onknob_effects_distortionControl(component, value) {
		Distortion.setAttribute(Distortion.Mix, value);
		
		showTempScreen('distortion');
		
		DistortionAnimation.setAlpha(value);
		DistortionAnimation.setScale(value);
		
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	};
	
	inline function ondisplayButton_distort_bypassControl(component, value) {
		bypassDistortion(value);
	};
	
	inline function ondisplayKnob_distort_amountControl(component, value) {
		Distortion.setAttribute(Distortion.Amount, value);
	};
	
	inline function ondisplayKnob_distort_lowPassControl(component, value) {
		Distortion.setAttribute(Distortion.lp, value);
	};
	
	inline function ondisplayKnob_distort_highpassControl(component, value) {
		Distortion.setAttribute(Distortion.hp, value);
	};
	
	inline function ondisplaySlider_distort_postlowcutControl(component, value) {
		
		Distortion.setAttribute(Distortion.postlp, value);
	};
	
	inline function ondisplaySlider_distort_posthighcutControl(component, value) {
		Distortion.setAttribute(Distortion.posthp, value);
	};
	
	
	inline function bypassDistortion(value) {
		Distortion.setBypassed(!value);
		effectDisplay_Distort.set('enabled', value);
		containerPanel_distort.set('enabled', value);
	
		displayButton_distort_bypass.setValue(value);
		button_distort_bypass.setValue(value);
		EffectCustomizer.displayPanel_distortIndicator.set('enabled', value);
		
		EffectCustomizer.displayPanel_distortIndicator.repaint();
		EffectCustomizer.repaintIndicators();
		EffectCustomizer.repaintTabs();
	}

}