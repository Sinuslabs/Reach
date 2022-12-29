reg decimal = 2;

function updateParameterWithLabel(parameterName, value, label) {
	
	
	if (label == 's') {
		if (value < 1) {
			label = 'ms';
			value *= 100;
			decimal = 0;
		}	
		value = Engine.doubleToString(value, decimal);
	} else {
		value = Math.round(parseInt(value * 100));
	}
	
	
	
	Globals.displayParameter = parameterName + ' | ' + value + label;
}

function updateParameterWithDb(parameter, value) {
	Globals.displayParameter = parameter + ' | ' + Engine.doubleToString(value, 1) + 'dB';
	updateDisplay();
}

// each caller needs to handle conversion (used for filter multi value update);
inline function customParameter(parameter) {
	Globals.displayParameter = parameter;
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