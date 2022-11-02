namespace UserSettings {
	const settingsDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	const settingsFile = settingsDir.getChildFile('settings.json');
	
	// saves the settings from the general page
	function saveSettings() {
		settingsFile.writeObject({
			'zoom': Settings.getZoomLevel(),
			'animationEnabled': STATE.enableAnimations,
			'filterOnDrag': STATE.filterOnDrag,
			'theme': STATE.theme
		});
	}
	
	// reads the settings file
	function loadSettings() {
		var savedSettings = settingsFile.loadAsObject();
		var savedTheme = savedSettings['theme'];
		var zoomSaved = Engine.doubleToString(savedSettings['zoom'], 1);
		var animationEnabledSaved = savedSettings['animationEnabled'];
		var filterOnDragSaved = savedSettings['filterOnDrag'];
		
		// zoom level
		Settings.setZoomLevel(zoomSaved);
		var zoomFactorsIndex = zoomFactors.indexOf(zoomSaved, 0, 0);
		comboBox_zoom.setValue(zoomFactorsIndex + 1);
		
		//Theming
		Theme.setTheme(savedTheme);
		STATE.theme = savedTheme;
		
		if (theme == 'Light') {
			comboBox_theme.setValue(1.0);		
		}
		if (theme == 'Dark') {
			comboBox_theme.setValue(2.0);	
		}
		
		// animation toggle
		// Toggle buttons are using reversed value to display on by default
		button_animationToggle.setValue(!animationEnabledSaved);
		// STATE is using normal values tho
		STATE.enableAnimations = animationEnabledSaved;
		
		// filter on drag
		// Toggle buttons are using reversed value to display on by default
		button_filterOnDrag.setValue(!filterOnDragSaved);
		// STATE is using normal values tho
		STATE.filterOnDrag = filterOnDragSaved;
	}
	
	// checks if the settings file exist
	function settingsExist() { return settingsFile.isFile();}
}

