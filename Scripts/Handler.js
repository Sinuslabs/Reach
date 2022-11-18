// Logo Click
const var logoButton = Content.getComponent('button_logo');

logoButton.setControlCallback(onbutton_logoControl);
inline function onbutton_logoControl(component, value) { 
	if (value) {
		UserSettings.settingsButtonsRadio(0);
		displayShowSettings('general');
		Globals.settingsOpen = true;
	} else {
		Globals.settingsOpen = false;
		showMain();
	}
};

const var settingsButtons = [
	Content.getComponent('button_settings_general'),
	Content.getComponent('button_settings_audio'),
	Content.getComponent('button_settings_activate'),
	Content.getComponent('button_settings_about')
];

settingsButtons[0].setControlCallback(onbutton_settings_generalControl);
 inline function onbutton_settings_generalControl(component, value)
 {
 	UserSettings.settingsButtonsRadio(0);
 	displayShowSettings('general');
 };
 
 settingsButtons[1].setControlCallback(onbutton_settings_audioControl);
  inline function onbutton_settings_audioControl(component, value)
  {
  	UserSettings.settingsButtonsRadio(1);
  	displayShowSettings('audio');
  };

 settingsButtons[2].setControlCallback(onbutton_settings_activateControl);
 inline function onbutton_settings_activateControl(component, value)
 {
 	UserSettings.settingsButtonsRadio(2);
 	displayShowSettings('activate');
 };

settingsButtons[3].setControlCallback(onbutton_settings_aboutControl);
inline function onbutton_settings_aboutControl(component, value)
{
	UserSettings.settingsButtonsRadio(3);
	displayShowSettings('about');
};

// General Settings

// Zoom factor

const zoomFactors = [
	0.3,
	0.4,
	0.5,
	0.6,
	0.75,
	1.0,
	1.25,
	1.50,
	1.75,
	2.0,
	2.5,
	3.0
];

const var comboBox_zoom = Content.getComponent("ComboBox_zoom")
comboBox_zoom.setControlCallback(onComboBox_zoomControl);
inline function onComboBox_zoomControl(component, value)
{
	Settings.setZoomLevel(zoomFactors[value - 1]);
	UserSettings.saveSettings();
};

// Theme
const var comboBox_theme = Content.getComponent("ComboBox_theme");
comboBox_theme.setControlCallback(onComboBox1Control);
inline function onComboBox1Control(component, value)
{
	if (value == 1.0) {
		Theme.setTheme('Light');
	}
	if (value == 2.0) {
		Theme.setTheme('Dark');	
	}
};

// Animations
const var button_animationToggle = Content.getComponent("button_animationToggle");
button_animationToggle.setControlCallback(onbutton_animationToggleControl);
inline function onbutton_animationToggleControl(component, value)
{
	UserSettings.enableAnimations = !value;
	UserSettings.saveSettings();
};

// Activate Button
const var button_active = Content.getComponent("button_activate")
const var email = Content.getComponent("label_email");
const var password = Content.getComponent("label_password");

button_active.setControlCallback(onbutton_activateControl);
inline function onbutton_activateControl(component, value) {
	
	if (value) {
		local usermail = email.get('text');
		local userpw = password.get('text');
		API.activateLicense(usermail, userpw);
	}
};

// Buy Reach Button
Content.getComponent("button_buy_reach").setControlCallback(onbutton_buy_reachControl);
inline function onbutton_buy_reachControl(component, value)
{
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};

const var button_not_activated = Content.getComponent("button_not_activated");
button_not_activated.setControlCallback(onbutton_not_activatedControl);
inline function onbutton_not_activatedControl(component, value)
{
	if (value) {
		displayShowSettings('activate');
		Globals.settingsOpen = true;
	}
};

// Account License Panel
const var panel_non_activated = Content.getComponent("panel_non_activated");
panel_non_activated.set('visible', !Globals.activated);
panel_non_activated.repaint();

// Title Button
const var button_title = Content.getComponent("button_title");
button_title.setControlCallback(onbutton_titleControl);
inline function onbutton_titleControl(component, value)
{
	if (value) {
		displayShow('about');
	} else {
		showMain();
	}
};

// Preset Browser Button
const presetBrowserButton = Content.getComponent("button_presetBrowser")
presetBrowserButton.setControlCallback(onbutton_presetBrowserControl);
inline function onbutton_presetBrowserControl(component, value)
{
	if (value) {
		displayShow('presetBrowser');
	} else {
		Globals.presetBrowserOpen = false;
		showMain();
	}
};

const var presetBrowserWatcher = Engine.createBroadcaster({
	"id": "presetBrowserOnClickStatus",
	"args": ["component", "event"]
});

presetBrowserWatcher.attachToComponentMouseEvents("FloatingTile2", "All Callbacks", "Mouse Listener for PresetBrowser");

const var PresetBrowserStateTimer = Engine.createTimerObject();
PresetBrowserStateTimer.setTimerCallback(function() {
		presetBrowserButton.setValue(false);
		Globals.presetBrowserOpen = false;
		showMain();
		PresetBrowserStateTimer.stopTimer();
});

presetBrowserWatcher.addListener("RefreshFunction", "Delays the closing of the Preset Browser",function(component, event)
{
    if(event.doubleClick) {
   		PresetBrowserStateTimer.startTimer(250);
	}
});

Content.getComponent("onPresetLoad").setControlCallback(onPresetLoad);
inline function onPresetLoad(component, value)
{
	Console.print('onload');
	
	// Dynamically get the effects
	Effects.Flanger = getHardcodedEffect('Flanger');
	Effects.Degrade = getHardcodedEffect('Degrade');
	Effects.Chorus = getHardcodedEffect('Chorus');
	Effects.Distortion = getHardcodedEffect('Distort');
	Reverb.JPVerb = getHardcodedEffect('Reverb');

	if (Engine.getCurrentUserPresetName() == '') {
		presetBrowserButton.set('text', 'Tunnel vision');
	} else {
		presetBrowserButton.set('text', Engine.getCurrentUserPresetName());
	}
	
	EffectCustomizer.init();	
};

const var button_preset_leftArrow = Content.getComponent("button_preset_leftArrow");
button_preset_leftArrow.setControlCallback(onbutton_preset_leftArrowControl);
inline function onbutton_preset_leftArrowControl(component, value)
{
	Engine.loadPreviousUserPreset(false);
};

const var button_preset_rightArrow = Content.getComponent("button_preset_rightArrow");
button_preset_rightArrow.setControlCallback(onbutton_preset_rightArrowControl);
inline function onbutton_preset_rightArrowControl(component, value)
{
	Engine.loadNextUserPreset(false);
};

// SHORTCUT HANDLER
const var panel_background = Content.getComponent("panel_background");

panel_background.setKeyPressCallback(onBackgroundKeypress);
inline function onBackgroundKeypress(key) {
	
	// ESC -> main Screen
	if (key.keyCode == 27) showMain();
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
Content.getComponent("button_x1").setControlCallback(onButtonX);
Content.getComponent("button_x2").setControlCallback(onButtonX);
Content.getComponent("button_x3").setControlCallback(onButtonX);

inline function onButtonX(component, value) { showMain(); }

// MASTER
const var Gain = Synth.getEffect("Simple Gain4");
Content.getComponent("knob_io_in").setControlCallback(onknob_io_inControl);
inline function onknob_io_inControl(component, value)
{
	
	Gain.setAttribute('Gain', value);
	updateParameterWithLabel('Gain', value / 100, 'dB');
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