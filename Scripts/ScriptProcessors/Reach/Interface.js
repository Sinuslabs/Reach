
const laf = Engine.createGlobalScriptLookAndFeel();
include("Theme.js");
include("Paths.js");
include("Helpers.js");
include("Config.js");
include("StyleHelpers.js");
include("UpdateChecker.js");
include("LookAndFeel.js");
include("Filter.js");
include("Settings.js");
include("Handler.js");
include("Effects.js");
include("EffectCustomizer.js");
include("Reverb.js");
include("ZoomHandler.js");
include("Router.js");
include("ThankYou.js");
include("Supabase.js");
include("Display.js");
include("VuMeter.js");
include("Randomization.js");
include("About.js");
include("PresetBrowserLogic.js");
include("Master.js");
include("PanicMode.js");
include("FFTVisual.js");
include("PresetBrowserLAF.js");
Content.makeFrontInterface(1134, 510);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/JetBrainsMono-Medium.ttf", "jetbrains-mono");
Engine.loadNextUserPreset(true);

Synth.deferCallbacks(true);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/OverusedGrotesk-SemiBold.ttf", "inter-semi");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/OverusedGrotesk-Roman.ttf", "inter-reg");
Engine.setGlobalFont("inter-semi");

// Setting Global State
Globals.parameter = 'NONE';
Globals.freezeMode = false;

// DEBUG
Globals.activated = false;
Globals.presetBrowserOpen = false;
Globals.settingsOpen = false;
Globals.effectsOpen = false;
Globals.aboutOpen = false;
Globals.filterOpen = false;
Globals.screenLock = true;

// Loading Settings
if (settingsExist()) {
	UserSettings.loadSettings();
} else {
	Settings.setZoomLevel(1);
	UserSettings.comboBox_zoom.setValue(7.0);
	Theme.setTheme('Light');
}

reg i;
reg j;



// Activation Label
//const var button_not_activated = Content.getComponent("button_not_activated");
const var label_thank_you = Content.getComponent("displayTheme_thank_you");

// Check License
getActivationStatus();

UserSettings.button_not_activated.set('visible', !Globals.activated);
button_buy_reach.set('visible', !Globals.activated);
label_thank_you.set('visible', Globals.activated);

// Main Screen
const MainDisplayTimer = Engine.createTimerObject();
MainDisplayTimer.setTimerCallback(showMainOnInit);
MainDisplayTimer.startTimer(20);

inline function showMainOnInit() {

	showMain();
	//displayShow('presetBrowser');
	Globals.screenLock = false;
	MainDisplayTimer.stopTimer();
}

const var GainReduction = Synth.getEffect("Simple Gain5");
const var GainReductionTimer = Engine.createTimerObject();
const var TimeoutCounter = 15000;

	var TimeoutCurrent = 0;
	
	GainReductionTimer.setTimerCallback(function() {
		
		if (Globals.isBypassed) {return;}
	
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

function themeMainPanel() {
	panel_background.setPaintRoutine(function(g) {
		var a = [0, 0, this.getWidth(), this.getHeight()];
		g.setGradientFill([
			PanelTheme.mainUpperGradientColour, 0.0, 0.0,
			PanelTheme.mainLowerGradientColour, 0.5, 100.0]
		);
		g.fillRoundedRectangle(a, PANEL_BORDER_RADIUS);
		g.addNoise({
			alpha: 0.03,
			monochromatic: true,
			scaleFactor: 1.2,
			area: a
		});
	});
}
themeMainPanel();
themePanels();


inline function addGuides() {
	
	Content.addVisualGuide([0, 460], Colours.yellow);
	Content.addVisualGuide([0, 306], Colours.yellow);
	Content.addVisualGuide([0, 198], Colours.yellow);
	Content.addVisualGuide([567, 0], Colours.yellow);
	Content.addVisualGuide([0, 40], Colours.yellow);
	Content.addVisualGuide([0, 30], Colours.yellow);
}

//addGuides();

const var panel_backdrop = Content.getComponent("themeablePanel_panel_backdrop");
panel_backdrop.setPaintRoutine(drawBackdrop);

inline function drawBackdrop(g) {
	local a = this.getLocalBounds(0);
	
	g.setColour(DisplayTheme.backgroundColour);
	g.fillRoundedRectangle(a, 5);
	g.addNoise({
	    alpha: 0.02, // Keep original noise settings
	    monochromatic: false
	});
}

//include("crc.js");
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
 