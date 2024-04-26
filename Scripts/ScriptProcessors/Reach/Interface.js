include("Theme.js");
include("Paths.js");
include("Helpers.js");
include("Filter.js");
include("Config.js");
include("LookAndFeel.js");
include("Settings.js");
include("Handler.js");
include("Effects.js");
include("EffectCustomizer.js");
include("Reverb.js");
include("ZoomHandler.js");
include("Router.js");
include("Server.js");
include("Display.js");
include("ReverbAnimation.js");
include("DegradeAnimation.js");
include("FlairAnimation.js");
include("ChorusAnimation.js");
include("DistortionAnimation.js");
include("VuMeter.js");
include("SplashAnimation.js");
include("Randomization.js");

Content.makeFrontInterface(1134, 510);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/JetBrainsMono-Medium.ttf", "jetbrains-mono");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Inter-SemiBold.ttf", "inter-semi");
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
	UserSettings.setGainBypass();
	UserSettings.wetOnlyGainSwitch.setValue(1);
	SplashAnimation.init();
}

reg i;
reg j;

// Activation Label
//const var button_not_activated = Content.getComponent("button_not_activated");
const var label_thank_you = Content.getComponent("label_thank_you");

// Check License
getActivationStatus();

//API.label_not_found.set('visible', false);
UserSettings.button_not_activated.set('visible', !Globals.activated);
button_buy_reach.set('visible', !Globals.activated);
label_thank_you.set('visible', Globals.activated);

// Main Screen
const MainDisplayTimer = Engine.createTimerObject();
MainDisplayTimer.setTimerCallback(showMainOnInit);
MainDisplayTimer.startTimer(20);

inline function showMainOnInit() {

	showMain();
	Globals.screenLock = false;
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

namespace About {
	
	const var about_info = Content.getComponent("about_info");
	
	const INFO = {
		
		name: 'REACH',
		
	};
	about_info.setPaintRoutine(aboutRoutine);
	
	Console.print(Engine.getVersion());
	
	inline function aboutRoutine(g) {
		
		local a = this.getLocalBounds(1);
		
		local textHeight = 20;
		
		local logoArea = [a[0], a[1], 55, 77];
		local textArea = [60, a[1], a[2], a[3]];
		
		local nameArea = [textArea[0], a[1], a[2], textHeight];
		local versionArea = [textArea[0], a[1] + textHeight, 60, textHeight];
		local buildArea = [textArea[0], a[1] + textHeight * 2, a[2], textHeight];
		
		g.setColour(Colours.white);
		g.fillPath(Paths.icons.reachLogo, logoArea);
		
		g.setFont(Fonts.mainFont, 20);
		g.drawAlignedText(INFO.name, nameArea, 'left');
		
		g.setColour('0xF2F63E');
		g.fillRoundedRectangle(versionArea, 2);
		
		g.setColour(Colours.black);
		g.drawAlignedText(Engine.getVersion(), versionArea, 'centred');
		
		g.setColour(Colours.white);
		g.setFont(Fonts.secondaryFont, 14);
		g.drawAlignedText(getDate(), buildArea, 'left');
		
	}
	
	inline function getDate() {
		local date = Date.getSystemTimeISO8601(true);
		
		date = date.split('.')[0];
		local time = date.split('T')[1];
		date = date.split('T')[0];
		return date;
	}
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
 