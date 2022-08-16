
function updateParameterWithPercent(parameter, value) {
	STATE.parameter = parameter;
	STATE.value = Math.round(value * 100) + '%';
	
	updateDisplay();
}

function updateFreezeParameter(value) {
	if (value == 1.0) {
		STATE.freezeMode = true;
	} else {
		STATE.freezeMode = false;
	}	
	updateDisplay();
}