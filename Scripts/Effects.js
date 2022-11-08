namespace Effects {
	
	
	const var EffectSlot1_HardcodedMasterFX = Synth.getEffect("Effect Slot1_Hardcoded Master FX");
	//const Flair = Synth.getEffect('Flair');
	//const Degrade = Synth.getEffect("Degrade");
	Console.print(trace(Content.getComponent("knob_effects_degrade").getAllProperties()));
	Console.print(Content.getComponent("knob_effects_degrade").get('processorId'));
	Content.getComponent("knob_effects_degrade").setControlCallback(onknob_degrade_mixControl);
	Content.getComponent("knob_effects_flair").setControlCallback(onknob_flair_flairControl);

	// DEGRADE
	inline function onknob_degrade_mixControl(component, value)
	{
		EffectSlot1_HardcodedMasterFX.setAttribute(EffectSlot1_HardcodedMasterFX.Mix, value);
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
		//Flair.setAttribute(Flair.Mix, value);
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