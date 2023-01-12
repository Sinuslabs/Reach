namespace UserSettings {

	reg enableAnimations = true;
	reg startupAnimation = true;
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
	
	const var displayButton_activateSerial = Content.getComponent("displayButton_activateSerial");
	const var displayLabel_serialKey = Content.getComponent("displayLabel_serialKey");
	displayButton_activateSerial.setControlCallback(ondisplayButton_activateSerialControl);
	inline function ondisplayButton_activateSerialControl(component, value) {
		if (value) {
			Console.print(FileSystem.getSystemId());
			API.activateLicenseWithSerial(displayLabel_serialKey.get('text'));
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
		Content.getComponent('button_settings_activate'),
		Content.getComponent('button_settings_about')
	];
	
	settingsButtons[0].setControlCallback(onbutton_settings_generalControl);
	 inline function onbutton_settings_generalControl(component, value)
	 {
	 	settingsButtonsRadio(0);
	 	displayShowSettings('general');
	 };
	
	 settingsButtons[1].setControlCallback(onbutton_settings_activateControl);
	 inline function onbutton_settings_activateControl(component, value)
	 {
	 	settingsButtonsRadio(1);
	 	displayShowSettings('activate');
	 	if (!Globals.activated) {
	 		settingsButtonsRadio(1);				
	 		activatePageRadio('serial');
	 	} else {
		 	activatePageRadio('thankyou');
	 	}
	 };
	
	
	settingsButtons[2].setControlCallback(onbutton_settings_aboutControl);
	inline function onbutton_settings_aboutControl(component, value)
	{
		settingsButtonsRadio(2);
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
	inline function onComboBox_zoomControl(component, value) {

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
	inline function onbutton_animationToggleControl(component, value) {
		enableAnimations = !value;
		saveSettings();
	};
	
	const var button_startupAnimationToggle = Content.getComponent("button_startupAnimationToggle");
	button_startupAnimationToggle.setControlCallback(onbutton_startupAnimationToggleControl);
	inline function onbutton_startupAnimationToggleControl(component, value) {
		startupAnimation = !value;
		UserSettings.saveSettings();
	};
	
	
	
	// Buy Reach Button
	Content.getComponent("button_buy_reach").setControlCallback(onbutton_buy_reachControl);
	inline function onbutton_buy_reachControl(component, value) {
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};
	
	const var button_not_activated = Content.getComponent("button_not_activated");
	button_not_activated.setControlCallback(onbutton_not_activatedControl);
	inline function onbutton_not_activatedControl(component, value)
	{
		if (value) {
			displayShowSettings('activate');
			Globals.settingsOpen = true;
			if (!Globals.activated) {
				settingsButtonsRadio(1);				
				activatePageRadio('serial');
			}
		}
	};
	
	
	// Website
	Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
	inline function onpanel_githubControl(component, value) {
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};
	
	// Account License Panel
	const var displayPanel_login = Content.getComponent("displayPanel_login");
	const var displayPanel_serial = Content.getComponent("displayPanel_serial");
	
	const settingsDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	const settingsFile = settingsDir.getChildFile('settings.json');
	
	// Activate Serial Panel
	
	const var displayButton_serial = Content.getComponent("displayButton_serial");
	displayButton_serial.setControlCallback(ondisplayButton_serialControl);
	inline function ondisplayButton_serialControl(component, value)	{
		activatePageRadio('serial');
	};
	
	const var displayButton_login = Content.getComponent("displayButton_login");
	displayButton_login.setControlCallback(ondisplayButton_loginControl);
	inline function ondisplayButton_loginControl(component, value) {
		activatePageRadio('login');
	};
	
	inline function activatePageRadio(route) {
		switch(route) {
			case 'serial':
				displayPanel_serial.set('visible', true);
				displayPanel_login.set('visible', false);
				label_thank_you.set('visible', false);
				displayButton_serial.set('visible', true);
				displayButton_login.set('visible', true);
				displayButton_serial.setValue(true);
				displayButton_login.setValue(false);
				break;
			case 'login':
				displayPanel_login.set('visible', true);
				displayPanel_serial.set('visible', false);
				label_thank_you.set('visible', false);
				displayButton_serial.set('visible', true);
				displayButton_login.set('visible', true);
				displayButton_serial.setValue(false);
				displayButton_login.setValue(true);
				break;
			case 'thankyou':
				displayPanel_login.set('visible', false);
				displayPanel_serial.set('visible', false);
				label_thank_you.set('visible', true);
				displayButton_serial.set('visible', false);
				displayButton_login.set('visible', false);
				break;
			default:
				break
		}
	}
	
	// saves the settings from the general page
	function saveSettings() {
		Console.print('startup animation enabled: ' + UserSettings.startupAnimation);
	
		settingsFile.writeObject({
			'zoom': Settings.getZoomLevel(),
			'animationEnabled': UserSettings.enableAnimations,
			'startupAnimation': UserSettings.startupAnimation,
			'theme': UserSettings.theme
		});
	}
	
	// reads the settings file
	function loadSettings() {
	
		var savedSettings = settingsFile.loadAsObject();
		
		var savedTheme = savedSettings['theme'];
		var zoomSaved = Engine.doubleToString(savedSettings['zoom'], 1);
		var animationEnabledSaved = savedSettings['animationEnabled'];
		var startupAnimationSaved = savedSettings['startupAnimation'];
		Console.print('load animation' + startupAnimationSaved);
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
		UserSettings.enableAnimations = animationEnabledSaved;
		// startup animation
		button_startupAnimationToggle.setValue(!startupAnimationSaved);
		startupAnimation = startupAnimationSaved;
	}
	
	// checks if the settings file exist
	function settingsExist() { return settingsFile.isFile();}
}

