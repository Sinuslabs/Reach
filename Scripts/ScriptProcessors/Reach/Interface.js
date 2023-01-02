include("Paths.js");
include("Handler.js");
include("Helpers.js");
include("Reverb.js");
include("Effects.js");
include("Filter.js");
include("Settings.js");
include("EffectCustomizer.js");
include("ZoomHandler.js");
include("Router.js");
include("LookAndFeel.js");
include("Server.js");
include("Display.js");
include("ReverbAnimation.js");
include("DegradeAnimation.js");
include("FlairAnimation.js");
include("ChorusAnimation.js");
include("DistortionAnimation.js");
include("VuMeter.js");
include("Theme.js");
include("SplashAnimation.js");

Content.makeFrontInterface(1134, 510);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/JetBrainsMono-Medium.ttf", "jetbrains-mono");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Inter-SemiBold.ttf", "inter-semi");
Engine.setGlobalFont("inter-semi");

Engine.loadNextUserPreset(true);

// Setting Global State
Globals.parameter = 'NONE';
Globals.freezeMode = false;

// DEBUG
Globals.activated = true;
Globals.presetBrowserOpen = false;
Globals.settingsOpen = false;
Globals.effectsOpen = false;
Globals.aboutOpen = false;
Globals.filterOpen = false;

// Loading Settings
if (settingsExist()) {
	UserSettings.loadSettings();
	if (UserSettings.startupAnimation) {
		SplashAnimation.init();
	} else {
		SplashAnimation.tubeAniPanel.set('visible', false);
		SplashAnimation.animationBackground.set('visible', false);
	}
} else {
	Settings.setZoomLevel(1);
	comboBox_zoom.setValue(4.0);
	Theme.setTheme('Light');
}

reg i;
reg j;

// Activation Label
//const var button_not_activated = Content.getComponent("button_not_activated");
const var label_status_account = Content.getComponent("label_status_account");
const var label_thank_you = Content.getComponent("label_thank_you");

// Check License
getActivationStatus();

API.label_not_found.set('visible', false);
button_not_activated.set('visible', !Globals.activated);
label_thank_you.set('visible', Globals.activated);

// Main Screen
const MainDisplayTimer = Engine.createTimerObject();
MainDisplayTimer.setTimerCallback(showMainOnInit);
MainDisplayTimer.startTimer(20);

inline function showMainOnInit() {

	showMain();
	panel_non_activated.set('visible', !Globals.activated);
	panel_non_activated.repaint();
	
	MainDisplayTimer.stopTimer();
}

const var GainReduction = Synth.getEffect("Simple Gain5");
const var GainReductionTimer = Engine.createTimerObject();
const var TimeoutCounter = 15000;

	var TimeoutCurrent = 0;
	
	GainReductionTimer.setTimerCallback(function() {
	    TimeoutCurrent += 1000;
	    
	    if (TimeoutCurrent == TimeoutCounter) {
	      TimeoutCurrent = 0;  
	    }
	    if (TimeoutCurrent > 13000) {
	       GainReduction.setBypassed(false);
	    } else {
	        GainReduction.setBypassed(true);
	    }
	});
	if (!Globals.activated) {
		GainReduction.setBypassed(false);
		GainReductionTimer.startTimer(1000);		
	} else {
		GainReduction.setBypassed(true);
}




function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	Console.print('onTimer');
}
 function onControl(number, value)
{
	
}
 