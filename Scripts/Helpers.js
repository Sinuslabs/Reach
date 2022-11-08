function updateParameterWithLabel(parameterName, value, label) {
	
	if (label != 'Hz') {
		value = value * 100;
	}
	Globals.displayParameter = parameterName + ' | ' + Math.round(parseInt(value)) + label;
	updateDisplay();
}


// each caller needs to handle conversion (used for filter multi value update);
function customParameter(parameter) {
	Globals.displayParameter = parameter;
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

function settingsButtonsRadio(idx) {
	for (var i=0; i<settingsButtons.length; i++) {
		settingsButtons[i].setValue(0);
	}
	settingsButtons[idx].setValue(1);
}


function repaintAllPanels() {
	panel_background.repaint();

	for (panel in themeablePanels) {
		panel.repaint();
	}
}