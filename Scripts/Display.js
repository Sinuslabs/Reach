// Display Parameter
const var label_parameter_value = Content.getComponent("label_parameter_value");
const var label_parameter_name = Content.getComponent("label_parameter_name");

function updateDisplay() {
	label_parameter_value.set('text', STATE.value);
	label_parameter_name.set('text', STATE.parameter);
}


const screenTimer = Engine.createTimerObject();
screenTimer.setTimerCallback(showMainScreen);

inline function showMainScreen() {
	displayShow('main');
	screenTimer.stopTimer();
}

function showTempScreen(route) {
	if (screenTimer.isTimerRunning()) {
		screenTimer.resetCounter();
	}
	
	screenTimer.startTimer(850);
	displayShowMain(route);
}