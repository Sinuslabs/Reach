function updateParameterWithLabel(parameter, value, label) {
	
	if (label != 'Hz') {
		value = value * 100;
	}
	
	Globals.displayParameter = parameter + ' | ' + Math.round(parseInt(value)) + label;
	updateDisplay();
}


// each caller needs to handle conversion (used for filter multi value update);
function customParameter(parameter) {
	Globals.displayParameter = parameter;
	updateDisplay();
}

function updateParameterWithDb(parameter, value) {
	
	Globals.displayParameter = parameter + ' | ' + Engine.doubleToString(value, 1) + 'dB';
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

	Globals.displayParameter = parameter + ' | ' + bitMapping[index] + ' BIT';
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
	
	Globals.displayParameter = parameter + ' | ' + sampleRates[index] + 'Hz';
	updateDisplay();
}

function updateFreezeParameter(value) {
	if (value == 1.0) {
		Globals.freezeMode = true;
	} else {
		Globals.freezeMode = false;
	}
	
	if (Globals.filterOpen) {
		Globals.freezeMode = false;
	}
	
	icon_panel_freeze2.set('visible', Globals.freezeMode);
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

function filterTypeRadio(active) {
	for (var i=0; i< Filter.filterButtons.length; i++) {
		Filter.filterButtons[i].setValue(0);
	}
	Filter.filterButtons[active].setValue(1);
	Globals.currentBandFilterType = bandTypeToLabel(active);

	updateFilterLabel();
}

function settingsButtonsRadio(idx) {
	for (var i=0; i<settingsButtons.length; i++) {
		settingsButtons[i].setValue(0);
	}
	settingsButtons[idx].setValue(1);
}

inline function bandTypeToLabel(type) {
	if (type == 0 ) return 'LOWPASS';
	if (type == 1 ) return 'HIGHPASS';
	if (type == 2 ) return 'LOWSHELF';
	if (type == 3 ) return 'HIGHSHELF';
	if (type == 4 ) return 'BANDPASS';
}

function updateFilterLabel() {
	var band = Globals.currentBandIndex;
	var type = Globals.currentBandFilterType;
	Filter.label_bandDisplay.set('text', 'BAND ' + Engine.doubleToString(band / 5, 0) + ' | ' + type);
}

function repaintAllPanels() {
	panel_background.repaint();

	for (panel in themeablePanels) {
		panel.repaint();
	}
}