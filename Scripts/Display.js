const screenTimer = Engine.createTimerObject();
screenTimer.setTimerCallback(showMainScreen);

inline function showMainScreen() {

	
	showMain();	
	screenTimer.stopTimer();
}

