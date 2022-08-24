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

// Activate Button
Content.getComponent("button_activate").setControlCallback(onbutton_activateControl);
const var label_serial_key = Content.getComponent("label_serial_key");
inline function onbutton_activateControl(component, value)
{
	if (value == 1.0) {
		var userKey = label_serial_key.get('text');		
		activateLicense(userKey);
	}
};

// Account License Panel
const var panel_non_activated = Content.getComponent("panel_non_activated");
panel_non_activated.set('visible', !STATE.ACTIVATED);
panel_non_activated.repaint();


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

// X Button
Content.getComponent("button_x2").setControlCallback(onbutton_x2Control);
Content.getComponent("button_x1").setControlCallback(onbutton_x2Control);
inline function onbutton_x2Control(component, value)
{
	displayShowMain('default');
};

// scaling combo box
Content.getComponent("combo_size").setControlCallback(oncombo_sizeControl);
inline function oncombo_sizeControl(component, value)
{
	// 300 max scaling / 12 options = 25 steps.
	// so 1x25 = 0.25 scaling
	Settings.setZoomLevel(value * 0.15);
};

// REVERB
const var Reverb = Synth.getEffect("Simple Reverb1");

// BYPASS
Content.getComponent("button_toggle_reverb").setControlCallback(onbutton_toggle_reverbControl);
const var panel_reverb = Content.getComponent("panel_reverb");
inline function onbutton_toggle_reverbControl(component, value)
{
	Reverb.setBypassed(!value);
	panel_reverb.set('enabled', value);
};





Content.getComponent("knob_reverb_space").setControlCallback(onknob_reverb_spaceControl);
inline function onknob_reverb_spaceControl(component, value)
{
	Reverb.setAttribute(Reverb.RoomSize, value);
	updateParameterWithLabel('SPACE', value, '%');
	showTempScreen('reverb');
	
	ReverbAnimationPanel.setValue(component.get("max") + 1 - (value * -1) * 7);
	ReverbAnimationPanel.repaint();
};

Content.getComponent("knob_reverb_damping").setControlCallback(onknob_reverb_dampingControl);
inline function onknob_reverb_dampingControl(component, value)
{
	Reverb.setAttribute(Reverb.Damping, value);
	updateParameterWithLabel('DAMPING', value, '%');
	showTempScreen('reverb');
	
	AN_STATE.outterThickness = value * 10;
	ReverbAnimationPanel.repaint();
};

Content.getComponent("knob_reverb_stereo").setControlCallback(onknob_reverb_stereoControl);
inline function onknob_reverb_stereoControl(component, value)
{
	Reverb.setAttribute(Reverb.Width, value);
	updateParameterWithLabel('STEREO', value, '%');
	showTempScreen('reverb');
	
	AN_STATE.limit = value * 40;
	ReverbAnimationPanel.repaint();
};

Content.getComponent("knob_reverb_mix").setControlCallback(onknob_reverb_mixControl);
inline function onknob_reverb_mixControl(component, value)
{
	Reverb.setAttribute(Reverb.DryLevel, value);
	updateParameterWithLabel('REVERB DRY', value, '%');
	showTempScreen('reverb');
};

const var panel_freeze_shadow = Content.getComponent("panel_freeze_shadow");
Content.getComponent("button_freeze").setControlCallback(onbutton_freezeControl);
inline function onbutton_freezeControl(component, value)
{
	panel_freeze_shadow.set('visible', value);
	Reverb.setAttribute(Reverb.FreezeMode, value);
	updateFreezeParameter(value);
	
};

Content.getComponent("knob_reverb_drywet").setControlCallback(onknob_reverb_drywetControl);
inline function onknob_reverb_drywetControl(component, value)
{
	Reverb.setAttribute(Reverb.WetLevel, value);
	updateParameterWithLabel('REVERB WET', value, '%');
	showTempScreen('reverb');
	
	AN_STATE.innerThickness = value * 5;
	ReverbAnimationPanel.repaint();
};

// DEGRADE
const var Degrade = Synth.getEffect("Degrade1");

// BYPASS
Content.getComponent("button_toggle_degrade").setControlCallback(onbutton_toggle_degradeControl);
const var panel_degrade = Content.getComponent("panel_degrade");

inline function onbutton_toggle_degradeControl(component, value)
{
	//Degrade.setAttribute('Enabled', value);
	Degrade.setBypassed(!value);
	panel_degrade.set('enabled', value);
	icon_panel_degrade.repaint();
};

Content.getComponent("knob_degrade_bit").setControlCallback(onknob_degrade_bitControl);
inline function onknob_degrade_bitControl(component, value)
{
	Degrade.setAttribute(Degrade.Quant, value);
	updateParameterWithBit('CRUSH', value);
	showTempScreen('degrade');
	
	var min = 0.4;
	var max = 1.0;
	var range = max - min;
	var normalized = (value - min) / range;
	
	DEGRADE_STATE.innerThickness = 8 + value * -7;
	DegradeAnimationPanel.repaint();
};

Content.getComponent("knob_degrade_rate").setControlCallback(onknob_degrade_rateControl);
inline function onknob_degrade_rateControl(component, value)
{
	Degrade.setAttribute(Degrade.Rate, value);
	updateParameterWithFixedSampleRate('SAMPLE RATE', value);
	showTempScreen('degrade');
	
	var min = 0.52;
	var max = 0.64;
	var range = max - min;
	var normalized = (value - min) / range;

	DegradeAnimationPanel.setValue(component.get("max") + 1 - normalized * 20);
	DegradeAnimationPanel.repaint();
};

Content.getComponent("knob_degrade_mix").setControlCallback(onknob_degrade_mixControl);
inline function onknob_degrade_mixControl(component, value)
{
	Degrade.setAttribute(Degrade.PostFilt, value);
	updateParameterWithLabel('POST FILTER', value, '%');
	showTempScreen('degrade');
	
	DEGRADE_STATE.corner = 80 + (value * -80);
	DegradeAnimationPanel.repaint();
};

// FLAIR

const var Flair = Synth.getEffect("Saturator1");

// BYPASS
Content.getComponent("button_toggle_flair").setControlCallback(onbutton_toggle_flairControl);
const var panel_flair = Content.getComponent("panel_flair");

inline function onbutton_toggle_flairControl(component, value)
{
	Flair.setBypassed(!value);
	panel_flair.set('enabled', value);
	icon_panel_flair.repaint();
};

Content.getComponent("knob_flair_flair").setControlCallback(onknob_flair_flairControl);
inline function onknob_flair_flairControl(component, value)
{
	Flair.setAttribute(Flair.Saturation, value);
	updateParameterWithLabel('FLAIR', value, '%');
	showTempScreen('flair');
	
	local initialPosX = 300;
	local move = value * 50;
	
	Flair1AnimationPanel.set('x', initialPosX + move);
	Flair2AnimationPanel.set('x', initialPosX - move);
};

// FILTER
const var Filter = Synth.getEffect("Parametriq EQ1");
Content.getComponent("knob_filter_freq").setControlCallback(onknob_filter_freqControl);

// BYPASS
Content.getComponent("button_toggle_filter").setControlCallback(onbutton_toggle_filterControl);
const var panel_filter = Content.getComponent("panel_filter");

inline function onbutton_toggle_filterControl(component, value)
{
	Filter.setBypassed(!value);
	panel_filter.set('enabled', value);
};

inline function onknob_filter_freqControl(component, value)
{
	Filter.setAttribute(Filter.Freq , value);
	updateParameterWithLabel('FREQUENCY', value, 'Hz');
	showTempScreen('filter');
};

Content.getComponent("knob_filter_q").setControlCallback(onknob_filter_qControl);
inline function onknob_filter_qControl(component, value)
{
	
	Filter.setAttribute(Filter.Q, value);
	updateParameterWithLabel('Q', value, '');
	showTempScreen('filter');
}

Content.getComponent("knob_filter_gain").setControlCallback(onknob_filter_gainControl);
inline function onknob_filter_gainControl(component, value)
{
	Filter.setAttribute(Filter.Gain, value);
	updateParameterWithLabel('GAIN', value, 'dB');
	showTempScreen('filter');
};

Content.getComponent("combo_filter_type").setControlCallback(oncombo_filter_typeControl);
inline function oncombo_filter_typeControl(component, value)
{
	Filter.setAttribute(Filter.Type, value - 1);
	showTempScreen('filter');
};








