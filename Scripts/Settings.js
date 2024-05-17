namespace UserSettings {

	reg enableAnimations = true;
	reg startupAnimation = true;
	reg theme = 'Light';
	reg wetOnlyGain = false;
	
	// Logo Click
	const var logoButton = Content.getComponent('button_logo');
	
	logoButton.setControlCallback(onbutton_logoControl);
	inline function onbutton_logoControl(component, value) { 
		if (value) {
			displayShowSettings('general');
			Globals.settingsOpen = true;
		} else {
			Globals.settingsOpen = false;
			showMain();
		}
	};
	
	// ACTIVATE SECTION
	

	
	const var displayButton_paste = Content.getComponent("displayButton-paste");
	displayButton_paste.setControlCallback(onPaste);
	
	const var serial_error_label = Content.getComponent("serial_error_label");
	serial_error_label.set('text', '');
	
	const var displayButton_activateSerial = Content.getComponent("displayButton_activateSerial");
	const var displayLabel_serialKey = Content.getComponent("displayLabel_serialKey");
	
	displayLabel_serialKey.set('text', '');

	displayButton_activateSerial.setControlCallback(ondisplayButton_activateSerialControl);
	displayButton_activateSerial.setLocalLookAndFeel(asyncButtonLaf);
	
	inline function ondisplayButton_activateSerialControl(component, value) {
		if (value) {
			if (Engine.getOS() == 'LINUX') {
				Gumroad.unlockProduct();
				return;
			}
			Gumroad.activate(displayLabel_serialKey.get('text'));
		}
	};
	
	
	inline function onPaste(component, value) {
		
		if (!value) { return; }
		
		local clipboard = Engine.getClipboardContent();
		displayLabel_serialKey.set('text', clipboard);		
	}
	
	inline function setError(error) {
		
		
	}
	
	inline function unlockDemoLimitations() {
		// Disable gain reduction
		GainReduction.setBypassed(true);
		GainReductionTimer.stopTimer();
		button_buy_reach.set('visible', false);
		UserSettings.button_not_activated.set('visible', !Globals.activated);
		UserSettings.activatePageRadio('thankyou');
		ThankYou.thankyou_panel.showControl(true);
	}
	
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
	
	
	// General Settings
	
	// Zoom factor	
	const zoomFactors = [0.3, 0.4, 0.5, 0.6, 0.75, 1.0, 1.25, 1.50, 1.75, 2.0, 2.5, 3.0];
	
	const var comboBox_zoom = Content.getComponent("ComboBox_zoom")
	comboBox_zoom.setControlCallback(onComboBox_zoomControl);
	
	comboBox_zoom.setLocalLookAndFeel(popMenuLaf);
	inline function onComboBox_zoomControl(component, value) {

		if (value == 13.0) {
			return;
		}

		Settings.setZoomLevel(zoomFactors[value - 1]);
		UserSettings.saveSettings();
	};
	
	// Theme
	//const var comboBox_theme = Content.getComponent("ComboBox_theme");
	//comboBox_theme.setControlCallback(onComboBox1Control);
	//comboBox_theme.setLocalLookAndFeel(popMenuLaf);
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
	
	// ROUTING 
	const var wetOnlyGainSwitch = Content.getComponent("button_wetGainToggle")
	wetOnlyGainSwitch.setControlCallback(onbutton_wetGainToggleControl);	
	
	inline function onbutton_wetGainToggleControl(component, value) {
		wetOnlyGain = !value; 
		UserSettings.saveSettings();

		setGainBypass();

	};
	
	// Buy Reach Button
	Content.getComponent("button_buy_reach").setControlCallback(onbutton_buy_reachControl);
	inline function onbutton_buy_reachControl(component, value) {
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};
	
	const var button_not_activated = Content.getComponent("button_not_activated");
	button_not_activated.setControlCallback(onbutton_not_activatedControl);
	button_not_activated.setLocalLookAndFeel(notActivatedLAF);
	inline function onbutton_not_activatedControl(component, value)
	{
		if (value) {
			displayShowSettings('activate');
			Globals.settingsOpen = true;
			if (!Globals.activated) {
				activatePageRadio('serial');
			}
		}
	};
	
	
	// Website
	Content.getComponent("button_website").setControlCallback(onpanel_githubControl);
	inline function onpanel_githubControl(component, value) {
		if (value) Engine.openWebsite('https://sinuslabs.io/product/reach');
	};

	const var displayPanel_serial = Content.getComponent("displayPanel_serial");
	
	const settingsDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	const settingsFile = settingsDir.getChildFile('settings.json');
	
	inline function activatePageRadio(route) {
		switch(route) {
			case 'serial':
				displayPanel_serial.set('visible', true);
				label_thank_you.set('visible', false);
				break;
			case 'thankyou':
				displayPanel_serial.set('visible', false);
				label_thank_you.set('visible', true);
				break;
			default:
				break
		}
	}
	
	// saves the settings from the general page
	function saveSettings() {
		settingsFile.writeObject({
			'zoom': Settings.getZoomLevel(),
			'animationEnabled': UserSettings.enableAnimations,
			'startupAnimation': UserSettings.startupAnimation,
			'theme': UserSettings.theme,
			'wetOnlyGain': UserSettings.wetOnlyGain,
		});
	}
	
	// reads the settings file
	function loadSettings() {
	
		var savedSettings = settingsFile.loadAsObject();
		
		var savedTheme = savedSettings['theme'];
		var zoomSaved = Engine.doubleToString(savedSettings['zoom'], 1);
		var animationEnabledSaved = savedSettings['animationEnabled'];
		var startupAnimationSaved = savedSettings['startupAnimation'];
		var wetOnlyGainSaved = savedSettings['wetOnlyGain'];		
		
		// zoom level
		Settings.setZoomLevel(zoomSaved);
		var zoomFactorsIndex = zoomFactors.indexOf(zoomSaved, 0, 0);
		comboBox_zoom.setValue(zoomFactorsIndex + 1);
		
		//Theming
		Theme.setTheme(savedTheme);
		UserSettings.theme = savedTheme;
		
		//if (theme == 'Light') {
		//	comboBox_theme.setValue(1.0);		
		//}
		//if (theme == 'Dark') {
		//	comboBox_theme.setValue(2.0);	
		//}
		
		// animation toggle
		// Toggle buttons are using reversed value to display on by default
		button_animationToggle.setValue(!animationEnabledSaved);
		UserSettings.enableAnimations = animationEnabledSaved;
		// startup animation
		button_startupAnimationToggle.setValue(!startupAnimationSaved);
		startupAnimation = startupAnimationSaved;
		
		// wet only gain
		wetOnlyGainSwitch.setValue(!wetOnlyGainSaved);
		wetOnlyGain = wetOnlyGainSaved;
		
		setGainBypass();
	}
	
	function setGainBypass() {
		WetOnlyGain.setBypassed(!wetOnlyGain);
		Gain.setBypassed(wetOnlyGain);
	}
	
	// checks if the settings file exist
	function settingsExist() { return settingsFile.isFile();}
}

