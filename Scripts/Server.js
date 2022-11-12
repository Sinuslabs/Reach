namespace API {
	
	Server.setBaseURL("https://www.sinuslabs.io");
	Server.setServerCallback(serverActivity);
	
	// NOT FOUND LABEL
	const var label_not_found = Content.getComponent("label_not_found");
	
	function getActivation(status, obj) {
		Console.print(trace(obj.data));
		if (status == 404 || obj.data.productId != 62) {
			label_not_found.set('visible', true);
			return;
		}
		
	    if(status == 200) {
			var data = {object: obj, date: Engine.getSystemTime(true)};
			var machineId = FileSystem.getSystemId();
			var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
			appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
			Globals.activated = true;
			
			// Disable gain reduction
			GainReduction.setBypassed(true);
			GainReductionTimer.stopTimer();
					
			// update panels
			panel_non_activated.set('visible', !Globals.activated);
			panel_non_activated.repaint();
			button_not_activated.set('visible', !Globals.activated);
			label_thank_you.set('visible', Globals.activated);
		}
	};
	
	function getActivationStatus() {
		var license = getLocalLicense();
		if (license) Globals.activated = true;
	}
	
	inline function activateLicense(usermail, userpw) {
		Server.setHttpHeader('Content-Type: application/json');
		
		local p = '{	
			"username": "'+usermail+'",
			"password": "'+userpw+'"
		}';
		
		Server.callWithPOST('/wp-json/jwt-auth/v1/token', p, loginCallback);
	}
	
	inline function loginCallback(status, data) {
		const var token = data.token;
		if (isDefined(token)) {
			Server.setHttpHeader("Authorization: Bearer " + token);
			Server.callWithPOST('/wp-json/wclm/v3/get-current-user-licenses', {}, checkLicense);
		} else {
			label_not_found.set('text', 'Credentials are incorrect.');
			label_not_found.set('visible', true);
		}
	}
	
	inline function checkLicense(status, data) {
		if (data.response.licenses[0].product_name == 'Reach') {
			local data = {'isActivated': true, date: Engine.getSystemTime(true)};
			local machineId = FileSystem.getSystemId();
			local appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
			appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
			Globals.activated = true;
			
			// Disable gain reduction
			GainReduction.setBypassed(true);
			GainReductionTimer.stopTimer();
					
			// update panels
			panel_non_activated.set('visible', !Globals.activated);
			panel_non_activated.repaint();
			button_not_activated.set('visible', !Globals.activated);
			label_thank_you.set('visible', Globals.activated);
		} else {
			label_not_found.set('text', 'Serial Key is not valid.');
			label_not_found.set('visible', true);
		}
	}
	
	
	inline function serverActivity(isWaiting) {		
		if (isWaiting) {
			button_active.set('text', 'loading');
		} else {
			button_active.set('text', 'ACTIVATE');
		}
	}
	
	function getLocalLicense() {
		var machineId = FileSystem.getSystemId();
		var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
		return license;
	}

}
