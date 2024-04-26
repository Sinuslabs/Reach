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
	
	Randomization.randomPanelButton.repaint();
	floatingLock_panel.repaint();
}

function returnTest() {
	return 'test';
}