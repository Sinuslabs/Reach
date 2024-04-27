namespace API {
	
	Server.setBaseURL("https://www.sinuslabs.io");
	Server.setServerCallback(serverActivity);
	
	const var serial_error_label = Content.getComponent("serial_error_label");
	
	serial_error_label.set('text', '');
	
	function getActivationStatus() {
		var license = getLocalLicense();
		if (license) Globals.activated = true;
	}
	inline function activateLicenseWithSerial(serialKey) {
		Console.print(serialKey);
		
		Server.callWithPOST('', {
			'license_key': serialKey.trim(),
			'fslm_api_key': Config.API_KEY,
			'fslm_v2_api_request': 'details'	
		}, checkSerialLicense);
	}
	
	inline function checkSerialLicense(status, data) {
		Console.print('ERROR');
		Console.print(trace(data));
		Console.print(trace(status));
		if (data['product_id'] == '62') {
			setActivate();
			return;
		}
		
		if (data.contains('ERROR')) {
			serial_error_label.set('text', data);
		}
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
		local token = data.token;
		if (isDefined(token)) {
			Server.setHttpHeader("Authorization: Bearer " + token);
			Server.callWithPOST('/wp-json/wclm/v3/get-current-user-licenses', {}, checkLicense);
		} else {
			label_not_found.set('text', 'Credentials are incorrect.');
			label_not_found.set('visible', true);
		}
	}
	
	inline function setActivate() {
		local data = {'isActivated': true, date: Engine.getSystemTime(true)};
		local machineId = FileSystem.getSystemId();
		local appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
	
		Globals.activated = true;
		
		// Disable gain reduction
		GainReduction.setBypassed(true);
		GainReductionTimer.stopTimer();
		
		button_buy_reach.set('visible', false);
			
		UserSettings.button_not_activated.set('visible', !Globals.activated);
		UserSettings.activatePageRadio('thankyou');
		
	}
	

	
	inline function checkLicense(status, data) {
		if (data.response.licenses[0].product_name == 'Reach') {
			setActivate();
		} else {
			label_not_found.set('text', 'Serial Key is not valid.');
			label_not_found.set('visible', true);
		}
	}
	
	
	inline function serverActivity(isWaiting) {		

	}
	
	function getLocalLicense() {
		var machineId = FileSystem.getSystemId();
		var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
		return license;
	}

}
