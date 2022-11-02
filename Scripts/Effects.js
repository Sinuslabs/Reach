namespace Effects {
	
	Content.getComponent("knob_degrade_mix").setControlCallback(onknob_degrade_mixControl);
	Content.getComponent("knob_effects_flair").setControlCallback(onknob_flair_flairControl);

	// DEGRADE
	inline function onknob_degrade_mixControl(component, value)
	{
		//Degrade.setAttribute(Degrade.PostFilt, value);
		updateParameterWithLabel('DEGRADE', value, '%');
		showTempScreen('degrade');
		
		
		DegradeAnimationPanel.setValue(component.get("max") + 1 - value * 20);
		
		DEGRADE_STATE.corner = 80 + (value * -80);
		DegradeAnimationPanel.repaint();
	};
	
	// FLAIR
	inline function onknob_flair_flairControl(component, value)
	{
		//Flair.setAttribute(Flair.WetAmount, value);
		updateParameterWithLabel('FLAIR', value, '%');
		showTempScreen('flair');
		
		local initialPosX = 300;
		local move = value * 50;
		
		Flair1AnimationPanel.set('x', initialPosX + move);
		Flair2AnimationPanel.set('x', initialPosX - move);
	};
}