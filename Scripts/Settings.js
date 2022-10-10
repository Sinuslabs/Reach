const settingsDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
const settingsFile = settingsDir.getChildFile('settings.json');



const DEFAULT_SETTINGS = {
	'zoom': 0.75,
	'animationEnabled': 1,
	'filterOnDrag': 1,
}

// saves the settings from the general page
function saveSettings() {
	settingsFile.writeObject({
		'zoom': Settings.getZoomLevel(),
		'animationEnabled': !STATE.enableAnimations,
		'filterOnDrag': !STATE.filterOnDrag
	});
	
	Console.print('save settings');
}

// reads the settings file
function loadSettings() {
	var savedSettings = settingsFile.loadAsObject();
	var animationEnabledSaved = savedSettings['animationEnabled'];
	var filterOnDragSaved = savedSettings['filterOnDrag'];
	
	Settings.setZoomLevel(savedSettings['zoom']);
	
	button_animationToggle.setValue(animationEnabledSaved);
	STATE.enableAnimations = animationEnabledSaved;
	
	button_filterOnDrag.setValue(filterOnDragSaved);
	STATE.filterOnDrag = filterOnDragSaved;
	
	Console.print('LOADING SETTINGS');
	Console.print(trace(savedSettings));
}

// initializes new settings
function initSettings() {
	Console.print('WRITING SETTINGS FILE');

	settingsFile.writeObject(DEFAULT_SETTINGS);
}

// checks if the settings file exist
function settingsExist() {
 return settingsFile.isFile();
}