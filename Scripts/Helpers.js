function updateParameterWithLabel(parameterName, value, label) {
	
	if (label != 'Hz') {
		value = value * 100;
	}
	Globals.displayParameter = parameterName + ' | ' + Math.round(parseInt(value)) + label;
	updateDisplay();
}

function updateParameterWithDb(parameter, value) {
	Globals.displayParameter = parameter + ' | ' + Engine.doubleToString(value, 1) + 'dB';
	updateDisplay();
}

// each caller needs to handle conversion (used for filter multi value update);
inline function customParameter(parameter) {
	Globals.displayParameter = parameter;
	updateDisplay();
}

inline function getHardcodedEffect(name) {
	for ( slot in EffectCustomizer.effectSlots) {
		local effectName = EffectCustomizer.getIdFromSlot(slot);
		if (effectName == name) {
			return slot.getCurrentEffect();
		}
	}
}


function repaintAllPanels() {
	panel_background.repaint();

	for (panel in themeablePanels) {
		panel.repaint();
	}
}