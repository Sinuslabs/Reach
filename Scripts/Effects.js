namespace Effects {
	
	//const Flair = Synth.getEffect('Flair');
	//const Degrade = Synth.getEffect("Degrade");
	
	Content.getComponent("knob_effects_degrade").setControlCallback(onknob_degrade_mixControl);
	Content.getComponent("knob_effects_flair").setControlCallback(onknob_flair_flairControl);

	// DEGRADE
	inline function onknob_degrade_mixControl(component, value)
	{
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
}