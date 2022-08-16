// Logo Click
Content.getComponent("button_logo").setControlCallback(onbutton_logoControl);
inline function onbutton_logoControl(component, value)
{
	if (CURRENT_ROUTE != 'account') {
		displayShow('account');		
	} else {
		displayShowMain('default');
	}
};

// Title Button
Content.getComponent("button_title").setControlCallback(onbutton_titleControl);
inline function onbutton_titleControl(component, value)
{
	if (CURRENT_ROUTE != 'about') {
		displayShow('about');
	} else {
		displayShowMain('default');
	}
};

Content.getComponent("combo_size").setControlCallback(oncombo_sizeControl);
inline function oncombo_sizeControl(component, value)
{
	// 300 max sclaing / 12 options = 25 steps.
	// so 1x25 = 0.25 scaling
	Settings.setZoomLevel(value * 0.15);
};

// REVERB SLIDERS


const var Reverb = Synth.getEffect("Simple Reverb1");

Content.getComponent("knob_reverb_space").setControlCallback(onknob_reverb_spaceControl);
inline function onknob_reverb_spaceControl(component, value)
{
	Console.print('freeeeze ' + value);
};


Content.getComponent("knob_reverb_space").setControlCallback(onknob_reverb_spaceControl);
inline function onknob_reverb_spaceControl(component, value)
{
	Reverb.setAttribute(Reverb.RoomSize, value);
	updateParameterWithPercent('SPACE', value);
};


Content.getComponent("knob_reverb_damping").setControlCallback(onknob_reverb_dampingControl);
inline function onknob_reverb_dampingControl(component, value)
{
	Reverb.setAttribute(Reverb.Damping, value);
	updateParameterWithPercent('DAMPING', value);
};


Content.getComponent("knob_reverb_stereo").setControlCallback(onknob_reverb_stereoControl);
inline function onknob_reverb_stereoControl(component, value)
{
	Reverb.setAttribute(Reverb.Width, value);
	updateParameterWithPercent('STEREO', value);
};


Content.getComponent("knob_reverb_mix").setControlCallback(onknob_reverb_mixControl);
inline function onknob_reverb_mixControl(component, value)
{
	Reverb.setAttribute(Reverb.DryLevel, value);
	updateParameterWithPercent('REVERB DRY', value);
};

Content.getComponent("button_freeze").setControlCallback(onbutton_freezeControl);
inline function onbutton_freezeControl(component, value)
{
	Reverb.setAttribute(Reverb.FreezeMode, value);
	updateFreezeParameter(value);
};

Content.getComponent("knob_reverb_drywet").setControlCallback(onknob_reverb_drywetControl);
inline function onknob_reverb_drywetControl(component, value)
{
	Reverb.setAttribute(Reverb.WetLevel, value);
	updateParameterWithPercent('REVERB WET', value);
};

// DEGRADE

const var Degrade = Synth.getEffect("Degrade1");

Content.getComponent("knob_degrade_bit").setControlCallback(onknob_degrade_bitControl);
inline function onknob_degrade_bitControl(component, value)
{
	Degrade.setAttribute(Degrade.Quant, value);
	updateParameterWithBit('CRUSH', value);
};







