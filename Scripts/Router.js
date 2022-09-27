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

function displayShow(route) {
	displayDisableAll();
	
	//disable filter panel
	panel_filterButtons.set('visible', false);
				
	for (display in displayRoutes) {
		var displayName = display.get('text').replace('display_');
		if (route == displayName) {
			display.set('visible', true);
			screenTimer.stopTimer();
			CURRENT_ROUTE = displayName;
		} else if (route == 'main') {
			displayShowMain('waveform');
			return;
		} else {
			display.set('visible', false);
		}
	}
}

function displayShowMain(route) {
	if (STATE.presetBrowserOpen) return;
	if (route == 'default') { route = 'waveform'; };
	displayDisableAll();
	
	route == 'filter' ? panel_filterButtons.set('visible', true) : panel_filterButtons.set('visible', false);
	
	displayMain.set('visible', true);
	for (mainDisplay in mainDisplayRoutes) {
		var mainDisplayName = mainDisplay.get('text').replace('display_main_');
		if (mainDisplayName == 'footer') {
			mainDisplay.set('visible', true);
			continue;
		}
		if (route == mainDisplayName) {		
			mainDisplay.set('visible', true);
			CURRENT_ROUTE = 'main_' + mainDisplayName;
		} else {
			mainDisplay.set('visible', false);
		}
	}
}

function displayShowSettings(route) {
	displayDisableAll();
	
	displayShow('settings');
	for (settingsScreen in displaySettings) {
		var settingsScreenName = settingsScreen.get('text').replace('dis-settings_');
		if (route == settingsScreenName) {		
			settingsScreen.set('visible', true);
			CURRENT_ROUTE = 'disSettings_' + settingsScreenName;
		} else {
			settingsScreen.set('visible', false);
		}
	}
}