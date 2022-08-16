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

// 	SPACE
Content.getComponent("knob_reverb_space").setControlCallback(onknob_reverb_spaceControl);
inline function onknob_reverb_spaceControl(component, value)
{
	Console.print('space');

};

var t = Engine.createTimerObject();
const var header_vumeter_ch1 = Content.getComponent("header_vumeter_ch1");
const var header_vumeter_ch2 = Content.getComponent("header_vumeter_ch2");



t.setTimerCallback(function()
{
	var ch1 = Engine.getMasterPeakLevel(0);
	var ch2 = Engine.getMasterPeakLevel(1);
	header_vumeter_ch1.setValue(ch1);
	header_vumeter_ch2.setValue(ch2);
});
t.startTimer(50);