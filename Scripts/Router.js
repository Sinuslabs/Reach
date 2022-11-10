

const var mainDisplayRoutes = Content.getAllComponents('display_main_');
const var displayRoutes = Content.getAllComponents('display_');
const var displayMain = Content.getComponent("display_main");
const var displaySettings = Content.getAllComponents("dis-settings_");

var CURRENT_ROUTE = 'main';

function displayDisableAll() {
	for (display in displayRoutes) {
		display.set('visible', false);
	}
}

inline function showMain() {
	disableStates();
	displayShowMain('waveform');
}

function disableStates() {
	Globals.presetBrowserOpen = false;
	presetBrowserButton.setValue(0);
	
	Globals.settingsOpen = false;
	logoButton.setValue(0);
	
	Globals.effectsOpen = false;
	EffectCustomizer.button_fx.setValue(0);
	
	Globals.aboutOpen = false;
	button_title.setValue(0);
	
	Filter.prePostButtons[0].set('visible', false);
	Filter.prePostButtons[1].set('visible', false);
}

function displayShow(route) {
	displayDisableAll();	
	disableStates();
	
	if (route == 'settings') {
		Globals.settingsOpen = true;
		logoButton.setValue(1);
	}
	
	if (route == 'presetBrowser') {
		Globals.presetBrowserOpen = true;
		presetBrowserButton.setValue(1);
	}
	
	if (route == 'effects') {
		Globals.effectsOpen = true;
		EffectCustomizer.button_fx.setValue(1);
	}
	
	if (route == 'about') {
		Globals.aboutOpen = true;
		button_title.setValue(1);
	}
	
	for (display in displayRoutes) {
		var displayName = display.get('text').replace('display_');
		if (route == displayName) {
			display.set('visible', true);
			screenTimer.stopTimer();
			CURRENT_ROUTE = displayName;
		} else {
			display.set('visible', false);
		}
	}
}

function displayShowMain(route) {
	if (Globals.presetBrowserOpen) return;
	
	displayDisableAll();
	displayMain.set('visible', true);
	for (mainDisplay in mainDisplayRoutes) {
		var mainDisplayName = mainDisplay.get('text').replace('display_main_');
		if (route == mainDisplayName) {		
			mainDisplay.set('visible', true);
			CURRENT_ROUTE = 'main_' + mainDisplayName;
		} else {
			mainDisplay.set('visible', false);
		}
	}
}

