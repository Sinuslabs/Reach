// Display Parameter
const var label_parameter_name = Content.getComponent("label_parameter_name");

function updateDisplay() {
	label_parameter_name.set('text', Globals.displayParameter);
}


const screenTimer = Engine.createTimerObject();
screenTimer.setTimerCallback(showMainScreen);

inline function showMainScreen() {
	if (Globals.presetBrowserOpen || !UserSettings.enableAnimations || Globals.filterOpen || Globals.settingsOpen) return;

	// stop animation timers
	ReverbAnimation.stopTimer();
	FlairAnimation.stopTimer();
	
	displayShowMain('default');	
	screenTimer.stopTimer();
}

function showTempScreen(route) {
	if (Globals.presetBrowserOpen || !UserSettings.enableAnimations || Globals.filterOpen || Globals.settingsOpen) return;
	
	if (screenTimer.isTimerRunning()) {	
		screenTimer.resetCounter();
	}
	
	// Wiggle Animations
	ReverbAnimation.startTimer();
	FlairAnimation.startTimer();
		
	//screenTimer.startTimer(1500);
	displayShowMain(route);
}