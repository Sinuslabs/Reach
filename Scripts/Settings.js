namespace UserSettings {

	reg enableAnimations = true;
	reg theme = 'Light';
	
	// Logo Click
	const var logoButton = Content.getComponent('button_logo');
	
	logoButton.setControlCallback(onbutton_logoControl);
	inline function onbutton_logoControl(component, value) { 
		if (value) {
			settingsButtonsRadio(0);
			displayShowSettings('general');
			Globals.settingsOpen = true;
		} else {
			Globals.settingsOpen = false;
			showMain();
		}
	};
	
	// router for settings screen
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
	
	const var settingsButtons = [
		Content.getComponent('button_settings_general'),
		Content.getComponent('button_settings_audio'),
		Content.getComponent('button_settings_activate'),
		Content.getComponent('button_settings_about')
	];
	
	settingsButtons[0].setControlCallback(onbutton_settings_generalControl);
	 inline function onbutton_settings_generalControl(component, value)
	 {
	 	settingsButtonsRadio(0);
	 	displayShowSettings('general');
	 };
	 
	 settingsButtons[1].setControlCallback(onbutton_settings_audioControl);
	  inline function onbutton_settings_audioControl(component, value)
	  {
	  	settingsButtonsRadio(1);
	  	displayShowSettings('audio');
	  };
	
	 settingsButtons[2].setControlCallback(onbutton_settings_activateControl);
	 inline function onbutton_settings_activateControl(component, value)
	 {
	 	settingsButtonsRadio(2);
	 	displayShowSettings('activate');
	 };
	
	settingsButtons[3].setControlCallback(onbutton_settings_aboutControl);
	inline function onbutton_settings_aboutControl(component, value)
	{
		settingsButtonsRadio(3);
		displayShowSettings('about');
	};
	
	function settingsButtonsRadio(idx) {
		for (var i=0; i<settingsButtons.length; i++) {
			settingsButtons[i].setValue(0);
		}
		settingsButtons[idx].setValue(1);
	}
	
	
	// General Settings
	
	// Zoom factor	
	const zoomFactors = [0.3, 0.4, 0.5, 0.6, 0.75, 1.0, 1.25, 1.50, 1.75, 2.0, 2.5, 3.0];
	
	const var comboBox_zoom = Content.getComponent("ComboBox_zoom")
	comboBox_zoom.setControlCallback(onComboBox_zoomControl);
	inline function onComboBox_zoomControl(component, value)
	{

		if (value == 13.0) {
			return;
		}

		Settings.setZoomLevel(zoomFactors[value - 1]);
		UserSettings.saveSettings();
	};
	
	// Theme
	const var comboBox_theme = Content.getComponent("ComboBox_theme");
	comboBox_theme.setControlCallback(onComboBox1Control);
	inline function onComboBox1Control(component, value)
	{
		if (value == 1.0) {
			Theme.setTheme('Light');
		}
		if (value == 2.0) {
			Theme.setTheme('Dark');	
		}
	};
	
	// Animations
	const var button_animationToggle = Content.getComponent("button_animationToggle");
	button_animationToggle.setControlCallback(onbutton_animationToggleControl);
	inline function onbutton_animationToggleControl(component, value)
	{
		UserSettings.enableAnimations = !value;
		UserSettings.saveSettings();
	};
	
	// Buy Reach Button
	Content.getComponent("button_buy_reach").setControlCallback(onbutton_buy_reachControl);
	inline function onbutton_buy_reachControl(component, value)
	{
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};
	
	const var button_not_activated = Content.getComponent("button_not_activated");
	button_not_activated.setControlCallback(onbutton_not_activatedControl);
	inline function onbutton_not_activatedControl(component, value)
	{
		if (value) {
			displayShowSettings('activate');
			Globals.settingsOpen = true;
		}
	};
	
	
	// Website
	Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
	inline function onpanel_githubControl(component, value)
	{
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};
	
	// Account License Panel
	const var panel_non_activated = Content.getComponent("panel_non_activated");
	panel_non_activated.set('visible', !Globals.activated);
	panel_non_activated.repaint();

	const settingsDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	const settingsFile = settingsDir.getChildFile('settings.json');
	
	// saves the settings from the general page
	function saveSettings() {
		settingsFile.writeObject({
			'zoom': Settings.getZoomLevel(),
			'animationEnabled': UserSettings.enableAnimations,
			'theme': UserSettings.theme
		});
	}
	
	// reads the settings file
	function loadSettings() {
		
		
	
		var savedSettings = settingsFile.loadAsObject();
		var savedTheme = savedSettings['theme'];
		var zoomSaved = Engine.doubleToString(savedSettings['zoom'], 1);
		var animationEnabledSaved = savedSettings['animationEnabled'];
		
		// zoom level
		Settings.setZoomLevel(zoomSaved);
		var zoomFactorsIndex = zoomFactors.indexOf(zoomSaved, 0, 0);
		comboBox_zoom.setValue(zoomFactorsIndex + 1);
		
		//Theming
		Theme.setTheme(savedTheme);
		UserSettings.theme = savedTheme;
		
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
		UserSettings.enableAnimations = animationEnabledSaved;
	}
	
	// checks if the settings file exist
	function settingsExist() { return settingsFile.isFile();}
}

