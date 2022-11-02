Server.setBaseURL('https://sinuslabs.io/');
Server.setHttpHeader('Authorization: Basic ' + AUTH_KEY);

// NOT FOUND LABEL
const var label_not_found = Content.getComponent("label_not_found");

function getActivation(status, obj) {
	
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

function activateLicense(KEY) {
	Server.callWithGET('wp-json/lmfwc/v2/licenses/activate/'+KEY, {}, getActivation);		
}

function getLocalLicense() {
	var machineId = FileSystem.getSystemId();
	var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
	return license;
}

