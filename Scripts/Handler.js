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
	"knob_reverb_mix",
	"knob_io_out"
], "Clicks Only", "Mouse Listener for Effect Controls");
knobShortcutWatcher.addListener("RefreshFunction", "Bypasses Effect", function (component, event) {
	if (event.cmdDown && event.clicked) {
		
		if (component.get('text') === 'IO MIX') {
			if (!Globals.isBypassed) {
				Master.bypassAll();
				Master.button_global_bypass.setValue(1);
			} else {
				Master.restoreBypass();
				Master.button_global_bypass.setValue(0);
			}
		}
	
		if (Globals.isBypassed) return;
		
		switch (component.get('text')) {
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


// Logo Click
const var logoButton = Content.getComponent('button_logo');

logoButton.setControlCallback(onbutton_logoControl);
inline function onbutton_logoControl(component, value) {
	if (value) {
		//UserSettings.settingsButtonsRadio(0);
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
	0.81,
	1.0,
	1.25,
	1.50,
	1.75,
	2.0,
	2.5,
	3.0
];

// Theme
//const var comboBox_theme = Content.getComponent("ComboBox_theme");
//comboBox_theme.setControlCallback(onComboBox1Control);
inline function onComboBox1Control(component, value) {
	if (value == 1.0) {
		Theme.setTheme('Light');
	}
	if (value == 2.0) {
		Theme.setTheme('Dark');
	}
	UserSettings.saveSettings();
};


// Buy Reach Button
const var button_buy_reach = Content.getComponent("button_buy_reach");
button_buy_reach.setControlCallback(onbutton_buy_reachControl);
inline function onbutton_buy_reachControl(component, value) {
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};

// Title Button
const var button_title = Content.getComponent("button_title");
button_title.setControlCallback(onbutton_titleControl);

button_title.setLocalLookAndFeel(headerTitleLAF);

inline function onbutton_titleControl(component, value) {
	if (value) {
		displayShow('about');
	} else {
		showMain();
	}
};

// Preset Browser Button
const presetBrowserButton = Content.getComponent("button_presetBrowser")
presetBrowserButton.setControlCallback(onbutton_presetBrowserControl);
presetBrowserButton.setLocalLookAndFeel(presetBrowserButtonLAF);
inline function onbutton_presetBrowserControl(component, value) {
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
PresetBrowserStateTimer.setTimerCallback(function () {
	presetBrowserButton.setValue(false);
	Globals.presetBrowserOpen = false;
	showMain();
	PresetBrowserStateTimer.stopTimer();
});

presetBrowserWatcher.addListener("RefreshFunction", "Delays the closing of the Preset Browser", function (component, event) {
	if (event.doubleClick) {
		PresetBrowserStateTimer.startTimer(250);
	}
});

const var PresetClickMuter = Synth.getEffect("PresetClickMuter");
const PresetHandler = Engine.createUserPresetHandler();

PresetHandler.setPreCallback(function(presetData)
{
	PresetClickMuter.setAttribute(PresetClickMuter.Gain, -60);
});

PresetHandler.setPostCallback(function(presetFile)
{
	PresetClickMuter.setAttribute(PresetClickMuter.Gain, 0);
	 if (Globals.isBypassed) {
		 Master.bypassAll();
	 }
	 PresetBrowserLogic.FloatingTile2.sendRepaintMessage();
});


Content.getComponent("onPresetLoad").setControlCallback(onPresetLoad);
inline function onPresetLoad(component, value) {
	// Dynamically get the effects
	Effects.Flanger = getHardcodedEffect('Flanger');
	Effects.Degrade = getHardcodedEffect('Degrade');
	Effects.Chorus = getHardcodedEffect('Chorus');
	Effects.Distortion = getHardcodedEffect('Distort');
	Reverb.JPVerb = getHardcodedEffect('Reverb');
	if (Engine.getCurrentUserPresetName() == '') {
		Engine.loadNextUserPreset(true);
	} else {
		presetBrowserButton.set('text', Engine.getCurrentUserPresetName());
	}

	EffectCustomizer.init();	
};



const var button_quickTheme = Content.getComponent("button_quickTheme");

button_quickTheme.setLocalLookAndFeel(LAF_displayButton);
button_quickTheme.setControlCallback(onbutton_quickThemeControl);
inline function onbutton_quickThemeControl(component, value) {
	if (value) {
		if (Theme.name == 'Light') {
			
			Theme.setTheme('Dark');
			return;
		}
		if (Theme.name == 'Dark') {
		
			Theme.setTheme('Super');
			return;
		} 
		if (Theme.name == 'Super') {
			Theme.setTheme('Light');
			return;
		}
	}
	
	

};

const var presetChangedTimer = Engine.createTimerObject();
presetChangedTimer.setTimerCallback(stopPresetTimer);

inline function stopPresetTimer() { presetChangedTimer.stopTimer(); }


const var button_preset_leftArrow = Content.getComponent("button_preset_leftArrow");
button_preset_leftArrow.setControlCallback(onbutton_preset_leftArrowControl);

inline function onbutton_preset_leftArrowControl(component, value) {
	if (value) {
		Engine.loadPreviousUserPreset(false);
	}

};

const var button_preset_rightArrow = Content.getComponent("button_preset_rightArrow");
button_preset_rightArrow.setControlCallback(onbutton_preset_rightArrowControl);
inline function onbutton_preset_rightArrowControl(component, value) {
	if (value) {
		Engine.loadNextUserPreset(false);
	}
};

button_preset_rightArrow.setLocalLookAndFeel(headerButtonsLAF);
button_preset_leftArrow.setLocalLookAndFeel(headerButtonsLAF);
logoButton.setLocalLookAndFeel(headerButtonsLAF);


// SHORTCUT HANDLER
const var panel_background = Content.getComponent("panel_background");

// Website
Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
inline function onpanel_githubControl(component, value) {
	if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
};

const var button_x1 = Content.getComponent("button_x1");
button_x1.setLocalLookAndFeel(LAF_displayIcon);
button_x1.setControlCallback(onButtonX);

const var button_x2 = Content.getComponent("button_x2");
button_x2.setLocalLookAndFeel(LAF_displayIcon);
button_x2.setControlCallback(onButtonX);

const var button_x3 = Content.getComponent("button_x3");
button_x3.setLocalLookAndFeel(LAF_displayIcon);
button_x3.setControlCallback(onButtonX);

inline function onButtonX(component, value) { showMain(); }

// MASTER
const var WetOnlyGain = Synth.getEffect("WetExtraGain");
const var Gain = Synth.getEffect("Simple Gain4");


const var knob_gain = Content.getComponent("knob_gain_knb");
knob_gain.setControlCallback(on_gain);
inline function on_gain(component, value) {
	Gain.setAttribute(Gain.Gain, value);
};

const var knob_wet = Content.getComponent("knob_wet_knb");
knob_wet.setControlCallback(on_wet);
knob_wet.setLocalLookAndFeel(knb_laf);

inline function on_wet(component, value) {
	WetOnlyGain.setAttribute(WetOnlyGain.Gain, value);
};

const var DryGain = Synth.getEffect("DryGain");
const var WetGain = Synth.getEffect("WetGain");

const var knob_io_out = Content.getComponent("knob_io_out");
knob_io_out.setControlCallback(onknob_io_outControl);
knob_io_out.setLocalLookAndFeel(mixLAF);

inline function onknob_io_outControl(component, value) {
	DryGain.setAttribute(DryGain.Gain, Engine.getDecibelsForGainFactor(1 - value));
	WetGain.setAttribute(WetGain.Gain, Engine.getDecibelsForGainFactor(value));
	
	local dryAmount = parseInt((1 - value) * 100);
	local wetAmount = parseInt(value * 100);
};