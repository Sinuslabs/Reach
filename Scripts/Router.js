const var mainDisplayRoutes = Content.getAllComponents('display_main_');
const var displayRoutes = Content.getAllComponents('display_');
const var displayMain = Content.getComponent("display_main");

var CURRENT_ROUTE = 'main';

function displayDisableAll() {
	for (display in displayRoutes) {
		display.set('visible', false);
	}
}

function displayShow(route) {
	Console.print(route);

	displayDisableAll();
	for (display in displayRoutes) {
		var displayName = display.get('text').replace('display_');
		if (route == displayName) {
			display.set('visible', true);
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
	if (route == 'default') { route = 'waveform'; };
	displayDisableAll();
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