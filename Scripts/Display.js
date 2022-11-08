// Display Parameter
const var label_parameter_name = Content.getComponent("label_parameter_name");

function updateDisplay() {
	label_parameter_name.set('text', Globals.displayParameter);
}

const screenTimer = Engine.createTimerObject();
screenTimer.setTimerCallback(showMainScreen);

inline function showMainScreen() {
	// stop animation timers
	ReverbAnimation.stopTimer();
	
	showMain();	
	screenTimer.stopTimer();
}

function showTempScreen(route) {

	if (
		Globals.effectsOpen ||
		Globals.presetBrowserOpen ||
		Globals.settingsOpen ||
		Globals.aboutOpen ||
		!UserSettings.enableAnimations
	) return;
	
	if (screenTimer.isTimerRunning()) {	
		screenTimer.resetCounter();
	}
	
	// Wiggle Animations
	ReverbAnimation.startTimer();
		
	screenTimer.startTimer(1500);
	displayShowMain(route);
}