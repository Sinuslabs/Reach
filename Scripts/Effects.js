namespace Effects {
	
	inline function getHardcodedEffect(name) {
		for ( slot in EffectCustomizer.effectSlots) {
			local effectName = EffectCustomizer.getIdFromSlot(slot);
			if (effectName == name) {
				return slot.getCurrentEffect();
			}
		}
	}
	
	reg Flanger;
	reg Distortion;
	reg Degrade;
	reg Chorus;
	
	//const var Degrade = Synth.getEffect("Effect Slot1_Hardcoded Master FX");
	//const var Flanger = Synth.getEffect("Effect Slot3_Hardcoded Master FX");
	Content.getComponent("knob_effects_degrade").setControlCallback(onknob_degrade_mixControl);
	Content.getComponent("knob_effects_flair").setControlCallback(onknob_flair_flairControl);

	// DEGRADE
	inline function onknob_degrade_mixControl(component, value)
	{
		Degrade.setAttribute(Degrade.Mix, value);
		//Degrade.setAttribute(Degrade.Mix, value);
		updateParameterWithLabel('DEGRADE', value, '%');
		showTempScreen('degrade');
		
		DegradeAnimation.setZoom(value);
		DegradeAnimation.setBorderRadius(value);		
		DegradeAnimation.AnimationPanel.repaintImmediately();
	};
	
	// FLAIR
	inline function onknob_flair_flairControl(component, value)
	{
		Flanger.setAttribute(Flanger.Mix, value);
		updateParameterWithLabel('FLAIR', value, '%');
		showTempScreen('flair');

		FlairAnimation.setShift(value);
		FlairAnimation.setAmplitude(value);
		FlairAnimation.AnimationPanel.repaintImmediately();
		//Flair1AnimationPanel.set('x', initialPosX + move);
	};
	
	// CALLBACKS
	// DEGRADE
	

	
	
}