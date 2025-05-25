namespace Master {
	
	const var bypassButtonLAF = Content.createLocalLookAndFeel();	
	bypassButtonLAF.registerFunction("drawToggleButton", circleButtonLAF);
	
	const var RoutingMatrix1 = Synth.getEffect("Routing Matrix1");
	const var RoutingMatrix2 = Synth.getEffect("Routing Matrix2");
	
	const var button_global_bypass = Content.getComponent("button_global_bypass");
	button_global_bypass.setControlCallback(onBypass);
	button_global_bypass.setLocalLookAndFeel(bypassButtonLAF);
	button_global_bypass.setValue(0);
	button_global_bypass.changed();

	const var themeAble_label_panel_effects = Content.getComponent("themeAble_label_panel_effects");
	
	const var master_bypass_pnl = Content.getComponent("master_bypass_pnl");
	
	const var Analyser1 = Synth.getEffect("FFT Analyser");
	
	const var preFilter = Synth.getEffect("preFilter");
	const var postFilter = Synth.getEffect("postFilter");
	const var WetGain = Synth.getEffect("WetGain");
	const var WetExtraGain = Synth.getEffect("WetExtraGain");
	const var DryGain = Synth.getEffect("DryGain");
	const var OutGain = Synth.getEffect("Simple Gain4");
	
	const var BypassedGain = Synth.getEffect("BypassedGain");
	
	reg alreadyBypassed = [];
	
	reg reverbBypassed = false;
	reg degradeBypassed = false;
	reg flangerBypassed = false;
	reg chorusBypassed = false;
	reg distortBypassed = false;
	
	Globals.isBypassed = false;
	
	inline function onBypass(component, value) {
		if (value) {
			bypassAll();
		} else {
			restoreBypass();
		}
	}
	
	inline function bypassAll() {
		
		Globals.isBypassed = true;
		
		master_bypass_pnl.set('enabled', false);
		themeAble_label_panel_effects.set('enabled', false);
		Analyser1.setBypassed(true);
		
		BypassedGain.setBypassed(false);
		
		reverbBypassed = Reverb.isBypassed();
		degradeBypassed = Effects.isBypassedDegrade();
		flangerBypassed = Effects.isBypassedFlanger();
		chorusBypassed = Effects.isBypassedChorus();
		distortBypassed = Effects.isBypassedDistortion();
		
		VuMeter.knob_gain_knb.set('enabled', false);
		
		preFilter.setBypassed(true);
		postFilter.setBypassed(true);
		WetGain.setBypassed(true);
		WetExtraGain.setBypassed(true);
		DryGain.setBypassed(true);
		OutGain.setBypassed(true);
		
		
		// starting bypass
		Reverb.displayButton_reverb_bypass.setValue(false);
		Reverb.displayButton_reverb_bypass.changed();
		
		Effects.displayButton_degrade_bypass.setValue(false);
		Effects.displayButton_degrade_bypass.changed();
		
		Effects.displayButton_flanger_bypass.setValue(false);
		Effects.displayButton_flanger_bypass.changed();
		
		Effects.displayButton_chorus_bypass.setValue(false);
		Effects.displayButton_chorus_bypass.changed();
		
		Effects.displayButton_distort_bypass.setValue(false);
		Effects.displayButton_distort_bypass.changed();
	}
	
	inline function restoreBypass() {
		
		Globals.isBypassed = false;
		Filter.bypass(false);
		Analyser1.setBypassed(false);
		VuMeter.knob_gain_knb.set('enabled', true);
		
		BypassedGain.setBypassed(true);
		
		master_bypass_pnl.set('enabled', true);
		themeAble_label_panel_effects.set('enabled', true);
		
		preFilter.setBypassed(false);
		postFilter.setBypassed(false);
		WetGain.setBypassed(false);
		WetExtraGain.setBypassed(false);
		DryGain.setBypassed(false);
		OutGain.setBypassed(false);
		
		if (!reverbBypassed) {
			// starting bypass
			Reverb.displayButton_reverb_bypass.setValue(true);
			Reverb.displayButton_reverb_bypass.changed();
		}
		
		if (!flangerBypassed) {
			Effects.displayButton_flanger_bypass.setValue(true);
			Effects.displayButton_flanger_bypass.changed();
		}
		
		if (!degradeBypassed) {
			Effects.displayButton_degrade_bypass.setValue(true);
			Effects.displayButton_degrade_bypass.changed();
		}
		
		if (!chorusBypassed) {
			Effects.displayButton_chorus_bypass.setValue(true);
			Effects.displayButton_chorus_bypass.changed();
		}
		
		if (!distortBypassed) {
			Effects.displayButton_distort_bypass.setValue(true);
			Effects.displayButton_distort_bypass.changed();
		}
	

	}
	

	inline function circleButtonLAF(g, obj) {
		local PADDING = 2;

		local BUTTON_COLOUR = PanelTheme.textColour;

		local a = obj.area;
		local pa = [
			a[0] + PADDING,
			a[1] + PADDING,
			a[2] - PADDING * 2,
			a[3] - PADDING * 2
		];

		local dot_a = [
			pa[0] + 5 ,
			pa[1] + 6,
			5,
			5
		];

		local text_a = [
			pa[0] + 15,
			pa[1],
			pa[2] - 15,
			pa[3]
		];

		if (obj.over) {
			BUTTON_COLOUR = Colours.withAlpha(BUTTON_COLOUR, 0.8);
		}

		g.setColour(BUTTON_COLOUR);
		obj.value ? g.drawEllipse(dot_a, 1) : g.fillEllipse(dot_a); 

		g.setFont(Fonts.mainFont, 18);
		g.drawAlignedText(obj.text, text_a, 'centred');
	}

}