// Logo Click
const var logoButton = Content.getComponent('button_logo');

logoButton.setControlCallback(onbutton_logoControl);
inline function onbutton_logoControl(component, value) { 
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
];

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
	STATE.enableAnimations = !value;
	UserSettings.saveSettings();
};

// Filter on Drag
const var button_filterOnDrag = Content.getComponent("button_filterOnDrag");
button_filterOnDrag.setControlCallback(onbutton_filterOnDragControl);
inline function onbutton_filterOnDragControl(component, value)
{
	STATE.filterOnDrag = !value;
	UserSettings.saveSettings();
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
		STATE.settingsOpen = true;
	}
};

// Account License Panel
const var panel_non_activated = Content.getComponent("panel_non_activated");
panel_non_activated.set('visible', !STATE.ACTIVATED);
panel_non_activated.repaint();

// Title Button
const var button_title = Content.getComponent("button_title");
button_title.setControlCallback(onbutton_titleControl);
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

const var presetBrowserWatcher = Engine.createBroadcaster({
	"id": "presetBrowserOnClickStatus",
	"args": ["component", "event"]
});

presetBrowserWatcher.attachToComponentMouseEvents("FloatingTile2", "All Callbacks", "Mouse Listener for PresetBrowser");

const var PresetBrowserStateTimer = Engine.createTimerObject();
PresetBrowserStateTimer.setTimerCallback(function() {
		presetBrowserButton.setValue(false);
		STATE.presetBrowserOpen = false;
		showMain();
		PresetBrowserStateTimer.stopTimer();
});

presetBrowserWatcher.addListener("RefreshFunction", "Delays the closing of the Preset Browser",function(component, event)
{
    if(event.doubleClick) {
   		PresetBrowserStateTimer.startTimer(250);
	}
});

Content.getComponent("Button1").setControlCallback(onButton1Control);
inline function onButton1Control(component, value)
{
	// reset band to band 1; 
	STATE.currentBandIndex = 0;
	if (Engine.getCurrentUserPresetName() == '') {
		presetBrowserButton.set('text', 'Blackhole');
	} else {
		presetBrowserButton.set('text', Engine.getCurrentUserPresetName());
	}
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
	
	STATE.presetBrowserOpen = false;
	presetBrowserButton.setValue(false);
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
	
	disableStates();
	STATE.settingsOpen = false;
	displayShowMain('default');
};

inline function onbutton_x1Control(component, value)
{
	showMain();
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