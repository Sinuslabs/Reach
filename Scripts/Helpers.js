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

function updateParameterWithFixedSampleRate(parameter, value) {
	
	var index = (value - 0.53) * 100;
	if (index <= -2) {
		index = 0;
	}
	
	Console.print(Math.round(index));
	
	var sampleRates = [
		44,
		25,
		22,
		20,
		14,
		11,
		8820,
		7350,
		6300,
		5312,
		4410,
		3675,
		3150,
	];
	
	var currentRate = sampleRates[index];
	var label = 'Hz';
	if (currentRate < 50) {
		label = 'kHz';
	}

	
	STATE.parameter = parameter;
	STATE.value = sampleRates[index] + label;
	
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