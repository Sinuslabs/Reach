function updateParameterWithLabel(parameter, value, label) {
	
	if (label != 'Hz') {
		value = value * 100;
	}
	
	STATE.parameter = parameter + ' | ' + Math.round(parseInt(value)) + label;
	updateDisplay();
}

function updateParameterWithDb(parameter, value) {
	
	STATE.parameter = parameter + ' | ' + value + 'dB';
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

	STATE.parameter = parameter + ' | ' + bitMapping[index] + ' BIT';
	updateDisplay();
}

function updateParameterWithFixedSampleRate(parameter, value) {
	
	var index = (value - 0.53) * 100;
	
	if (index <= -2) {
		index = 0;
	}
	
	var sampleRates = [
		44100,
		25500,
		22100,
		20000,
		14800,
		1150,
		8820,
		7350,
		6300,
		5312,
		4410,
		3675,
		3150,
	];
	
	STATE.parameter = parameter + ' | ' + sampleRates[index] + 'Hz';
	updateDisplay();
}

function updateFreezeParameter(value) {
	if (value == 1.0) {
		STATE.freezeMode = true;
	} else {
		STATE.freezeMode = false;
	}
	icon_panel_freeze2.set('visible', !STATE.freezeMode);
	updateDisplay();
}

function getIconColor(enabled) {
	if (enabled) { return '0x6B6B6B' }
	else { return '0xA3A3A3'}
}

function getPanelState(panelName) {
	var panel = Content.getComponent(panelName);
	return panel.get('enabled');
}

function getBoolean(value) {
	if (value == 1) {return true} else {return false}
}
