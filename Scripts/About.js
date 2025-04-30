namespace About {
	
	const var about_info = Content.getComponent("about_info");
	
	const INFO = {
		name: 'REACH',
		homepage: 'https://sinuslabs.io',
		product_page: 'https://www.sinuslabs.io/product/reach',
		repository: 'https://github.com/Sinuslabs/Reach',
		latest_release_windows: '/releases/latest/download/Reach-Windows.exe',
		latest_release_macos: '/releases/latest/download/Reach-MacOS.pkg',
		latest_release_linux: '/releases/latest/download/Reach-Linux.zip'
	};
	
	const var displayUpdateIcon = Content.getComponent("displayIcon-doubleUp");
	const var updateButton = Content.getComponent("displayButton-updateAvailable");
	const var about_check_downloads_label = Content.getComponent("displayTheme_about_check_downloads_label");

	
	displayUpdateIcon.showControl(false);
	updateButton.showControl(false);
	about_check_downloads_label.showControl(false);
	updateButton.showControl(false);
	
	displayUpdateIcon.setControlCallback(onDoubleArrow);
	updateButton.setControlCallback(onUpdate);
	
	const var icon_panel_logo = Content.getComponent("icon_panel_logo");
		
	inline function onDoubleArrow(component, value) {
		value && displayShow('about');
	}
	
	
	// skip update check for linux - no network calls :()
	// when Reach is build a the libcurl4 library needs to be linked
	// i tested with dynamic and static linking but would always
	// face bugs when testing different distros. 
	// Network calls do not work on Linux currently
	//
	// if anyone smarter than me can make them work I
	// would be extremly happy!
	//
	
	if (Engine.getOS() != 'LINUX') {
		UpdateChecker.checkUpdate(function(canUpdate) {
			if (canUpdate) {
				displayUpdateIcon.showControl(true);
				updateButton.showControl(true);
			}
		});
	}
	
	inline function onUpdate(component, value) {
		if (value) {
		
			switch(Engine.getOS()) {
				case 'WIN':
					Engine.openWebsite(INFO.repository + INFO.latest_release_windows);
					break;
				case 'OSX':
					Engine.openWebsite(INFO.repository + INFO.latest_release_macos);
					break;
				case 'LINUX':
					Engine.openWebsite(INFO.repository + INFO.latest_release_linux);
					break;
			}	
			
			updateButton.showControl(false);
			about_check_downloads_label.showControl(true);
		}
	}
	
	
	about_info.setMouseCallback(function (event) {
		
		if (event.clicked) {
			Engine.openWebsite(INFO.product_page);
		}
		
	});
	
	about_info.setPaintRoutine(aboutRoutine);

	inline function aboutRoutine(g) {
		
		local a = this.getLocalBounds(1);
		
		local textHeight = 20;
		
		local logoArea = [a[0], a[1], 55, 77];
		local textArea = [60, a[1], a[2], a[3]];
		
		local nameArea = [textArea[0], a[1], a[2], textHeight];
		local versionArea = [textArea[0], a[1] + textHeight, 60, textHeight];
		local buildArea = [textArea[0], a[1] + textHeight * 2, a[2], textHeight];
		
		g.setColour(DisplayTheme.defaultText);
		g.fillPath(Paths.icons.reachLogo, logoArea);
		
		g.setFont(Fonts.mainFont, 20);
		g.drawAlignedText(INFO.name, nameArea, 'left');
		
		g.setFont(Fonts.secondaryFont, 16);
		g.drawAlignedText(getDate(), buildArea, 'left');
		
		g.setColour('0xE6FF03');
		g.fillRoundedRectangle(versionArea, 2);
		
		
		g.setColour('0x1F2329');
		g.drawRoundedRectangle(versionArea, 2, 1);
		g.drawAlignedText('V'+Engine.getVersion(), versionArea, 'centred');
		

	}
	
	icon_panel_logo.setPaintRoutine(function(g) {
		g.setColour(DisplayTheme.defaultText);
		g.fillPath(Paths.icons['fullLogo'], [0, 0, 140, 17]);
	});
	
	icon_panel_logo.setMouseCallback(function (event) {
		
		if (event.clicked) {
			Engine.openWebsite(INFO.homepage);
		}
	});
	
	inline function getDate() {
		local date = Date.getSystemTimeISO8601(true);
		
		date = date.split('.')[0];
		local time = date.split('T')[1];
		date = date.split('T')[0];
		return date;
	}
}