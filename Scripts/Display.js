const screenTimer = Engine.createTimerObject();
screenTimer.setTimerCallback(showMainScreen);

inline function showMainScreen() {
	// stop animation timers
	ReverbAnimation.stopTimer();
	ChorusAnimations.stopTimer();
	
	showMain();	
	screenTimer.stopTimer();
}

function showTempScreen(route) {

	if (
		Globals.effectsOpen ||
		Globals.presetBrowserOpen ||
		Globals.settingsOpen ||
		Globals.aboutOpen ||
		Globals.filterOpen ||
		presetChangedTimer.isTimerRunning() ||
		!UserSettings.enableAnimations
	) return;
	
	if (screenTimer.isTimerRunning()) {	
		screenTimer.resetCounter();
	}
	
	// Wiggle Animations
	ReverbAnimation.startTimer();
	ChorusAnimations.startTimer();
		
	screenTimer.startTimer(1500);
	displayShowMain(route);
}