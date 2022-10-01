// Logo Click

const var logoButton = Content.getComponent('button_logo');

logoButton.setControlCallback(onbutton_logoControl);
inline function onbutton_logoControl(component, value)
{ 

	if (value) {
		settingsButtonsRadio(0);
		displayShowSettings('general');
		STATE.settingsOpen = true;
	} else {
		STATE.settingsOpen = false;
		displayShowMain('default');
	}
};

const var settingsButtons = [
	Content.getComponent('button_settings_general'),
	Content.getComponent('button_settings_audio'),
	Content.getComponent('button_settings_activate'),
	Content.getComponent('button_settings_about')
]


settingsButtons[0].setControlCallback(onbutton_settings_generalControl);
 inline function onbutton_settings_generalControl(component, value)
 {
 	settingsButtonsRadio(0);
 	displayShowSettings('general');
 };
 
 settingsButtons[1].setControlCallback(onbutton_settings_audioControl);
  inline function onbutton_settings_audioControl(component, value)
  {
  	settingsButtonsRadio(1);
  	displayShowSettings('audio');
  };

 settingsButtons[2].setControlCallback(onbutton_settings_activateControl);
 inline function onbutton_settings_activateControl(component, value)
 {
 	settingsButtonsRadio(2);
 	displayShowSettings('activate');
 };

settingsButtons[3].setControlCallback(onbutton_settings_aboutControl);
inline function onbutton_settings_aboutControl(component, value)
{
	settingsButtonsRadio(3);
	displayShowSettings('about');
};


// General Settings

// Animations
Content.getComponent("button_animationToggle").setControlCallback(onbutton_animationToggleControl);
inline function onbutton_animationToggleControl(component, value)
{
	STATE.enableAnimations = !value;
};

// Activate Button
Content.getComponent("button_activate").setControlCallback(onbutton_activateControl);
const var label_serial_key = Content.getComponent("label_serial_key");
var userKey;
inline function onbutton_activateControl(component, value)
{
	if (value == 1.0) {
	 	userKey = label_serial_key.get('text');		
		activateLicense(userKey);
	}
};


Content.getComponent("button_not_activated").setControlCallback(onbutton_not_activatedControl);
inline function onbutton_not_activatedControl(component, value)
{
	if (value) {
		displayShowSettings('activate');
		STATE.settingsOpen = true;
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

// Preset Browser Button
const presetBrowserButton = Content.getComponent("button_presetBrowser")
presetBrowserButton.setControlCallback(onbutton_presetBrowserControl);
const var label_preset_browser = Content.getComponent("label_preset_browser");
inline function onbutton_presetBrowserControl(component, value)
{
	if (value) {
		STATE.presetBrowserOpen = true;
		STATE.filterOpen = false;
		button_showFilter.setValue(0);
		displayShow('presetBrowser');
	} else {
		STATE.presetBrowserOpen = false;
		displayShowMain('default');
	}
};


inline function onButton1Control(component, value)
{
	// reset band to band 1; 
	STATE.currentBandIndex = 0;

	if (Engine.getCurrentUserPresetName() == '') {
		label_preset_browser.set('text', 'Blackhole');
	} else {
		label_preset_browser.set('text', Engine.getCurrentUserPresetName());
	}
};

Content.getComponent("Button1").setControlCallback(onButton1Control);


Content.getComponent("button_preset_leftArrow").setControlCallback(onbutton_preset_leftArrowControl);
inline function onbutton_preset_leftArrowControl(component, value)
{
	Engine.loadPreviousUserPreset(false);
};

Content.getComponent("button_preset_rightArrow").setControlCallback(onbutton_preset_rightArrowControl);
inline function onbutton_preset_rightArrowControl(component, value)
{
	Engine.loadNextUserPreset(false);
};

// SHORTCUT HANDLER
const var panel_background = Content.getComponent("panel_background");

panel_background.setKeyPressCallback(onBackgroundKeypress);
inline function onBackgroundKeypress(key) {
	
	// CTRL + , -> Settings
	if (key.cmd == true && key.keyCode == 44) CURRENT_ROUTE == 'account' ?  displayShowMain('default') : displayShow('account');
	// ESC -> main Screen
	if (key.keyCode == 27) displayShowMain('default');
}

// Website
Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
inline function onpanel_githubControl(component, value)
{
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};

// Github
Content.getComponent("button_github").setControlCallback(onButton3Control);
inline function onButton3Control(component, value)
{ 
	if (value) Engine.openWebsite('https://github.com/Sinuslabs/Reach');
};

// X Button
Content.getComponent("button_x1").setControlCallback(onbutton_x1Control);
Content.getComponent("button_x3").setControlCallback(onbutton_closePreset_Control);;

inline function onbutton_closePreset_Control(component, value)
{
	showMain();
};


inline function onbutton_x4Control(component, value)
{
	showMain();
};

Content.getComponent("button_x4").setControlCallback(onbutton_x4Control);


Content.getComponent("button_x2").setControlCallback(onbutton_x2Control);
inline function onbutton_x2Control(component, value)
{
	showMain();
};

inline function onbutton_x1Control(component, value)
{
	showMain();
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
	
	button_freeze.setValue(!value);
	updateFreezeParameter(false);
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
	
	AN_STATE.outterThickness = (value + 0.2) * 10 ;
	ReverbAnimationPanel.repaint();
};

Content.getComponent("knob_reverb_stereo").setControlCallback(onknob_reverb_stereoControl);
inline function onknob_reverb_stereoControl(component, value)
{
	Reverb.setAttribute(Reverb.Width, value);
	updateParameterWithLabel('STEREO', value, '%');
	showTempScreen('reverb');
	
	AN_STATE.limit = value * 14;
	ReverbAnimationPanel.repaint();
};

const var button_freeze = Content.getComponent("button_freeze");
button_freeze.setControlCallback(onbutton_freezeControl);
inline function onbutton_freezeControl(component, value)
{
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
const var SimpleGain3 = Synth.getEffect("Simple Gain3");
// BYPASS
Content.getComponent("button_toggle_degrade").setControlCallback(onbutton_toggle_degradeControl);
const var panel_degrade = Content.getComponent("panel_degrade");

inline function onbutton_toggle_degradeControl(component, value)
{
	Degrade.setBypassed(!value);
	SimpleGain3.setBypassed(!value);
	panel_degrade.set('enabled', value);
};

Content.getComponent("knob_degrade_bit").setControlCallback(onknob_degrade_bitControl);

inline function onknob_degrade_bitControl(component, value)
{
	Degrade.setAttribute(Degrade.Quant, value);
	updateParameterWithBit('CRUSH', value);
	showTempScreen('degrade');

	DEGRADE_STATE.innerThickness = 8 + value * -7;
	DegradeAnimationPanel.repaint();
};

Content.getComponent("knob_degrade_rate").setControlCallback(onknob_degrade_rateControl);
const rateMin = 0.52;
const rateMax = 0.64;
const rateRange = rateMax - rateMin;


inline function onknob_degrade_rateControl(component, value)
{
	Degrade.setAttribute(Degrade.Rate, value);

	updateParameterWithFixedSampleRate('SAMPLE RATE', value);
	showTempScreen('degrade');
	
	local rateNormalized = (value - rateMin) / rateRange;

	DegradeAnimationPanel.setValue(component.get("max") + 1 - rateNormalized * 20);
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
};

Content.getComponent("knob_flair_flair").setControlCallback(onknob_flair_flairControl);
inline function onknob_flair_flairControl(component, value)
{
	Flair.setAttribute(Flair.WetAmount, value);
	updateParameterWithLabel('FLAIR', value, '%');
	showTempScreen('flair');
	
	local initialPosX = 300;
	local move = value * 50;
	
	Flair1AnimationPanel.set('x', initialPosX + move);
	Flair2AnimationPanel.set('x', initialPosX - move);
};

// FILTER
const var Filter = Synth.getEffect("Parametriq EQ1");
const var panel_filterButtons = Content.getComponent("panel_filterButtons");


// BYPASS
Content.getComponent("button_toggle_filter").setControlCallback(onbutton_toggle_filterControl);
const var panel_filter = Content.getComponent("panel_filter");

inline function onbutton_toggle_filterControl(component, value)
{
	Filter.setBypassed(!value);
	STATE.filterOpen = false;
	button_showFilter.setValue(0);
	displayShowMain('default');
	panel_filter.set('enabled', value);
};


const var knob_filter_freq = Content.getComponent("knob_filter_freq");
knob_filter_freq.setControlCallback(onknob_filter_freqControl);
inline function onknob_filter_freqControl(component, value)
{
	Filter.setAttribute(STATE.currentBandIndex + 1 , value);
	updateParameterWithLabel('FREQUENCY', value, 'Hz');
};

const var knob_filter_gain = Content.getComponent("knob_filter_gain");
knob_filter_gain.setControlCallback(onknob_filter_qControl);
inline function onknob_filter_qControl(component, value)
{
	
	Filter.setAttribute(STATE.currentBandIndex, value);
	updateParameterWithLabel('Q', value, '');
}

const var knob_filter_q = Content.getComponent("knob_filter_q");
knob_filter_q.setControlCallback(onknob_filter_gainControl);
inline function onknob_filter_gainControl(component, value)
{
	Filter.setAttribute(STATE.currentBandIndex + 2, value);
	updateParameterWithDb('GAIN', value);
};

const var button_showFilter = Content.getComponent("button_showFilter");
button_showFilter.setControlCallback(onbutton_showFilterControl);
inline function onbutton_showFilterControl(component, value)
{
	if (value) {
		STATE.filterOpen = true;
		displayShowMain('filter');
		updateFreezeParameter(false);
	} else {
		STATE.filterOpen = false;
		displayShowMain('default');
	}
};


Content.getComponent("button_disableBand").setControlCallback(onbutton_disableBandControl);
inline function onbutton_disableBandControl(component, value)
{	
	Filter.setAttribute(STATE.currentBandIndex + 3, value);
	label_bandDisplay.set('enabled', value);
};

// Display Filter Knobs

const filterButtons = [
	Content.getComponent("button_lowPass"),
	Content.getComponent("button_HighPass"),
	Content.getComponent("button_lowShelf"),
	Content.getComponent("button_highShelf"),
	Content.getComponent("button_bandPass")
];

filterButtons[0].setControlCallback(onbutton_lowPassControl);
inline function onbutton_lowPassControl(component, value)
{
	
	if (value) {
			local idx = 0;
			Filter.setAttribute(STATE.currentBandIndex + 4, idx);
			filterTypeRadio(idx);
	}
};


filterButtons[1].setControlCallback(onbutton_HighPassControl);
inline function onbutton_HighPassControl(component, value)
{
	
	if (value) {
		local idx = 1;
		Filter.setAttribute(STATE.currentBandIndex + 4, idx);
		filterTypeRadio(idx);
	}
};



filterButtons[2].setControlCallback(onbutton_lowShelfControl);
inline function onbutton_lowShelfControl(component, value)
{
	
	if (value) {
		local idx = 2;
		Filter.setAttribute(STATE.currentBandIndex + 4, idx);
		filterTypeRadio(idx);
	
	}
};



filterButtons[3].setControlCallback(onbutton_highShelfControl);
inline function onbutton_highShelfControl(component, value)
{
	if (value) {
		local idx = 3;
		Filter.setAttribute(STATE.currentBandIndex + 4, idx);
		filterTypeRadio(idx);
	}
};



filterButtons[4].setControlCallback(onbutton_bandPassControl);
inline function onbutton_bandPassControl(component, value)
{
	local idx = 4;
	if (value) {
		Filter.setAttribute(STATE.currentBandIndex + 4, idx);
		filterTypeRadio(idx);
	}
};



// MASTER
const var Gain = Synth.getEffect("Simple Gain4");

Content.getComponent("knob_io_in").setControlCallback(onknob_io_inControl);
inline function onknob_io_inControl(component, value)
{
	
	Gain.setAttribute('Gain', value);
	updateParameterWithDb('Input Gain', Math.floor(value * 100) / 100);
};


const var DryGain = Synth.getEffect("DryGain");
const var WetGain = Synth.getEffect("WetGain");

Content.getComponent("knob_io_out").setControlCallback(onknob_io_outControl);
inline function onknob_io_outControl(component, value)
{
	DryGain.setAttribute(DryGain.Gain, Engine.getDecibelsForGainFactor(1-value));
	WetGain.setAttribute(WetGain.Gain, Engine.getDecibelsForGainFactor(value));
	
	local dryAmount = parseInt((1- value) * 100);
	local wetAmount = parseInt(value * 100);
	
	customParameter('DRY: ' + dryAmount + ' | WET: ' + wetAmount);
};