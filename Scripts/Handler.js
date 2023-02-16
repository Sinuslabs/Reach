// Shortcut listener	
const var knobShortcutWatcher = Engine.createBroadcaster({
	"id": "effectKnobsOnClickStatus",
	"args": ["component", "event"]
});

knobShortcutWatcher.attachToComponentMouseEvents([
"knob_effects_degrade",
"knob_effects_flair",
"knob_effects_chorus",
"knob_effects_distortion",
"knob_reverb_mix"
], "Clicks Only", "Mouse Listener for Effect Controls");
knobShortcutWatcher.addListener("RefreshFunction", "Bypasses Effect", function(component, event) {
	if (event.cmdDown && event.clicked) {
		switch(component.get('text')) {
			case 'Reverb MIX':
				Reverb.displayButton_reverb_bypass.setValue(!Reverb.displayButton_reverb_bypass.getValue());
				Reverb.displayButton_reverb_bypass.changed();
				break;
			case 'Degrade':
				Effects.displayButton_degrade_bypass.setValue(!Effects.displayButton_degrade_bypass.getValue());
				Effects.displayButton_degrade_bypass.changed();
				break;
			case 'Flanger':
				Effects.displayButton_flanger_bypass.setValue(!Effects.displayButton_flanger_bypass.getValue());
				Effects.displayButton_flanger_bypass.changed();
				break;
			case 'Chorus':
				Effects.displayButton_chorus_bypass.setValue(!Effects.displayButton_chorus_bypass.getValue());
				Effects.displayButton_chorus_bypass.changed();
				break;
			case 'Distort':
				Effects.displayButton_distort_bypass.setValue(!Effects.displayButton_distort_bypass.getValue());
				Effects.displayButton_distort_bypass.changed();
				break;
			case 'default':
				return;
		}
	}
});


// MAIN MIX KNOB
const var knob_io_out = Content.getComponent("knob_io_out");

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
	UserSettings.saveSettings();
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
const var button_buy_reach = Content.getComponent("button_buy_reach");
button_buy_reach.setControlCallback(onbutton_buy_reachControl);
inline function onbutton_buy_reachControl(component, value)
{
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};

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
		presetBrowserButton.set('text', '- INIT -');
	} else {
		presetBrowserButton.set('text', Engine.getCurrentUserPresetName());
	}
	
	EffectCustomizer.init();	
};



Content.getComponent("button_quickTheme").setControlCallback(onbutton_quickThemeControl);
inline function onbutton_quickThemeControl(component, value)
{
	if (value) {
		if (Theme.name == 'Light') {
			Theme.setTheme('Dark');
		} else {
			Theme.setTheme('Light');
		}
		UserSettings.saveSettings();
	}

};

const var presetChangedTimer = Engine.createTimerObject();
presetChangedTimer.setTimerCallback(stopPresetTimer);

inline function stopPresetTimer() { presetChangedTimer.stopTimer(); }


const var button_preset_leftArrow = Content.getComponent("button_preset_leftArrow");
button_preset_leftArrow.setControlCallback(onbutton_preset_leftArrowControl);
inline function onbutton_preset_leftArrowControl(component, value)
{
	if (value) {
		Engine.loadPreviousUserPreset(false);
		presetChangedTimer.startTimer(200);
	}

};

const var button_preset_rightArrow = Content.getComponent("button_preset_rightArrow");
button_preset_rightArrow.setControlCallback(onbutton_preset_rightArrowControl);
inline function onbutton_preset_rightArrowControl(component, value)
{
	if (value) {
		Engine.loadNextUserPreset(false);		
		presetChangedTimer.startTimer(200);
	}
};

// SHORTCUT HANDLER
const var panel_background = Content.getComponent("panel_background");
panel_background.setKeyPressCallback(onBackgroundKeypress);
inline function onBackgroundKeypress(key) {
	
	// ESC -> main Screen
	if (key.keyCode == 27) { 
		showMain();
		SplashAnimation.cancelAnimation();
		Randomization.hideLockMenu();
	}
	if (key.keyCode == 82) {
		Console.print(returnTest());
		Randomization.randomizeParameters();
		Randomization.randomizeButton();
	}
	if (key.keyCode == 68) {
		Randomization.randomizeDisplayKnobs();
	}
	if (key.keyCode == 75) {
		Randomization.randomizePanelKnobs();
	}
	if (key.keyCode == 69) {
		Randomization.randomizeEffects();
	}
}

// Website
Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
inline function onpanel_githubControl(component, value)
{
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};


// X Button
Content.getComponent("button_x1").setControlCallback(onButtonX);
Content.getComponent("button_x2").setControlCallback(onButtonX);
Content.getComponent("button_x3").setControlCallback(onButtonX);

inline function onButtonX(component, value) { showMain(); }

// MASTER
const var WetOnlyGain = Synth.getEffect("WetExtraGain");
const var Gain = Synth.getEffect("Simple Gain4");
Content.getComponent("knob_io_in").setControlCallback(onknob_io_inControl);
inline function onknob_io_inControl(component, value)
{
	Console.print(' Settings Gain: ' + UserSettings.wetOnlyGain);
	UserSettings.wetOnlyGain 
		? WetOnlyGain.setAttribute('Gain', value)
		: Gain.setAttribute('Gain', value);
	
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
};