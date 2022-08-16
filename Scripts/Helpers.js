
function updateParameterWithPercent(parameter, value) {
	STATE.parameter = parameter;
	STATE.value = Math.round(value * 100) + '%';
	
	updateDisplay();
}
