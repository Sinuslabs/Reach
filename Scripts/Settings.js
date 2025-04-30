namespace UserSettings {

	reg enableAnimations = false;
	reg startupAnimation = true;
	reg theme = 'Light';
	reg wetOnlyGain = false;
	reg quality = 5;
	reg zoomCmb = 6;
	
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
	displayButton_paste.setLocalLookAndFeel(LAF_displayButton);
	
	const var serial_error_label = Content.getComponent("serial_error_label");
	serial_error_label.set('text', '');
	
	const var displayButton_activateSerial = Content.getComponent("displayButton_activateSerial");
	const var displayLabel_serialKey = Content.getComponent("displayTheme_serialKey");
	displayButton_activateSerial.setLocalLookAndFeel(LAF_displayButton);
	
	displayLabel_serialKey.set('text', '');

	displayButton_activateSerial.setControlCallback(ondisplayButton_activateSerialControl);
	displayButton_activateSerial.setLocalLookAndFeel(asyncButtonLaf);
	
	inline function ondisplayButton_activateSerialControl(component, value) {
		if (value) {
			if (Engine.getOS() == 'LINUX') {
				Supabase.unlockProduct();
				return;
			}
			Supabase.activate(displayLabel_serialKey.get('text'));
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
		Content.callAfterDelay(2000, function() {
			showMain();
		}, {});
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
	const zoomFactors = [0.3, 0.4, 0.5, 0.6, 0.75, 0.77, 1.0, 1.25, 1.50, 1.75, 2.0, 2.5, 3.0];
	
	const var comboBox_zoom = Content.getComponent("ComboBox_zoom")
	comboBox_zoom.setControlCallback(onComboBox_zoomControl);
	
	comboBox_zoom.setLocalLookAndFeel(popMenuLaf);
	inline function onComboBox_zoomControl(component, value) {

		Console.print(value);
		if (value !== 14.0) {
			Settings.setZoomLevel(zoomFactors[value - 1]);
		}
		UserSettings.zoomCmb = value;
		UserSettings.saveSettings();
	};
	
	
	// Buy Reach Button
	const var button_buy_reach = Content.getComponent("button_buy_reach");
	button_buy_reach.setLocalLookAndFeel(LAF_displayButton);
	button_buy_reach.setControlCallback(onbutton_buy_reachControl);
	inline function onbutton_buy_reachControl(component, value) {
		if (value) Engine.openWebsite('https://sinuslabsio.gumroad.com/l/reach');
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
		if (value) Engine.openWebsite('https://sinuslabsio.gumroad.com/l/reach');
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
			'zoomCmb': UserSettings.zoomCmb,
			'theme': UserSettings.theme,
			'quality': UserSettings.quality,
		});
	}
	
	// reads the settings file
	function loadSettings() {
	
		var savedSettings = settingsFile.loadAsObject();
		var savedQuality = savedSettings['quality'];
		var savedTheme = savedSettings['theme'];
		var zoomSaved = Engine.doubleToString(savedSettings['zoom'], 1);
		var zoomCmbSaved = savedSettings['zoomCmb'];
		var wetOnlyGainSaved = savedSettings['wetOnlyGain'];		
		
		// zoom level
		Settings.setZoomLevel(zoomSaved);
		comboBox_zoom.setValue(zoomCmbSaved);
		comboBox_zoom.sendRepaintMessage();
		
		//Theming
		Theme.setTheme(savedTheme);
		UserSettings.theme = savedTheme;
		
		quality = savedQuality;
		
		if (isDefined(savedQuality)) {
			FFTVisual.AnimationQuality_knb.setValue(savedQuality);
			FFTVisual.AnimationQuality_knb.changed();			
		}
	}
	
	// checks if the settings file exist
	function settingsExist() { return settingsFile.isFile();}
}

