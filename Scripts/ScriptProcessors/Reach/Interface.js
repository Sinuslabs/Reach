include("Paths.js");
include("Handler.js");
include("Reverb.js");
include("Settings.js");
include("State.js");
include("Config.js");
include("Router.js");
include("LookAndFeel.js");
include("Helpers.js");
include("Server.js");
include("Display.js");
include("ReverbAnimation.js");
include("DegradeAnimation.js");
include("FlairAnimation.js");
include("VuMeter.js");
include("Eq.js");
include("Theme.js");

Content.makeFrontInterface(1900, 860);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SpaceMono-Regular.ttf", "space");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Inter-SemiBold.ttf", "inter-semi");
Engine.setGlobalFont("inter-semi");

// Loading Settings
if (settingsExist()) {
	loadSettings();
} else {
	Settings.setZoomLevel(0.6);
	comboBox_zoom.setValue(4.0);
}

// Activation Label
//const var button_not_activated = Content.getComponent("button_not_activated");
const var label_status_account = Content.getComponent("label_status_account");
const var label_thank_you = Content.getComponent("label_thank_you");

// Check License
getActivationStatus();

// DEBUG
STATE.ACTIVATED = true;

label_not_found.set('visible', false);
button_not_activated.set('visible', !STATE.ACTIVATED);
label_thank_you.set('visible', STATE.ACTIVATED);

// Main Screen
const MainDisplayTimer = Engine.createTimerObject();
MainDisplayTimer.setTimerCallback(showMain);
MainDisplayTimer.startTimer(30);

inline function showMain() {

	displayShowMain('default');
	
	panel_non_activated.set('visible', !STATE.ACTIVATED);
	panel_non_activated.repaint();
	
	MainDisplayTimer.stopTimer();
}

const var GainReduction = Synth.getEffect("Simple Gain5");
const var GainReductionTimer = Engine.createTimerObject();
const var TimeoutCounter = 10000;

	var TimeoutCurrent = 0;
	
	GainReductionTimer.setTimerCallback(function()
	{
	    TimeoutCurrent += 1000;
	    
	    if (TimeoutCurrent == TimeoutCounter) {
	      TimeoutCurrent = 0;  
	    }
	    if (TimeoutCurrent > 7000) {
	       GainReduction.setBypassed(false);
	    } else {
	        GainReduction.setBypassed(true);
	    }
	});
	
	if (!STATE.ACTIVATED) {
		GainReduction.setBypassed(false);
		GainReductionTimer.startTimer(1000);		
	} else {
		GainReduction.setBypassed(true);
}function onNoteOn()
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
 