
function updateParameterWithPercent(parameter, value) {
	STATE.parameter = parameter;
	STATE.value = Math.round(value * 100) + '%';
	
	updateDisplay();
}

function updateParameterWithBit(parameter, value) {
	var index = Math.round(value * 10) - 4;
	var bitMapping = [
		8,
		10,
		11,
		12,
		13,
		14,
		16,
	];

	STATE.parameter = parameter;
	STATE.value = bitMapping[index] + ' BIT';
	
	updateDisplay();
}

function updateParameterWithRate(parameter, value) {
	

	STATE.parameter = parameter;
	STATE.value = Math.round(value * 10) + ' Hz';
	
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